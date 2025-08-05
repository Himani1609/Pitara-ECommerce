const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Pitara" <info@himanibansal.com`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent');
  } catch (error) {
    console.error('Failed to send email:', error.message);
  }
};

module.exports = sendEmail;
