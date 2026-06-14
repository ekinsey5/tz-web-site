#!/usr/bin/env bash
#
# One-time bootstrap for the Tether Zero static site infrastructure.
#
# Deploys the CloudFormation stack (S3 + CloudFront + ACM + Route 53 + GitHub OIDC
# role) in us-east-1, then prints the stack outputs you need to configure GitHub.
#
# Prerequisites:
#   - AWS CLI v2, authenticated with admin-level credentials for the target account
#   - (Optional) GitHub CLI `gh`, authenticated, to auto-set repo secret/variables
#
# Usage:
#   ./docs/infra/bootstrap.sh
#
# Values are pre-filled for this project but can be overridden via environment
# variables, e.g.:  STACK_NAME=tz-staging ./docs/infra/bootstrap.sh
#
set -euo pipefail

# --- Configuration (pre-filled for this project) ---------------------------
AWS_REGION="${AWS_REGION:-us-east-1}"          # MUST be us-east-1 (CloudFront needs the ACM cert here)
STACK_NAME="${STACK_NAME:-tether-zero-site}"
TEMPLATE_FILE="${TEMPLATE_FILE:-docs/infra/cloudformation.yml}"

BUCKET_NAME_PARAM="${BUCKET_NAME_PARAM:-tether-zero-site-origin}"  # dot-free S3 origin bucket name
HOSTED_ZONE_ID="${HOSTED_ZONE_ID:-Z001776426RC78U239EK1}"   # tether-zero.com public hosted zone
GITHUB_ORG="${GITHUB_ORG:-ekinsey5}"
GITHUB_REPO="${GITHUB_REPO:-tz-web-site}"
GITHUB_BRANCH="${GITHUB_BRANCH:-main}"
CREATE_OIDC_PROVIDER="${CREATE_OIDC_PROVIDER:-true}"          # none exists in this account as of bootstrap

# --- Sanity checks ---------------------------------------------------------
command -v aws >/dev/null || { echo "error: aws CLI not found" >&2; exit 1; }
[ -f "$TEMPLATE_FILE" ] || { echo "error: template not found: $TEMPLATE_FILE (run from repo root)" >&2; exit 1; }

echo "Deploying stack '$STACK_NAME' to $AWS_REGION ..."
echo "  HostedZoneId        = $HOSTED_ZONE_ID"
echo "  GitHubOrg/Repo      = $GITHUB_ORG/$GITHUB_REPO ($GITHUB_BRANCH)"
echo "  CreateOIDCProvider  = $CREATE_OIDC_PROVIDER"
echo

# --- Deploy ----------------------------------------------------------------
# Note: ACM DNS validation against the existing zone runs automatically and the
# stack will sit in CREATE_IN_PROGRESS for a few minutes while the cert issues.
aws cloudformation deploy \
  --region "$AWS_REGION" \
  --stack-name "$STACK_NAME" \
  --template-file "$TEMPLATE_FILE" \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides \
    DomainName=tether-zero.com \
    BucketName="$BUCKET_NAME_PARAM" \
    HostedZoneId="$HOSTED_ZONE_ID" \
    GitHubOrg="$GITHUB_ORG" \
    GitHubRepo="$GITHUB_REPO" \
    GitHubBranch="$GITHUB_BRANCH" \
    CreateOIDCProvider="$CREATE_OIDC_PROVIDER"

echo
echo "Stack deployed. Reading outputs ..."

get_output() {
  aws cloudformation describe-stacks \
    --region "$AWS_REGION" \
    --stack-name "$STACK_NAME" \
    --query "Stacks[0].Outputs[?OutputKey=='$1'].OutputValue" \
    --output text
}

BUCKET_NAME="$(get_output BucketName)"
DISTRIBUTION_ID="$(get_output DistributionId)"
DISTRIBUTION_DOMAIN="$(get_output DistributionDomain)"
DEPLOY_ROLE_ARN="$(get_output DeployRoleArn)"

cat <<EOF

==================== Stack Outputs ====================
  BucketName          = $BUCKET_NAME
  DistributionId      = $DISTRIBUTION_ID
  DistributionDomain  = $DISTRIBUTION_DOMAIN
  DeployRoleArn       = $DEPLOY_ROLE_ARN
=======================================================

Configure GitHub (repo: $GITHUB_ORG/$GITHUB_REPO):
  Secret    AWS_DEPLOY_ROLE_ARN        = $DEPLOY_ROLE_ARN
  Variable  S3_BUCKET                  = $BUCKET_NAME
  Variable  CLOUDFRONT_DISTRIBUTION_ID = $DISTRIBUTION_ID
EOF

# --- Optionally push config to GitHub via gh CLI ---------------------------
if command -v gh >/dev/null 2>&1; then
  echo
  read -r -p "Set these on GitHub now via 'gh'? [y/N] " reply
  if [[ "$reply" =~ ^[Yy]$ ]]; then
    gh secret   set AWS_DEPLOY_ROLE_ARN        --repo "$GITHUB_ORG/$GITHUB_REPO" --body "$DEPLOY_ROLE_ARN"
    gh variable set S3_BUCKET                  --repo "$GITHUB_ORG/$GITHUB_REPO" --body "$BUCKET_NAME"
    gh variable set CLOUDFRONT_DISTRIBUTION_ID --repo "$GITHUB_ORG/$GITHUB_REPO" --body "$DISTRIBUTION_ID"
    echo "GitHub secret + variables set."
  fi
else
  echo
  echo "(gh CLI not found — set the secret/variables manually in GitHub repo settings.)"
fi

echo
echo "Done. Push to '$GITHUB_BRANCH' (or run the 'Deploy to AWS' workflow) to publish."
