import axios from 'axios';

// Use the environment variable or fallback to the deployed URL
const API_URL = 'https://zomato-backend--gilt.vercel.app';

console.log('API URL:', API_URL); // Debug log

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With'
  },
  withCredentials: true
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Clean up URL and ensure /api prefix
    const url = config.url.replace(/\/+/g, '/');
    config.url = url.startsWith('/api') ? url : `/api${url}`;
    
    // Add CORS headers to every request
    config.headers = {
      ...config.headers,
      'Origin': window.location.origin
    };
    
    // Log the request for debugging
    console.log('Making request to:', `${config.baseURL}${config.url}`);
    console.log('Request method:', config.method?.toUpperCase());
    console.log('Request headers:', config.headers);
    
    // Log request data without sensitive information
    if (config.data) {
      const sanitizedData = { ...config.data };
      if (sanitizedData.password) {
        sanitizedData.password = '[HIDDEN]';
      }
      console.log('Request data:', sanitizedData);
    }
    
    return config;
  },
  (error) => {
    console.error('Request setup error:', error.message);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', {
      url: response.config.url,
      status: response.status,
      statusText: response.statusText,
      data: response.data
    });
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle CORS errors specifically
      if (error.response.status === 0 || error.message.includes('CORS')) {
        console.error('CORS error detected:', {
          url: error.config?.url,
          origin: window.location.origin,
          message: error.message
        });
      } else {
        console.error('Server error:', {
          url: error.config?.url,
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        });
      }
    } else if (error.request) {
      console.error('Network error:', {
        url: error.config?.url,
        message: 'No response received from server'
      });
    } else {
      console.error('Request failed:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api; 