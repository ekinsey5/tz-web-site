# Deployment Plan — Tether-Zero Static Site on AWS

## Overview

The Tether-Zero marketing site is a **Next.js 14 App Router** app served as a fully
static site over **HTTPS** on the custom domain **tether-zero.com**, with **CI/CD
from GitHub**. This document describes the most cost-effective production
architecture and how to operate it.

The site is built to static output (`output: 'export'` → `out/`) and hosted from a
private **S3** bucket fronted by **CloudFront** with a free **ACM** TLS certificate.
DNS is served from the existing **Route 53** hosted zone. Deploys run from GitHub
Actions using **OIDC** (no long-lived AWS credentials).

**Outcome:** every push to `main` builds the site and publishes it to
`https://tether-zero.com` for roughly the cost of the hosted zone (~$0.50/mo).

---

## Architecture

The cheapest secure way to serve a static site on AWS is **private S3 origin +
CloudFront + ACM + Route 53**. No compute, no NAT, no load balancer.

```
GitHub (push to main)
   │  OIDC (short-lived creds, no stored keys)
   ▼
GitHub Actions ── npm ci → next build → out/ ──► S3 (private bucket)
                                                    ▲
                                                    │ OAC (signed reads only)
   Visitor ─ HTTPS ─► CloudFront ──────────────────┘
                         │  ACM cert (us-east-1): tether-zero.com + www
                         │  CloudFront Function: www→apex 301 + dir→index.html
                         ▼
                      Route 53 alias A/AAAA (apex + www) ─► CloudFront
```

### Exact AWS services

| Service | Role | Cost-relevant settings |
|---|---|---|
| **Amazon S3** | Origin store for the `out/` build artifact. | Private bucket; **Block Public Access = all on**; SSE-S3 encryption; no static-website hosting (REST origin via OAC). |
| **CloudFront** | Global CDN; the only public entry point; terminates TLS. | `PriceClass_100` (NA + EU, cheapest); HTTP→HTTPS redirect; Brotli/Gzip compress; default root object `index.html`; HTTP/2+3. |
| **Origin Access Control (OAC)** | Lets only CloudFront read the private bucket (SigV4). Replaces legacy OAI. | Bucket policy scoped to the distribution ARN. |
| **CloudFront Functions** | Lightweight viewer-request edge logic: `www → apex` 301 redirect + rewrite directory URIs to `…/index.html`. | Cheaper/faster than Lambda@Edge; 2M free invocations/mo. |
| **AWS Certificate Manager (ACM)** | Free public TLS cert for `tether-zero.com` + `www.tether-zero.com`. | **Must be in us-east-1** for CloudFront; DNS-validated via Route 53. |
| **Amazon Route 53** | Existing hosted zone. Alias A/AAAA records (apex + www) → CloudFront; auto-created ACM validation records. | Alias queries to CloudFront are **free**. |
| **GitHub OIDC + IAM Role** | Keyless CI auth. IAM OIDC provider trusts `token.actions.githubusercontent.com`; scoped role assumed per run. | Role limited to S3 sync on the bucket + CloudFront invalidation on the distribution. |

### Estimated monthly cost (low-traffic marketing site)

| Item | Estimate |
|---|---|
| Route 53 hosted zone | $0.50 (already paying) |
| ACM certificate | $0.00 (free) |
| S3 storage (~50 MB) + requests | < $0.02 |
| CloudFront data out + requests | ~$0.00 (1 TB/mo + 10M req perpetual free tier) |
| CloudFront Functions | ~$0.00 (2M free) |
| GitHub Actions | $0.00 (included minutes) |
| **Total** | **≈ $0.50–$1.00 / month** |

---

## Components

| Path | Purpose |
|---|---|
| `next.config.mjs` | Enables static export (`output: 'export'`, `images.unoptimized: true`). |
| `docs/infra/cloudformation.yml` | IaC template for all AWS resources. |
| `.github/workflows/deploy.yml` | Build + deploy pipeline. |

