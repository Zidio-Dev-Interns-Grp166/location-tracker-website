import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import "./signUp.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const postLoginDetails = () => {
        fetch("http://localhost:3002/api/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === 200) { // Check if login is successful
                localStorage.setItem("access_token", data.access_token);
                navigate("/dashboard"); // Redirect to dashboard on successful login
            } else {
                if (data.errors && data.errors.password) {
                    alert(data.errors.password); // Display error message if password is incorrect
                } else {
                    alert("An error occurred. Please try again."); // Default error message
                }
            }
        })
        .catch((err) => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            postLoginDetails();
            setEmail("");
            setPassword("");
        }
    };

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
                    <button className="button" type="submit">Login</button>
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
