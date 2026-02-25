"""
email_service.py
----------------
Async email sending helpers for the StepUp landing page backend.
Sends two emails on every new consultation form submission:
  1. Team alert  - notifies all addresses in TEAM_EMAILS
  2. User confirmation - sent to the person who submitted the form
"""

import os
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import aiosmtplib

logger = logging.getLogger(__name__)

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587


# ── Low-level sender ───────────────────────────────────────────────────────────
async def _send_email(to_addresses: list[str], subject: str, html_body: str) -> None:
    """
    Send an HTML email to one or more recipients via Gmail SMTP (STARTTLS).
    Reads credentials fresh from env on every call.
    """
    smtp_email = os.getenv("SMTP_EMAIL", "")
    smtp_password = os.getenv("SMTP_APP_PASSWORD", "")

    if not smtp_email or not smtp_password:
        logger.warning("SMTP credentials not configured — email not sent.")
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"StepUp <{smtp_email}>"
    msg["To"] = ", ".join(to_addresses)
    msg.attach(MIMEText(html_body, "html"))

    try:
        await aiosmtplib.send(
            msg,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            username=smtp_email,
            password=smtp_password,
            start_tls=True,
        )
        logger.info("Email sent to: %s | Subject: %s", to_addresses, subject)
    except Exception as exc:
        logger.error("Failed to send email to %s: %s", to_addresses, exc)



# ── Public helpers ─────────────────────────────────────────────────────────────
async def send_team_alert(
    first_name: str,
    last_name: str,
    email: str,
    mobile_number: str,
    submission_id: int,
) -> None:
    """Send a new-lead alert to every address in TEAM_EMAILS."""
    team_emails = [
        e.strip() for e in os.getenv("TEAM_EMAILS", "").split(",") if e.strip()
    ]
    if not team_emails:
        logger.warning("TEAM_EMAILS is empty — team alert not sent.")
        return

    subject = f"🚀 New Consultation Request — {first_name} {last_name}"
    html = _team_alert_template(
        first_name=first_name,
        last_name=last_name,
        email=email,
        mobile_number=mobile_number,
        submission_id=submission_id,
    )
    await _send_email(team_emails, subject, html)


async def send_user_confirmation(
    first_name: str,
    last_name: str,
    email: str,
) -> None:
    """Send a branded confirmation email to the user who filled the form."""
    subject = "We've received your request — StepUp"
    html = _user_confirmation_template(first_name=first_name, last_name=last_name)
    await _send_email([email], subject, html)


# ── HTML Templates ─────────────────────────────────────────────────────────────