> `out/` and `.next/` are git-ignored — the build artifact is never committed.

### Static export configuration

`next.config.mjs` sets `output: "export"` so `next build` emits a fully static site
to `out/`, and `images.unoptimized: true` because `next/image` (used in
`src/components/Screenshot.tsx`) has no build-time optimizer in a static export.
There is no separate `next export` step in Next.js 14.

### Infrastructure (`docs/infra/cloudformation.yml`)

A single CloudFormation stack, deployed **in `us-east-1`** (CloudFront requires the
ACM cert there), creates: the private S3 bucket and its OAC bucket policy; the
DNS-validated ACM certificate; the Origin Access Control; the CloudFront Function
(`www`→apex redirect + directory→`index.html` rewrite); the CloudFront distribution;
the Route 53 alias records (apex + www, A + AAAA); and the GitHub OIDC provider +
scoped deploy role. It references the existing hosted zone via the `HostedZoneId`
parameter and exports the bucket name, distribution ID, distribution domain, and
deploy-role ARN as stack Outputs.

### CI/CD (`.github/workflows/deploy.yml`)

On push to `main` (or manual dispatch) the workflow: checks out the repo, installs
with `npm ci`, runs `npm run build`, verifies `out/index.html` exists, assumes the
AWS deploy role via OIDC, then performs a two-pass S3 sync — hashed assets with a
1-year immutable cache and HTML with `max-age=0, must-revalidate` — and finally
issues a CloudFront invalidation. A `concurrency` group prevents overlapping
production deploys.

---

## One-time bootstrap (run once, by a human with AWS admin)

1. Confirm `npm run build` emits `out/index.html` locally.
2. Deploy the stack **in us-east-1** (ACM validation against the existing zone runs
   automatically and may take a few minutes):
   ```bash
   aws cloudformation deploy \
     --region us-east-1 \
     --stack-name tether-zero-site \
     --template-file docs/infra/cloudformation.yml \
     --capabilities CAPABILITY_NAMED_IAM \
     --parameter-overrides \
       HostedZoneId=<EXISTING_ZONE_ID> \
       GitHubOrg=<ORG> GitHubRepo=<REPO> \
       CreateOIDCProvider=true   # false if the account already has the GitHub OIDC provider
   ```
3. Read the stack Outputs and configure the GitHub repo:
   - Secret `AWS_DEPLOY_ROLE_ARN` → `DeployRoleArn` output.
   - Variable `S3_BUCKET` → `BucketName` output.
   - Variable `CLOUDFRONT_DISTRIBUTION_ID` → `DistributionId` output.
   - (Optional) a `production` Environment with a required reviewer for deploy gating.
4. Push to `main` (or run the workflow manually) — the pipeline builds and deploys.

> If the account already has a `token.actions.githubusercontent.com` OIDC provider
> (common when other repos already use OIDC), pass `CreateOIDCProvider=false` to
> avoid an "EntityAlreadyExists" error.

---

## Verification

1. **Local build** — `npm run build` produces `out/index.html` and `out/_next/...` with no errors.
2. **Stack** — `aws cloudformation describe-stacks` shows `CREATE_COMPLETE`; the ACM cert shows `ISSUED`.
3. **HTTPS + cert** — `curl -I https://tether-zero.com` returns `200` with a valid TLS chain; the page renders including the StrategySimulator.
4. **www redirect** — `curl -I https://www.tether-zero.com` returns `301` with `location: https://tether-zero.com/`.
5. **HTTP→HTTPS** — `curl -I http://tether-zero.com` returns a `301`/`302` to HTTPS.
6. **Origin is private** — the S3 REST URL (`https://<bucket>.s3.amazonaws.com/index.html`) returns `403 AccessDenied`, proving content is only reachable through CloudFront.
7. **CI keyless auth** — a `main` push completes the workflow green; the run logs show an assumed-role session (no static keys), an S3 sync, and a CloudFront invalidation.
8. **Cache headers** — `curl -I https://tether-zero.com/_next/static/...` shows `cache-control: public, max-age=31536000, immutable`; the root HTML shows `max-age=0, must-revalidate`.

