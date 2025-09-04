// src/services/authService.ts
import { authAPI, User } from './api';

class AuthService {
  private user: User | null = null;
  private token: string | null = null;

  constructor() {
    // Récupérer le token du localStorage au démarrage
    this.token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      const response = await authAPI.login({ email, password });
      const { user, token } = response.data;
      
      // Stocker les données
      this.user = user;
      this.token = token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erreur de connexion');
    }
  }

  async register(userData: {
    email: string;
    password: string;
    profile: {
      nom: string;
      prenom: string;
      telephone?: string;
      ville?: string;
    };
    role: string;
  }): Promise<{ user: User; token: string }> {
    try {
      const response = await authAPI.register(userData);
      const { user, token } = response.data;
      
      // Stocker les données
      this.user = user;
      this.token = token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erreur d\'inscription');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (!this.token) return null;
    
    try {
      const response = await authAPI.getCurrentUser();
      this.user = response.data;
      localStorage.setItem('user', JSON.stringify(this.user));
      return this.user;
    } catch (error) {
      this.logout();
      return null;
    }
  }

  logout(): void {
    this.user = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getUser(): User | null {
    return this.user;
  }

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  hasRole(role: string): boolean {
    return this.user?.role === role;
  }

  isStudent(): boolean {
    return this.hasRole('student');
  }

  isUniversity(): boolean {
    return this.hasRole('university');
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }
}

export const authService = new AuthService();
export default authService;