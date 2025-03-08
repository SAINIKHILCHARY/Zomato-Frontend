import axios from 'axios';

const API_URL = 'https://zomato-backend--gilt.vercel.app';

console.log('API URL:', API_URL); // Debug log

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false,
  timeout: 10000
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Remove trailing slashes and clean up URL
    config.url = config.url.replace(/\/+$/, '').replace('//', '/');
    
    // Log the request for debugging
    console.log('Making request to:', `${config.baseURL}${config.url}`);
    console.log('Request method:', config.method?.toUpperCase());
    console.log('Request data:', config.data ? {
      ...config.data,
      password: config.data.password ? '[HIDDEN]' : undefined
    } : undefined);
    
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
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('Server error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config.url
      });
    } else if (error.request) {
      // Request made but no response
      console.error('No response received:', {
        url: error.config.url,
        method: error.config.method
      });
    } else {
      // Request setup error
      console.error('Request failed:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api; 