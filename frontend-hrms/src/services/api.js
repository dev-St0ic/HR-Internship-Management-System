import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth endpoints
export const authAPI = {
    login: (email, password) =>
        api.post('/auth/login', { email, password }),
    
    register: (userData) =>
        api.post('/auth/register', userData),
    
    logout: () =>
        api.post('/auth/logout'),
    
    getCurrentUser: () =>
        api.get('/auth/me'),
};

// Users endpoints
export const usersAPI = {
    getAll: () => api.get('/users'),
    getById: (id) => api.get(`/users/${id}`),
    update: (id, data) => api.put(`/users/${id}`, data),
    delete: (id) => api.delete(`/users/${id}`),
};

// Interns endpoints
export const internsAPI = {
    getAll: () => api.get('/interns'),
    getById: (id) => api.get(`/interns/${id}`),
    create: (data) => api.post('/interns', data),
    update: (id, data) => api.put(`/interns/${id}`, data),
    delete: (id) => api.delete(`/interns/${id}`),
};

// Applications endpoints
export const applicationsAPI = {
    getAll: () => api.get('/applications'),
    getById: (id) => api.get(`/applications/${id}`),
    create: (data) => api.post('/applications', data),
    update: (id, data) => api.put(`/applications/${id}`, data),
    delete: (id) => api.delete(`/applications/${id}`),
};

// Departments endpoints
export const departmentsAPI = {
    getAll: () => api.get('/departments'),
    getById: (id) => api.get(`/departments/${id}`),
};

export default api;
