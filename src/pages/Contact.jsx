import React from 'react';
import '../styles/pages/Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Whether you have a question about your order, our products, or anything else, feel free to get in touch.</p>

        <div className="contact-details">
          <p><strong>Email:</strong> support@pitara-store.com</p>
          <p><strong>Phone:</strong> +1 (437) 123-4567</p>
          <p><strong>Store Address:</strong></p>
          <p>
            Pitara Crafts Store<br />
            123 Handmade Lane,<br />
            Mississauga, ON, Canada<br />
            L5M 1Y1
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
