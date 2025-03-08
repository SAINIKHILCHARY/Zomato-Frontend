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
      // Direct API call without /auth prefix
      const response = await api.post('/signup', formData);
      
      console.log('Signup response:', response.data);
      
      if (response.data.success || response.data.token) {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        setError('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Registration completed. Please login to continue.');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      console.error('Signup error:', err);
      
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message.includes('Network Error')) {
        setError('Unable to connect to the server. Please try again later.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }

      // Log additional error details
      if (err.response) {
        console.error('Error response:', {
          status: err.response.status,
          headers: err.response.headers,
          data: err.response.data
        });
      }
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