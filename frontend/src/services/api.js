import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://acs-cc1l.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const linkAPI = {
  createLink: async (url, code = '') => {
    const response = await api.post('/api/links', {
      url,
      code: code || undefined
    });
    return response.data;
  },

  getAllLinks: async () => {
    const response = await api.get('/api/links');
    return response.data;
  },

  getLinkStats: async (code) => {
    const response = await api.get(`/api/links/${code}`);
    return response.data;
  },

  deleteLink: async (code) => {
    const response = await api.delete(`/api/links/${code}`);
    return response.data;
  }
};

export default api;