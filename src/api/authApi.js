import axiosClient from './axiosClient';

// POST /auth/register
export const registerUser = (payload) => {
  // payload: { role, name, mobile, email, password }
  return axiosClient.post('/auth/register', payload).then((res) => res.data);
};

// POST /auth/login
export const loginUser = (payload) => {
  // payload: { mobile, password }
  return axiosClient.post('/auth/login', payload).then((res) => res.data);
};
