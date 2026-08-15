import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [gmail, setGmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && gmail) {
      onRegister(name);
    }
  };

  return (
    <div className="registration-container">
      <h2>Welcome to Math App</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="gmail">Gmail</label>
          <input
            type="email"
            id="gmail"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            placeholder="Enter your gmail"
            required
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
