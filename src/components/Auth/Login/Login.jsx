import {useState} from "react";
import { createPortal } from 'react-dom';
import React from 'react';
import axios from 'axios';

import gLogo from '/images/google.png';
import mailLogo from '/images/emailIcon.jpg';
import closeBtn from '/images/closeBtn.jpg';

import loginCss from './Login.module.css';

// Configure axios defaults
axios.defaults.baseURL = 'https://zomato-backend-ygx.vercel.app/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

const Login = ({ setAuth, setLoggedIn }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');

            // Validate form
            if (!formData.username.trim()) {
                setError('Please enter your username');
                return;
            }
            if (!formData.password.trim()) {
                setError('Please enter your password');
                return;
            }

            // Make API call to backend
            const response = await axios.post('/login', {
                username: formData.username.trim(),
                password: formData.password
            });

            console.log('Login response:', response.data);

            if (response.data.success) {
                setSuccess('Login successful!');
                setLoggedIn(true);
                // Clear form
                setFormData({
                    username: '',
                    password: ''
                });
                // Close modal after success
                setTimeout(() => {
                    setAuth({ closed: true, login: false, signup: false });
                }, 1500);
            } else {
                setError(response.data.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            if (err.code === 'ERR_NETWORK') {
                setError('Unable to connect to server. Please check if the backend server is running.');
            } else {
                setError(err.response?.data?.message || 'Invalid username or password.');
            }
        } finally {
            setLoading(false);
        }
    };

    const loginDiv = (
        <div className={loginCss.outerDiv}>
            <div className={loginCss.modal}>
                <div className={loginCss.header}>
                    <span className={loginCss.ttl}>Login</span>
                    <span className={loginCss.closeBtn} onClick={() => setAuth({ closed: true, login: false, signup: false })}>
                        <img className={loginCss.closeBtnImg} src={closeBtn} alt="close button" />
                    </span>
                </div>
                <form className={loginCss.lgBox} onSubmit={handleSubmit}>
                    {error && <div className={loginCss.error}>{error}</div>}
                    {success && <div className={loginCss.success}>{success}</div>}
                    
                    <input 
                        className={loginCss.inpBox}
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                    <input 
                        className={loginCss.inpBox}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <button 
                        type="submit"
                        className={`${loginCss.btn} ${loading ? loginCss.loading : ''}`}
                        disabled={loading || !formData.username || !formData.password}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className={loginCss.orBreak}>
                    <span className={loginCss.orBreakText}>or</span>
                </div>
                <button className={loginCss.socialSignupBox}>
                    <img className={loginCss.icon} src={gLogo} alt="google login" />
                    Continue with Google
                </button>
                <button className={loginCss.socialSignupBox}>
                    <img className={loginCss.icon} src={mailLogo} alt="email login" />
                    Continue with Email
                </button>
                <hr className={loginCss.break} />
                <div className={loginCss.newToZomato}>
                    New to Zomato? 
                    <div 
                        className={loginCss.createAcc} 
                        onClick={() => setAuth({ closed: false, login: false, signup: true })}
                    >
                        Create Account
                    </div>
                </div>
                <div className={loginCss.forgotPassword}>
                    <a href="#" className={loginCss.link}>Forgot Password?</a>
                </div>
            </div>
        </div>
    );

    return createPortal(loginDiv, document.getElementById('modal'));
};

export default Login;

