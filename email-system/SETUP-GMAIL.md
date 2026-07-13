# Gmail App Password Setup Guide
## For Dark Factory / OGRE Computer — info@studexmeat.com

Google requires a **16-character App Password** to send email from apps (like this one).
This is NOT your regular Google password. It's a separate, app-specific credential.

---

## Step-by-Step Instructions for Tumelo

### Prerequisites
- You must be signed into **https://myaccount.google.com** as `info@studexmeat.com`
- Use Chrome or Firefox on desktop (mobile won't work for this setup)

---

### Step 1 — Enable 2-Step Verification (REQUIRED — Google won't show App Passwords without it)

**What you'll see:**
- Google Account page with your avatar and name in the top-right corner

**Action:**
1. Go to **https://myaccount.google.com**
2. Click **"Security"** in the left sidebar (you may need to click the hamburger menu ≡ on mobile)
3. Under **"How you sign in to Google"** section, look for **"2-Step Verification"**
   - It may show as "Off" with a toggle switch
4. Click **"2-Step Verification"** → click **"Get Started"**
5. Enter your phone number and verify with an SMS or Google Authenticator code
6. Once verified, it will show **"Off → On"** with a green shield icon

**Screenshot description:**
> A blue Google Security page. Left sidebar shows "Security". Main panel shows "2-Step Verification" card with a toggle showing "Off" in red, and a button "Get Started" in blue. Below it is a note: "Protect your account with 2-Step Verification. We strongly recommend you turn it on."

---

### Step 2 — Navigate to App Passwords

**Action:**
After 2-Step Verification is enabled, go directly to:
**👉 https://myaccount.google.com/apppasswords**

> ⚠️ You cannot search for "App Passwords" in the regular Security menu. You must go to that exact URL or click the link from within the 2-Step Verification settings page.

**Screenshot description:**
> A white page titled "App passwords." A gray box at the top reads: "App passwords are a legacy verification method that Google will no longer support in the future. Learn more." Below is a dropdown labeled "Select app" and a text field for "Select device." The bottom of the box has a blue "Generate" button (initially grayed out until selections are made).

---

### Step 3 — Select App and Device

**Action:**
1. In the **"Select app"** dropdown, choose **"Other (Custom name)"**
   - A text field will appear below it
2. Type: **`OpenClaw/DarkFactory`**
3. In the **"Select device"** dropdown, choose **"Other (Custom name)"**
4. Type: **`OGRE Email System`**
5. Click the blue **"Generate"** button

**Screenshot description:**
> The dropdown has been changed to "Other (Custom name)" and the text field now shows "OpenClaw/DarkFactory". Below it, another dropdown shows "Other (Custom name)" with "OGRE Email System" in the adjacent text field. The "Generate" button at the bottom is now bright blue.

---

### Step 4 — COPY THE PASSWORD IMMEDIATELY

**What you'll see:**
A modal popup appears with a yellow warning banner and a 16-character password displayed in a bordered box. It looks like:

```
xxxx xxxx xxxx xxxx
```

(e.g., `abcd efgh ijkl mnop` — just an example, yours will be different)

**⚠️ CRITICAL — READ THIS:**
- Google **only shows this password ONCE**
- It will never be shown again
- If you miss it, you must revoke it and generate a new one
- Do NOT close the tab until you've copied and stored it

**Screenshot description:**
> A modal dialog box titled "Your app password for your account." Inside a gray bordered box with yellow background, the password is displayed in large bold monospace font: "abcd efgh ijkl mnop" with a small × button to delete it. Below the box is a gray note: "This password is only shown once. You will not be asked to confirm it when you use it." There is a a blue "Done" button at the bottom right.

---

### Step 5 — Give the Password to Your Agent (Cipher Tr@ce)

**What to do:**
1. Copy the 16-character password (no spaces)
2. Send it to Cipher Tr@ce in this chat
3. Cipher Tr@ce will store it securely in `/workspace/email-system/.env.guide`
4. Cipher Tr@ce will then configure the email system and delete the `.env.guide` file

**⚠️ Security note:**
- After configuration is confirmed, the agent will delete `.env.guide`
- The password will only live in the environment variable used by the email system
- Never share it in Slack, email, or any other channel

---

### Step 6 — Verify the Setup (After Agent Confirms)

Once Cipher Tr@ce confirms configuration, run:
```bash
node /workspace/email-system/test-email.js
```

Expected output: `✅ Test email sent` to info@studexmeat.com

If you receive an email in your inbox — the system is live.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "App Passwords" not visible | 2-Step Verification is NOT enabled — go back to Step 1 |
| Password accepted but email not sending | Check if Gmail blocked "Less secure app access" — it should work with App Password |
| Still blocked | Visit https://myaccount.google.com → Security → "Less secure app access" is off by default — App Password bypasses it |
| Forgot the password | Revoke it at https://myaccount.google.com/apppasswords and generate a new one |

---

## What This Password Enables

The App Password allows **nodemailer** (the Node.js email library) to send emails via Gmail SMTP on behalf of `info@studexmeat.com`. It does NOT:
- Give access to your Google Drive
- Give access to your Gmail inbox
- Allow reading your emails
- Work with your regular password

It ONLY allows this specific email-sending app to send emails from this address.

---

*Guide created by Cipher Tr@ce for Tumelo Ramaphosa — Dark Factory / OGRE Computer*
*Last updated: 29 June 2026*
