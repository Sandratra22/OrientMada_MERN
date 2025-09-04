// src/services/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Configuration axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs d'auth
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gérer le token expiré (401) en déconnectant l'utilisateur
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Types
export interface University {
  _id: string;
  name: string;
  city: string;
  description: string;
  website?: string;
  contacts: {
    email: string;
    phone: string;
  };
  logoUrl?: string;
  isVerified: boolean;
  ownerUserId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Formation {
  _id: string;
  universityId: string;
  title: string;
  domain: string;
  level: string;
  duration: string;
  fees: number;
  mode: 'onsite' | 'online' | 'hybrid';
  prerequisites: string[];
  sessions: Array<{
    startDate: string;
    endDate: string;
  }>;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id: string;
  email: string;
  role: 'student' | 'university' | 'admin';
  status: 'active' | 'pending' | 'suspended';
  profile: {
    nom: string;
    prenom: string;
    telephone?: string;
    ville?: string;
  };
  universityInfo?: {
    universityName: string;
    universityCity: string;
    universityDescription: string;
    universityWebsite?: string;
    universityPhone: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Enrollment {
  _id: string;
  formationId: string;
  userId: string;
  status: 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected';
  answers: Record<string, any>;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  history?: Array<{
    at: string;
    by: string;
    status: string;
    comment: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  _id: string;
  threadKey: string;
  fromUserId: string;
  toUserId: string;
  body: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  readAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Services API
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (userData: { email: string; password: string; profile: any; role: string; universityInfo?: any }) =>
    api.post('/auth/register', userData),
  
  getCurrentUser: () => api.get('/auth/me'),
};

export const universitiesAPI = {
  getAll: (params?: { city?: string; domain?: string; q?: string }) =>
    api.get('/universities', { params }),
  
  getById: (id: string) => api.get(`/universities/${id}`),
  
  create: (data: Partial<University>) => api.post('/universities', data),
  
  update: (id: string, data: Partial<University>) =>
    api.patch(`/universities/${id}`, data),
  
  delete: (id: string) => api.delete(`/universities/${id}`),
};

export const formationsAPI = {
  getAll: (params?: {
    universityId?: string;
    domain?: string;
    level?: string;
    mode?: string;
    q?: string;
  }) => api.get('/formations', { params }),
  
  getById: (id: string) => api.get(`/formations/${id}`),
  
  create: (data: Partial<Formation>) => api.post('/formations', data),
  
  update: (id: string, data: Partial<Formation>) =>
    api.patch(`/formations/${id}`, data),
  
  delete: (id: string) => api.delete(`/formations/${id}`),
};

export const enrollmentsAPI = {
  getAll: (params?: { userId?: string; formationId?: string }) =>
    api.get('/enrollments', { params }),
  
  create: (data: {
    formationId: string;
    answers: Record<string, any>;
    attachments?: Array<{ name: string; url: string; type: string }>;
  }) => api.post('/enrollments', data),
  
  update: (id: string, data: Partial<Enrollment>) => api.patch(`/enrollments/${id}`, data),
  
  getById: (id: string) => api.get(`/enrollments/${id}`),
};

export const chatAPI = {
  getThreads: () => api.get('/chat/threads'),
  
  getMessages: (threadKey: string) =>
    api.get('/chat/messages', { params: { threadKey } }),
  
  sendMessage: (data: {
    toUserId: string;
    body: string;
    attachments?: ChatMessage['attachments'];
  }) => api.post('/chat/messages', data),
};

export const adminAPI = {
  getAllUsers: () => api.get('/admin/users'),
  
  updateUserStatus: (userId: string, status: 'active' | 'pending' | 'suspended') =>
    api.patch(`/admin/users/${userId}/status`, { status }),
  
  getPendingUniversities: () => api.get('/admin/universities/pending'),
  
  approveUniversity: (userId: string) => api.patch(`/admin/universities/${userId}/approve`),
  
  rejectUniversity: (userId: string) => api.patch(`/admin/universities/${userId}/reject`),
};

export default api;
