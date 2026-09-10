const RESEND_API_URL = 'https://api.resend.com/emails';
const TO_ADDRESS = 'hello@xyloradigital.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const body = req.body || {};
  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const phone = (body.phone || '').trim();
  const business = (body.business || '').trim();
  const enquiry = (body.enquiry || '').trim();
  const message = (body.message || '').trim();

  // Honeypot: bots fill every field, real visitors never see or fill this one.
  // Pretend success so bots don't learn the field is being checked.
  if ((body.website || '').trim()) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !business || !enquiry || !message) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    console.error('contact.js: missing RESEND_API_KEY or RESEND_FROM_EMAIL');
    return res.status(500).json({ error: 'Failed to send message.' });
  }

  const textLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || '(not provided)'}`,
    `Business name: ${business}`,
    `Nature of enquiry: ${enquiry}`,
    '',
    'Message:',
    message
  ];

  try {
    const resendRes = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: [TO_ADDRESS],
        reply_to: email,
        subject: `New enquiry — ${business}`,
        text: textLines.join('\n'),
        html: `<p>${textLines.map(escapeHtml).join('<br>')}</p>`
      })
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text().catch(() => '');
      console.error('contact.js: Resend error', resendRes.status, errText);
      return res.status(502).json({ error: 'Failed to send message.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact.js: request failed', err);
    return res.status(500).json({ error: 'Failed to send message.' });
  }
};
