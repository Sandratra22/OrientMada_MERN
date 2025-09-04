import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import UniversitiesPage from './pages/UniversitiesPage';
import UniversityDetailPage from './pages/UniversityDetailPage';
import FormationsPage from './pages/FormationsPage';
import FormationDetailPage from './pages/FormationDetailPage';
import FormationCreatePage from './pages/FormationCreatePage';
import UniversityPendingPage from './pages/UniversityPendingPage';
import EnrollmentPage from './pages/EnrollmentPage';
import ChatPage from './pages/ChatPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import MissionPage from './pages/MissionPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import BlogPage from './pages/BlogPage';
import AdminUsersPage from './pages/Admin/AdminUsersPage';
import AdminUniversitiesPage from './pages/Admin/AdminUniversitiesPage';
import AdminUniversityDetailPage from './pages/Admin/AdminUniversityDetailPage';
import AdminFormationsPage from './pages/Admin/AdminFormationsPage';
import AdminAnalyticsPage from './pages/Admin/AdminAnalyticsPage';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import UniversityDashboard from './pages/Dashboard/UniversityDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/universities" element={<UniversitiesPage />} />
        <Route path="/universities/:id" element={<UniversityDetailPage />} />
        <Route path="/formations" element={<FormationsPage />} />
        <Route path="/formations/create" element={<FormationCreatePage />} />
        <Route path="/formations/:id" element={<FormationDetailPage />} />
        <Route path="/university-pending" element={<UniversityPendingPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/universities" element={<AdminUniversitiesPage />} />
        <Route path="/admin/universities/:id" element={<AdminUniversityDetailPage />} />
        <Route path="/admin/formations" element={<AdminFormationsPage />} />
        <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        <Route path="/enrollment/:formationId" element={<EnrollmentPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/mission" element={<MissionPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/university" element={<UniversityDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;