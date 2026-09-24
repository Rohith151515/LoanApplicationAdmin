import axiosClient from './axiosClient';

// POST /cashiers
export const createCashier = (payload) => axiosClient.post('/cashiers', payload).then((res) => res.data);