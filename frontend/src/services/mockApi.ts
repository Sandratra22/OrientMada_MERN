// Mock API service for development - simulates backend responses
import { universities, formations, users, enrollments } from '../data/mockData';
import { University, Formation, User, Enrollment } from './api';

class MockApiService {
  // Simulate API delay
  private delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Universities
  async getUniversities(params?: { city?: string; domain?: string; q?: string }): Promise<University[]> {
    await this.delay();
    let filtered = [...universities];

    if (params?.city) {
      filtered = filtered.filter(u => u.city.toLowerCase().includes(params.city!.toLowerCase()));
    }
    if (params?.q) {
      filtered = filtered.filter(u =>
        u.name.toLowerCase().includes(params.q!.toLowerCase()) ||
        u.description.toLowerCase().includes(params.q!.toLowerCase())
      );
    }

    return filtered;
  }

  async getUniversityById(id: string): Promise<University | null> {
    await this.delay();
    return universities.find(u => u._id === id) || null;
  }

  // Formations
  async getFormations(params?: {
    universityId?: string;
    domain?: string;
    level?: string;
    mode?: string;
    q?: string;
  }): Promise<Formation[]> {
    await this.delay();
    let filtered = [...formations];

    if (params?.universityId) {
      filtered = filtered.filter(f => f.universityId === params.universityId);
    }
    if (params?.domain) {
      filtered = filtered.filter(f => f.domain.toLowerCase().includes(params.domain!.toLowerCase()));
    }
    if (params?.level) {
      filtered = filtered.filter(f => f.level.toLowerCase().includes(params.level!.toLowerCase()));
    }
    if (params?.mode) {
      filtered = filtered.filter(f => f.mode === params.mode);
    }
    if (params?.q) {
      filtered = filtered.filter(f =>
        f.title.toLowerCase().includes(params.q!.toLowerCase()) ||
        f.domain.toLowerCase().includes(params.q!.toLowerCase())
      );
    }

    return filtered;
  }

  async getFormationById(id: string): Promise<Formation | null> {
    await this.delay();
    return formations.find(f => f._id === id) || null;
  }

  // Users
  async authenticateUser(email: string, password: string): Promise<{ user: User; token: string }> {
    await this.delay();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword as User,
        token: `mock-token-${user._id}-${Date.now()}`
      };
    }
    throw new Error('Email ou mot de passe incorrect');
  }

  async registerUser(userData: {
    email: string;
    password: string;
    profile: any;
    role: string;
  }): Promise<{ user: User; token: string }> {
    await this.delay();
    const newUser: User = {
      _id: `user-${Date.now()}`,
      email: userData.email,
      role: userData.role as any,
      profile: userData.profile
    };

    return {
      user: newUser,
      token: `mock-token-${newUser._id}-${Date.now()}`
    };
  }

  async getUserById(id: string): Promise<User | null> {
    await this.delay();
    return users.find(u => u._id === id) || null;
  }

  // Enrollments
  async getEnrollments(params?: { userId?: string; formationId?: string }): Promise<Enrollment[]> {
    await this.delay();
    let filtered = [...enrollments];

    if (params?.userId) {
      filtered = filtered.filter(e => e.userId === params.userId);
    }
    if (params?.formationId) {
      filtered = filtered.filter(e => e.formationId === params.formationId);
    }

    return filtered;
  }

  async createEnrollment(enrollmentData: {
    formationId: string;
    answers: any;
  }): Promise<Enrollment> {
    await this.delay();
    const newEnrollment: Enrollment = {
      _id: `enrollment-${Date.now()}`,
      formationId: enrollmentData.formationId,
      userId: 'current-user-id', // Would be from auth context
      status: 'pending',
      answers: enrollmentData.answers,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return newEnrollment;
  }

  // Chat/Messages (simplified)
  async getThreads(): Promise<any[]> {
    await this.delay();
    return [
      {
        id: '1',
        universityName: 'Université d\'Antananarivo',
        lastMessage: 'Votre dossier a été reçu',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      }
    ];
  }

  async getMessages(threadId: string): Promise<any[]> {
    await this.delay();
    return [
      {
        id: '1',
        sender: 'university',
        message: 'Bonjour, nous avons bien reçu votre dossier d\'inscription.',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: '2',
        sender: 'student',
        message: 'Merci, quand aurai-je une réponse ?',
        timestamp: new Date(Date.now() - 1800000).toISOString()
      }
    ];
  }
}

export const mockApi = new MockApiService();