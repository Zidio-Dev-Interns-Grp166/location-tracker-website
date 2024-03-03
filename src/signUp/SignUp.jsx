import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './signUp.css'

const RegisterForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // If form is valid, call onRegister callback with form data
      onRegister(formData);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    
    <div class="containers">
        <h2 class="title">Create a new account</h2>
        <form onSubmit={handleSubmit}>
        
            <div class="input-group">
                <label for="email" class="label">Email:</label>
                <input id="email" type="email" name="email" value={formData.email} onChange={handleChange}  class="input"></input>
                {errors.email && <div className="error">{errors.email}</div>}
            </div>
        
            <div class="input-group">
                <label for="password" class="label">Password</label>
                <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} class="input"></input>
            {errors.password && <div className="error">{errors.password}</div>}
            </div>
        
            <div class="input-group">
                <label for="confirmPassword" class="label">Confirm Password:</label>
                <input id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" class="input"></input>
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
            </div>
        
            <button type="submit" class="button">Create account</button>
        
        </form>

        <div class="promo">👋  Have an account already? <Link className='link-to-login' to="/login" target="_blank">Log In</Link>.</div>

    </div>
  );
};

export default RegisterForm;
