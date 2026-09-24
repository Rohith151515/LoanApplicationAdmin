import axiosClient from './axiosClient';

// POST /users  ("Create users")
export const createUser = (payload) => {
  // payload: { role, name, mobile, email, password, status }
  return axiosClient.post('/users', payload).then((res) => res.data);
};

// GET /users  ("Get all users")
export const getAllUsers = () => {
  return axiosClient.get('/users').then((res) => res.data);
};

// GET /users/:id  ("Get all users By Id")
export const getUserById = (id) => {
  return axiosClient.get(`/users/${id}`).then((res) => res.data);
};

// PUT /users/:id  ("New Request" -> update user)
export const updateUser = (id, payload) => {
  // payload: { role, name, mobile, email, password, status }
  return axiosClient.put(`/users/${id}`, payload).then((res) => res.data);
};
