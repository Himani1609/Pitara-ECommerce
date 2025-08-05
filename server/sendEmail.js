const axios = require('axios');

const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await axios.post('https://himanibansal.com/send-email.php', {
      to: 'info@himanibansal.com',
      subject: 'Pitara Order Confirmation',
      message: '<h2>Thanks for your order!</h2><p>We\'ll ship it soon.</p>'
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
