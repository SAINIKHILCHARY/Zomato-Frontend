import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Make the API call to the signup endpoint
      const response = await api.post('/api/auth/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      console.log('Signup successful:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setError('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else if (response.data.success) {
        setError('Registration completed. Please login to continue.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Signup failed:', err);
      
      if (err.response?.status === 500) {
        setError('Server error. Please try again later.');
      } else if (err.response?.status === 409) {
        setError('User already exists with this email.');
      } else if (err.response?.status === 400) {
        setError(err.response.data.message || 'Please check your input and try again.');
      } else if (err.message.includes('Network Error')) {
        setError('Unable to connect to the server. Please try again later.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }

      // Log detailed error for debugging
      console.error('Detailed error:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && (
        <div className="error-message" style={{ 
          color: error.includes('successful') ? 'green' : 'red',
          marginBottom: '10px',
          padding: '10px',
          borderRadius: '4px',
          backgroundColor: error.includes('successful') ? '#e8f5e9' : '#ffebee'
        }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="form-control"
            style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control"
            style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            className="form-control"
            style={{ padding: '10px', width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="submit-button"
          style={{ 
            padding: '12px',
            backgroundColor: loading ? '#ccc' : '#ff4081',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'all 0.3s ease'
          }}
        >
          {loading ? 'Signing up...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default Signup; 