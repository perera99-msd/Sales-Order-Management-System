import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5250/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Enhanced response interceptor to show actual error details
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response Success:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    // Enhanced error logging
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('🚨 BACKEND VALIDATION ERROR:', {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.response.config?.url,
        method: error.response.config?.method?.toUpperCase(),
        requestData: error.response.config?.data,
        responseData: error.response.data,
        validationErrors: error.response.data?.errors
      });
      
      // Show detailed validation errors if available
      if (error.response.data?.errors) {
        console.error('📋 VALIDATION ERRORS:');
        Object.keys(error.response.data.errors).forEach(key => {
          console.error(`  ${key}:`, error.response.data.errors[key]);
        });
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('🚨 NETWORK ERROR: No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('🚨 REQUEST SETUP ERROR:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;