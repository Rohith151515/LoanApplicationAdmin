import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Attach the auth token (if present) to every outgoing request.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  const isPublicAuthRequest = ['/auth/login', '/auth/register'].some((path) => config.url?.endsWith(path));
  if (token && !isPublicAuthRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error responses and handle expired/invalid sessions in one place.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message || error.response?.data?.error;
    const message = serverMessage || (error.code === 'ECONNABORTED'
      ? 'The API took too long to respond. Check that the backend is running and try again.'
      : !error.response
        ? `Cannot reach the API at ${BASE_URL}. Start the backend or update VITE_API_BASE_URL.`
        : error.message || 'Something went wrong. Please try again.');

    if (status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }

    return Promise.reject({ status, message, raw: error });
  }
);

export default axiosClient;
