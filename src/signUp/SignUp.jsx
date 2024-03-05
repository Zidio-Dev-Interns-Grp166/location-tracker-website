import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import './signUp.css';

const Signup = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();



  const handleSubmit = (e) => {
      e.preventDefault();
      validateForm();
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

  };

  const validateForm = () => {
  let isValid = true;
  const errors = {};

      if(!username.trim()){
          errors.username = "please enter your username";
          isValid =  false;
      }

      if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
      }

      if (!password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
      }

      if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
      }

      setErrors(errors);
      return isValid;
  };

  const gotoLoginPage = () => navigate("/login");

  return(
    <div>
      <Navbar />
      <div className="containers" >
        <h2 className="title">Create a new account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username"  className="label">Username:</label>
            <input id="username" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}  className="input" />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>
      
          <div className="input-group">
            <label htmlFor="email"  className="label">Email:</label>
            <input id="email" type="email" name="email" value={email}  onChange={(e) => setEmail(e.target.value)}  className="input" />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
      
          <div className="input-group">
            <label htmlFor="password"  className="label">Password</label>
            <input id="password" type="password" name="password" value={password}  onChange={(e) => setPassword(e.target.value)} className="input" />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
      
          <div className="input-group">
            <label htmlFor="confirmPassword"  className="label">Confirm Password:</label>
            <input id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="input" />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
          </div>
      
          <button type="submit" className="button">SIGN UP</button>
        
        </form>

        <div className="promo">
          👋 Have an account already?{" "}
          <span className='link-to-login' onClick={gotoLoginPage}>
            Login
          </span>
        </div>

      </div>
      <Footer />
    </div>
  );

};  

export default Signup;