import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/pages/AddressForm.css';

const AddressForm = ({ userId, onSuccess, existing = null }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: ''
  });

  useEffect(() => {
    if (existing) {
      const [firstName, lastName] = existing.fullName.split(' ');
      setForm({
        firstName: firstName || '',
        lastName: lastName || '',
        street: existing.street,
        city: existing.city,
        state: existing.state,
        zip: existing.zip,
        country: existing.country,
        phone: existing.phone
      });
    }
  }, [existing]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = { ...form };
    if (existing?._id) {
      await axios.put(`http://localhost:5000/api/addresses/${existing._id}`, payload); // 🚫 no userId
    } else {
      await axios.post('http://localhost:5000/api/addresses', { userId, ...payload });
    }

    alert(`Address ${existing ? 'updated' : 'added'}!`);
    onSuccess();
  } catch (err) {
    console.error('Error submitting address:', err);
    alert('Failed to submit address');
  }
};


  return (
    <form onSubmit={handleSubmit} className="address-form">
      {['firstName', 'lastName', 'street', 'city', 'state', 'zip', 'country', 'phone'].map((field) => (
        <input
          key={field}
          placeholder={field.replace(/([A-Z])/g, ' $1')}
          value={form[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          required
        />
      ))}
      <button type="submit">{existing ? 'Update' : 'Save'} Address</button>
    </form>
  );
};

export default AddressForm;
