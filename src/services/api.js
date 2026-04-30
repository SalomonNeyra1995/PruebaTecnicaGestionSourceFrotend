import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7137/api',  // ← tu puerto real
  headers: { 'Content-Type': 'application/json' }
});

export const getCasas = () => api.get('/casas');
export const getCasa = (id) => api.get(`/casas/${id}`);
export const createCasa = (data) => api.post('/casas', data);
export const updateCasa = (id, data) => api.put(`/casas/${id}`, data);
export const deleteCasa = (id) => api.delete(`/casas/${id}`);