import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    // Handle network errors
    if (!error.response) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    // Handle API errors
    const { status, data } = error.response;
    let errorMessage = data.detail || 'An error occurred';

    switch (status) {
      case 400:
        errorMessage = 'Invalid request. Please check your data.';
        break;
      case 401:
        errorMessage = 'Unauthorized. Please log in.';
        break;
      case 403:
        errorMessage = 'Access forbidden.';
        break;
      case 404:
        errorMessage = 'Resource not found.';
        break;
      case 500:
        errorMessage = 'Server error. Please try again later.';
        break;
      default:
        break;
    }

    return Promise.reject(new Error(errorMessage));
  }
);