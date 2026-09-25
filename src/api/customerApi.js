import axiosClient from './axiosClient';

// POST /customers
export const createCustomer = (payload) => {
  // payload: { name, phone, email }
  return axiosClient.post('/customers', payload).then((res) => res.data);
};
