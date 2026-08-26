#!/usr/bin/env bash
#
# Deploy the Tether-Zero marketing-site uptime watchdog (separate stack from
# the site itself): CloudFormation stack + Lambda code upload.
#
# Prerequisites:
#   - AWS CLI v2, authenticated for the target account (us-east-1)
#   - SES: the sender identity (domain or address) must be verified
#   - SNS SMS: account out of the SMS sandbox, or the destination number
#     verified as a sandbox destination
#
# Usage:
#   ./docs/infra/deploy-monitoring.sh
#
# Values are pre-filled for this project but overridable via environment
# variables, e.g.:  ALERT_EMAIL=me@example.com ./docs/infra/deploy-monitoring.sh
#
set -euo pipefail

# --- Configuration (pre-filled for this project) ---------------------------
AWS_REGION="${AWS_REGION:-us-east-1}"
STACK_NAME="${STACK_NAME:-tether-zero-monitoring}"
TEMPLATE_FILE="${TEMPLATE_FILE:-docs/infra/monitoring.yml}"
SOURCE_DIR="${SOURCE_DIR:-docs/infra/monitoring}"

SITE_URL="${SITE_URL:-https://tether-zero.com/}"
MARKER_TEXT="${MARKER_TEXT:-Tether-Zero}"
ALERT_EMAIL="${ALERT_EMAIL:-support@tether-zero.com}"
SENDER_EMAIL="${SENDER_EMAIL:-alerts@tether-zero.com}"
ALERT_SMS_NUMBER="${ALERT_SMS_NUMBER:-+14046259683}"
FAILURE_THRESHOLD="${FAILURE_THRESHOLD:-3}"
CHECK_INTERVAL_MINUTES="${CHECK_INTERVAL_MINUTES:-5}"

# --- Sanity checks ---------------------------------------------------------
command -v aws >/dev/null || { echo "error: aws CLI not found" >&2; exit 1; }
command -v zip >/dev/null || { echo "error: zip not found" >&2; exit 1; }
[ -f "$TEMPLATE_FILE" ] || { echo "error: template not found: $TEMPLATE_FILE (run from repo root)" >&2; exit 1; }
[ -f "$SOURCE_DIR/watchdog.mjs" ] || { echo "error: watchdog source not found in $SOURCE_DIR" >&2; exit 1; }

echo "Deploying stack '$STACK_NAME' to $AWS_REGION ..."
echo "  SiteUrl         = $SITE_URL"
echo "  AlertEmail      = $ALERT_EMAIL"
echo "  SenderEmail     = $SENDER_EMAIL"
echo "  AlertSmsNumber  = $ALERT_SMS_NUMBER"
echo "  Threshold/Rate  = $FAILURE_THRESHOLD failures / every $CHECK_INTERVAL_MINUTES min"
echo

# --- Deploy stack ----------------------------------------------------------
aws cloudformation deploy \
  --region "$AWS_REGION" \
  --stack-name "$STACK_NAME" \
  --template-file "$TEMPLATE_FILE" \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    SiteUrl="$SITE_URL" \
    MarkerText="$MARKER_TEXT" \
    AlertEmail="$ALERT_EMAIL" \
    SenderEmail="$SENDER_EMAIL" \
    AlertSmsNumber="$ALERT_SMS_NUMBER" \
    FailureThreshold="$FAILURE_THRESHOLD" \
    CheckIntervalMinutes="$CHECK_INTERVAL_MINUTES"

# --- Upload Lambda code ----------------------------------------------------
FUNCTION_NAME="$(aws cloudformation describe-stacks \
  --region "$AWS_REGION" \
  --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='FunctionName'].OutputValue" \
  --output text)"

ZIP_FILE="$(mktemp -d)/watchdog.zip"
# Ship only the runtime modules — never the tests.
zip -j -q "$ZIP_FILE" \
  "$SOURCE_DIR/watchdog.mjs" \
  "$SOURCE_DIR/check.mjs" \
  "$SOURCE_DIR/state.mjs" \
  "$SOURCE_DIR/alerts.mjs" \
  "$SOURCE_DIR/send.mjs"

echo
echo "Uploading watchdog code to $FUNCTION_NAME ..."
aws lambda update-function-code \
  --region "$AWS_REGION" \
  --function-name "$FUNCTION_NAME" \
  --zip-file "fileb://$ZIP_FILE" \
  --no-cli-pager >/dev/null
rm -f "$ZIP_FILE"

echo
echo "Done. The watchdog polls $SITE_URL every $CHECK_INTERVAL_MINUTES minutes."
echo "Tail logs with:  aws logs tail /aws/lambda/$FUNCTION_NAME --region $AWS_REGION --follow"