---

## Notes & trade-offs

- **Why not S3 static-website hosting alone?** It can't do HTTPS on a custom domain. CloudFront + ACM is required for TLS, and OAC keeps the bucket fully private.
- **Why CloudFront Functions over Lambda@Edge?** The redirect/rewrite logic is trivial; Functions are cheaper, faster (sub-ms), and have a generous free tier.
- **`PriceClass_100`** limits edge locations to North America + Europe — the cheapest tier. Bump to `PriceClass_All` only if global latency becomes a concern.
- **Security posture:** no long-lived AWS credentials anywhere; the deploy role is scoped to exactly one bucket + one distribution and only trusts the `main` branch of this repo.

---

## Troubleshooting / known gotchas

### OIDC `sub` claim changes when the job uses an `environment:`

**Symptom:** the "Configure AWS credentials (OIDC)" step fails with:
```
Could not assume role with OIDC: Not authorized to perform sts:AssumeRoleWithWebIdentity
```
even though the OIDC provider exists and the role ARN is correct.

**Cause:** GitHub's OIDC token `sub` (subject) claim — which the role's trust policy
matches against — **changes format depending on job context**:

| Job context | `sub` value |
|---|---|
| Plain push to a branch | `repo:<org>/<repo>:ref:refs/heads/<branch>` |
| Job declares `environment: <name>` | `repo:<org>/<repo>:environment:<name>` |
| Pull request | `repo:<org>/<repo>:pull_request` |

Our `deploy` job sets `environment: production`, so GitHub sends the
`...:environment:production` subject — but a trust policy that only allows the
`...:ref:refs/heads/main` subject rejects it. The two are mutually exclusive: when
an environment is set, the branch-ref form is **not** sent.

**Fix (already applied):** the deploy-role trust policy allows **both** subjects via
a list, parameterised by `GitHubEnvironment` (default `production`) in
`cloudformation.yml`:
```yaml
StringLike:
  token.actions.githubusercontent.com:sub:
    - !Sub "repo:${GitHubOrg}/${GitHubRepo}:ref:refs/heads/${GitHubBranch}"
    - !Sub "repo:${GitHubOrg}/${GitHubRepo}:environment:${GitHubEnvironment}"
```

**Rule of thumb:** if you add/rename/remove `environment:` in `deploy.yml`, update the
trust policy's `sub` condition to match (and re-run `bootstrap.sh` to apply it).
To inspect what the role currently trusts:
```bash
aws iam get-role --role-name tether-zero-gha-deploy \
  --query "Role.AssumeRolePolicyDocument.Statement[0].Condition.StringLike" --output json
```

### CloudFront Function (and OAC) names reject dots

**Symptom:** stack creation fails and rolls back with:
```
Value 'tether-zero.com-edge-router' at 'name' failed to satisfy constraint:
Member must satisfy regular expression pattern: [a-zA-Z0-9-_]{1,64}
```

**Cause:** CloudFront Function names allow only `[a-zA-Z0-9-_]` — no dots — so a name
derived from the domain (`tether-zero.com-...`) is invalid.

**Fix (already applied):** resource *names* use the dot-free `ResourcePrefix`
parameter (default `tether-zero`); only domain-bearing *values* (cert SANs, CloudFront
aliases, Route 53 record names, and the redirect function's code) keep the dotted
domain.

### Recovering from a rolled-back stack

A failed create leaves the stack in `ROLLBACK_COMPLETE`, which **cannot be updated** —
delete it before re-running `bootstrap.sh`:
```bash
aws cloudformation delete-stack --stack-name tether-zero-site --region us-east-1
aws cloudformation wait stack-delete-complete --stack-name tether-zero-site --region us-east-1
```
