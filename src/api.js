import axios from 'axios';

const API_URL = 'https://zomato-backend--gilt.vercel.app';

console.log('API URL:', API_URL); // Debug log

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false,
  timeout: 15000 // 15 second timeout
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Remove trailing slashes from the URL
    config.url = config.url.replace(/\/+$/, '');
    
    // Log the request for debugging
    console.log('API Request:', {
      fullUrl: `${config.baseURL}${config.url}`,
      method: config.method?.toUpperCase(),
      headers: config.headers,
      data: config.data ? {
        ...config.data,
        password: config.data.password ? '[HIDDEN]' : undefined
      } : undefined
    });
    
    return config;
  },
  (error) => {
    console.error('Request Error:', {
      message: error.message,
      config: error.config
    });
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      statusText: response.statusText,
      data: response.data
    });
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Response Error:', {
        url: error.config?.url,
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Request Error:', {
        url: error.config?.url,
        message: 'No response received',
        request: error.request
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Setup Error:', {
        message: error.message,
        config: error.config
      });
    }
    return Promise.reject(error);
  }
);

export default api; 