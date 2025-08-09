import axios from 'axios';

export const API_BASE_URL = 'https://kb-assessment.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const apiCalls = {
  loginUser: (credentials) => api.post('/auth/login', credentials),
  registerUser: (userData) => api.post('/auth/register', userData),
  verifyUser: () => api.get('/auth/verify'),
  logout: ()=> api.post('/auth/logout'),

  fetchNotes: () => api.get('/notes/get'),
  addNote: (note) => api.post('/notes/add', note),
  updateNote: (id, note) => api.put(`/notes/${id}`, note),
  deleteNote: (id) => api.delete(`/notes/${id}`),
};

export default apiCalls;