def _team_alert_template(
    first_name: str,
    last_name: str,
    email: str,
    mobile_number: str,
    submission_id: int,
) -> str:
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Consultation Request</title>
</head>
<body style="margin:0;padding:0;background-color:#0d0f14;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0f14;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#141720;border-radius:12px;overflow:hidden;border:1px solid #2a2d3a;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1f2e 0%,#0d1117 100%);padding:32px 40px;border-bottom:1px solid #2a2d3a;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:11px;letter-spacing:3px;color:#6b7280;text-transform:uppercase;font-weight:600;">StepUp Structured Systems</p>
                    <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#ffffff;">New Consultation Request</h1>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background:#22c55e1a;border:1px solid #22c55e55;color:#22c55e;font-size:11px;font-weight:700;letter-spacing:1.5px;padding:6px 14px;border-radius:20px;">NEW LEAD</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:15px;color:#9ca3af;line-height:1.6;">
                A new consultation request has been submitted. Here are the details:
              </p>

              <!-- Lead card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e2130;border-radius:10px;border:1px solid #2a2d3a;overflow:hidden;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #2a2d3a;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#6b7280;text-transform:uppercase;font-weight:600;">Full Name</p>
                    <p style="margin:0;font-size:17px;font-weight:600;color:#ffffff;">{first_name} {last_name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #2a2d3a;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#6b7280;text-transform:uppercase;font-weight:600;">Email Address</p>
                    <a href="mailto:{email}" style="margin:0;font-size:15px;color:#a78bfa;text-decoration:none;">{email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #2a2d3a;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#6b7280;text-transform:uppercase;font-weight:600;">Mobile Number</p>
                    <p style="margin:0;font-size:15px;color:#e5e7eb;">{mobile_number}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#6b7280;text-transform:uppercase;font-weight:600;">Submission ID</p>
                    <p style="margin:0;font-size:15px;color:#e5e7eb;">#{submission_id}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <a href="mailto:{email}?subject=Re: Your StepUp Consultation Request"
                       style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:13px 28px;border-radius:8px;letter-spacing:0.5px;">
                      Reply to Lead →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0d0f14;padding:20px 40px;border-top:1px solid #2a2d3a;">
              <p style="margin:0;font-size:12px;color:#4b5563;text-align:center;">
                This is an automated alert from the StepUp landing page. Do not reply to this email directly.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""


def _user_confirmation_template(first_name: str, last_name: str) -> str:
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We've received your request</title>
</head>
<body style="margin:0;padding:0;background-color:#0d0f14;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0f14;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#141720;border-radius:12px;overflow:hidden;border:1px solid #2a2d3a;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1f2e 0%,#0d1117 100%);padding:40px 40px 32px;text-align:center;border-bottom:1px solid #2a2d3a;">
              <p style="margin:0 0 16px;font-size:11px;letter-spacing:4px;color:#7c3aed;text-transform:uppercase;font-weight:700;">StepUp Structured Systems</p>
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;line-height:1.2;">Request Received.</h1>
              <p style="margin:12px 0 0;font-size:15px;color:#6b7280;">We'll be in touch with next steps shortly.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 20px;font-size:16px;color:#e5e7eb;line-height:1.6;">
                Hi <strong style="color:#ffffff;">{first_name}</strong>,
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#9ca3af;line-height:1.7;">
                Thank you for reaching out to StepUp. We've received your consultation request
                and a member of our team will review your details and get in touch within
                <strong style="color:#e5e7eb;">few hours.</strong>.
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#9ca3af;line-height:1.7;">
                In the meantime, feel free to explore how we help businesses design and implement
                structured digital commerce and operational systems that scale.
              </p>

              <!-- What to expect section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e2130;border-radius:10px;border:1px solid #2a2d3a;overflow:hidden;margin-bottom:32px;">
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #2a2d3a;">
                    <p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;color:#7c3aed;text-transform:uppercase;font-weight:700;">What happens next</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px;border-bottom:1px solid #2a2d3a;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:14px;vertical-align:top;">
                          <span style="display:inline-block;width:24px;height:24px;background:#7c3aed22;border:1px solid #7c3aed55;border-radius:50%;color:#a78bfa;font-size:12px;font-weight:700;text-align:center;line-height:24px;">1</span>
                        </td>
                        <td>
                          <p style="margin:0;font-size:14px;color:#e5e7eb;font-weight:600;">Team review</p>
                          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">We review your request and identify the best fit on our team.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px;border-bottom:1px solid #2a2d3a;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:14px;vertical-align:top;">
                          <span style="display:inline-block;width:24px;height:24px;background:#7c3aed22;border:1px solid #7c3aed55;border-radius:50%;color:#a78bfa;font-size:12px;font-weight:700;text-align:center;line-height:24px;">2</span>
                        </td>
                        <td>
                          <p style="margin:0;font-size:14px;color:#e5e7eb;font-weight:600;">Discovery call</p>
                          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">We reach out to schedule a call to understand your business needs.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:14px;vertical-align:top;">
                          <span style="display:inline-block;width:24px;height:24px;background:#7c3aed22;border:1px solid #7c3aed55;border-radius:50%;color:#a78bfa;font-size:12px;font-weight:700;text-align:center;line-height:24px;">3</span>
                        </td>
                        <td>
                          <p style="margin:0;font-size:14px;color:#e5e7eb;font-weight:600;">Proposal</p>
                          <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">A structured systems proposal tailored to your goals.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:14px;color:#6b7280;line-height:1.7;">
                If you have any urgent questions, reply to this email or contact us directly.
              </p>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="padding:0 40px 36px;">
              <p style="margin:0 0 4px;font-size:14px;color:#e5e7eb;font-weight:600;">The StepUp Team</p>
              <p style="margin:0;font-size:13px;color:#6b7280;">Structured Systems. Real Results.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0d0f14;padding:20px 40px;border-top:1px solid #2a2d3a;">
              <p style="margin:0;font-size:12px;color:#4b5563;text-align:center;">
                You received this email because you submitted a consultation request on our website.
                <br/>© 2025 StepUp Structured Systems. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""
