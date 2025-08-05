const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/admins', require('./routes/adminRoutes'));
app.use('/api/addresses', require('./routes/addressRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});


app.get('/', (req, res) => {
  res.send('Pitara backend is live!');
});


const sendEmail = require('./sendEmail'); 

app.get('/test-email', async (req, res) => {
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Exists" : "Missing");
    await sendEmail({
      to: 'himanibansal1691998@gmail.com', 
      subject: 'Test Email from Pitara',
      html: '<h2>This is a test email</h2><p>If you see this, Brevo works!</p>'
    });
    res.send('Email sent successfully');
  } catch (err) {
    console.error('Email test failed:', err.message);
    res.status(500).send('Email test failed: ' + err.message);
  }
});
