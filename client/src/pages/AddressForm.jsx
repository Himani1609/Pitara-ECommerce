import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/pages/Checkout.css';

const AddressForm = ({ userId, onSuccess }) => {
  const [form, setForm] = useState({ firstName: '',lastName: '', street: '', city: '', state: '', zip: '', country: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/addresses', { userId, ...form })
      .then(() => {
        alert('Address added!');
        onSuccess();
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="First Name" onChange={e => setForm({ ...form, firstName: e.target.value })} required />
      <input placeholder="Last Name" onChange={e => setForm({ ...form, lastName: e.target.value })} required />
      <input placeholder="Street" onChange={e => setForm({ ...form, street: e.target.value })} required />
      <input placeholder="City" onChange={e => setForm({ ...form, city: e.target.value })} required />
      <input placeholder="State" onChange={e => setForm({ ...form, state: e.target.value })} required />
      <input placeholder="ZIP" onChange={e => setForm({ ...form, zip: e.target.value })} required />
      <input placeholder="Country" onChange={e => setForm({ ...form, country: e.target.value })} required />
      <input placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} required />
      <button type="submit" className="btn-add-address">Save Address</button>
    </form>
  );
};

export default AddressForm;
