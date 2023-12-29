import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SignUpForm.css';
import SuccessAnimation from '../SuccessAnimation/SuccessAnimation';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'custom-username') {
      setUsername(value);
    } else if (id === 'custom-email') {
      setEmail(value);
    } else if (id === 'custom-password') {
      setPassword(value);
    }
  };

  const validateForm = () => {
    let isValid = true;

    // Validate name
    if (!/^[a-zA-Z]+$/.test(username)) {
      setNameError('--> Name should contain only alphabets <--');
      isValid = false;
    } else {
      setNameError('');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('--> Invalid email format <--');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        '--> Password must be strong. Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number <--'
      );
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowSuccess(true);
      setShowForm(false);
    }
  };

  return (
    <div>
      {!showSuccess && (
        <div className="custom-login">
          <div className="custom-login-inner">
            <div className="custom-login-avatar"></div>
            <input
              type="text"
              placeholder="Enter your name"
              id="custom-username"
              value={username}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Enter your email"
              id="custom-email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Enter a strong password"
              id="custom-password"
              value={password}
              onChange={handleInputChange}
            />
            <input type="submit" value="Sign up" onClick={handleFormSubmit} />
          </div>
        </div>
      )}

      <div className="error-container">
        {nameError && <div className="error-message">{nameError}</div>}
        {emailError && <div className="error-message">{emailError}</div>}
        {passwordError && <div className="error-message">{passwordError}</div>}
      </div>
      {showSuccess && <SuccessAnimation name={username} />}
    </div>
  );
};

export default SignUpForm;
