import { createPortal } from 'react-dom';
import React, { useState } from 'react';
import axios from 'axios';
import gLogo from '/images/google.png';
import mailLogo from '/images/emailIcon.jpg';
import closeBtn from '/images/closeBtn.jpg';
import signupCss from './Signup.module.css';

// Configure axios defaults
axios.defaults.baseURL = '/api';  // Updated to use Vite proxy
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

const Signup = ({ setAuth }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        checkbox: false
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
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
                setError('Please enter your full name');
                return;
            }
            if (!formData.email.trim()) {
                setError('Please enter your email');
                return;
            }
            if (!formData.password.trim()) {
                setError('Please enter your password');
                return;
            }
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters long');
                return;
            }
            if (!formData.checkbox) {
                setError('Please accept the terms and conditions');
                return;
            }

            // Make API call to backend
            console.log('Attempting to connect to:', axios.defaults.baseURL);
            const response = await axios.post('/signup', {
                username: formData.username.trim(),
                email: formData.email.trim(),
                password: formData.password
            });

            console.log('Signup response:', response.data);

            if (response.data.success) {
                setSuccess('Registration successful! Redirecting to login...');
                // Clear form
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    checkbox: false
                });
                // Redirect to login after a short delay
                setTimeout(() => {
                    setAuth({ closed: false, login: true, signup: false });
                }, 1500);
            } else {
                setError(response.data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Signup error:', err);
            
            // Network or connection errors
            if (err.code === 'ERR_NETWORK') {
                setError('Unable to connect to server. Please check if the backend server is running at http://localhost:4001');
            } 
            // CORS errors
            else if (err.code === 'ERR_FORBIDDEN' || err.response?.status === 403) {
                setError('Access forbidden. Please check CORS settings on the backend server.');
            }
            // Existing user
            else if (err.response?.status === 409) {
                setError('Email already exists. Please use a different email or try logging in.');
            }
            // Validation errors
            else if (err.response?.status === 400) {
                setError(err.response.data.message || 'Invalid input. Please check your details.');
            }
            // Server errors
            else if (err.response?.status >= 500) {
                setError('Server error. Please try again later.');
            }
            // Unknown errors
            else {
                setError('An unexpected error occurred. Please try again later.');
                console.error('Detailed error:', {
                    code: err.code,
                    message: err.message,
                    response: err.response,
                    status: err.response?.status
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const loginDiv = (
        <div className={signupCss.outerDiv}>
            <div className={signupCss.modal}>
                <div className={signupCss.header}>
                    <span className={signupCss.ttl}>Signup</span>
                    <span 
                        className={signupCss.closeBtn} 
                        onClick={() => setAuth({ closed: true, login: false, signup: false })}
                    >
                        <img className={signupCss.closeBtnImg} src={closeBtn} alt="close button" />
                    </span>
                </div>
                <div className={signupCss.lgBox}>
                    {error && <div className={signupCss.error}>{error}</div>}
                    {success && <div className={signupCss.success}>{success}</div>}
                    
                    <input 
                        className={signupCss.inpBox} 
                        type="text" 
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder='Full Name'
                        required 
                    />
                    <input 
                        className={signupCss.inpBox} 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Email'
                        required 
                    />
                    <input 
                        className={signupCss.inpBox} 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Password'
                        required
                        minLength={6} 
                    />
                    <span className={signupCss.termsTxt}>
                        <input 
                            type="checkbox" 
                            name="checkbox" 
                            checked={formData.checkbox}
                            onChange={handleChange}
                            className={signupCss.checkBox}
                            required 
                        />
                        <span>
                            I agree to Zomato's <a href="#" className={signupCss.termaAnchor}>Terms of Service</a>, <a href="#" className={signupCss.termaAnchor}>Privacy Policy</a> and <a href="#" className={signupCss.termaAnchor}>Content Policies</a>
                        </span>
                    </span>
                    <button 
                        className={`${signupCss.btn} ${loading ? signupCss.loading : ''}`} 
                        onClick={handleSubmit}
                        disabled={loading || !formData.username || !formData.email || !formData.password || !formData.checkbox}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </div>
                <div className={signupCss.orBreak}>
                    <span className={signupCss.orBreakText}>or</span>
                </div>
                <div className={signupCss.socialSignupBox}>
                    <img className={signupCss.icon} src={gLogo} alt="google login" />
                    Continue with Google
                </div>
                <hr className={signupCss.break} />
                <div className={signupCss.newToZomato}>
                    Already have an account? 
                    <div 
                        className={signupCss.createAcc} 
                        onClick={() => setAuth({ closed: false, login: true, signup: false })}
                    >
                        Log in
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(loginDiv, document.getElementById('modal'));
};

export default Signup;