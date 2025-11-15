import api from './api';

export const itemService = {
  getAll: () => api.get('/items'),
  getById: (id) => api.get(`/items/${id}`),
};