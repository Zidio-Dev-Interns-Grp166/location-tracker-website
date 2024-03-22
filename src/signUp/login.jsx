import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import "./signUp.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const postLoginDetails = () => {
      fetch("http://localhost:3002/api/login", {
          method: "POST",
          body: JSON.stringify({
              email,
              password,
              confirmPassword,
          }),
          headers: {
              "Content-Type": "application/json",
          },
      })
          .then((res) => res.json())
          .then((data) => {
            if (data.error_message) {
              alert(data.error_message);
            } else {
                //👇🏻 Logs the username to the console
                console.log(data.data);
                //👇🏻 save the username to the local storage
                localStorage.setItem("username", data.data.username);
                //👇🏻 Navigates to the 2FA route
                navigate("/dashboard"); 
            }
          })
          .catch((err) => console.error(err));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      validateForm();
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      postLoginDetails();
    }

    const validateForm = () => {
      let isValid = true;
      const errors = {};

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


    const gotoSignUpPage = () => navigate("/signUp");

    return (
      <div>
        <Navbar />
        <div className='containers'>
          <h2 className='title'>Login</h2>
          <form onSubmit={handleSubmit}>
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
            <button className="button"  type="submit">Login</button>
          </form>

          <div className="promo">
            Don't have an account?{" "}
            <span className='link-to-login' onClick={gotoSignUpPage}>
                Sign up
            </span>
          </div>
        </div>
        <Footer />
      </div>
    );

} 

export default Login;