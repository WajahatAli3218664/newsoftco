// Vercel API route for sending emails using Gmail SMTP
// This is a permanent solution that never expires

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, website, gclid, source_ref_id, message, country } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, and message are required' });
  }

  // Create email content
  const emailSubject = `Softco Digital - New Contact Form Submission from ${name}`;
  const emailBody = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Website: ${website || 'Not provided'}
GCL ID: ${gclid || 'Not provided'}
Source Ref ID: ${source_ref_id || 'Not provided'}
Country: ${country || 'Unknown'}
Message: ${message}
  `.trim();

  // Use nodemailer with Gmail SMTP
  // Note: In production, use environment variables for credentials
  // For now, we'll use a simple approach
  
  try {
    // Using dynamic import for nodemailer
    const nodemailer = await import('nodemailer');
    
    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fahadahmed500000@gmail.com',
        pass: 'ndfn onwf hvcm hymj' // App password
      }
    });

    // Send email
    await transporter.sendMail({
      from: 'glenmaxwell2312@gmail.com',
      to: 'fahadahmed500000@gmail.com',
      subject: emailSubject,
      text: emailBody
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!'
    });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
}
