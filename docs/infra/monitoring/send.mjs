/**
 * Alert delivery via AWS. Thin wrappers around the SDK clients that are
 * bundled with the Node.js Lambda runtime (not installed locally, so this
 * module is deliberately excluded from the unit tests — the live-fire test
 * covers it end-to-end).
 */

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({});

/** Send an alert email via SES. Recipient/sender come from env config. */
export async function sendEmail({ sender, recipient, subject, body }) {
  await ses.send(
    new SendEmailCommand({
      Source: sender,
      Destination: { ToAddresses: [recipient] },
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body: { Text: { Data: body, Charset: "UTF-8" } },
      },
    }),
  );
}
