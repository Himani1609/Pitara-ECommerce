const axios = require('axios');

const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await axios.post('https://yourdomain.com/send-email.php', {
      to,
      subject,
      html,
    });

    if (response.data.status === 'success') {
      console.log('Email sent via PHP');
    } else {
      console.error('Email failed in PHP:', response.data);
    }
  } catch (error) {
    console.error('Error calling PHP mailer:', error.message);
  }
};

module.exports = sendEmail;
