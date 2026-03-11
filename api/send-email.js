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

  const { name, email, website, message, country } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, and message are required' });
  }

  // Create email content
  const emailSubject = `New Contact Form Submission from ${name}`;
  const emailBody = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Website: ${website || 'Not provided'}
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
        user: 'glenmaxwell2312@gmail.com',
        pass: 'sjjb oflr mexq zjdp' // App password
      }
    });

    // Send email
    await transporter.sendMail({
      from: 'glenmaxwell2312@gmail.com',
      to: 'glenmaxwell2312@gmail.com',
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
