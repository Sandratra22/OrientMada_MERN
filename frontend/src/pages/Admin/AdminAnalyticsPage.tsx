import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Home, Users, BookOpen, FileText, TrendingUp, Shield, Calendar, Filter } from 'lucide-react';
import { authService } from '../../services/authService';
import { adminAPI, formationsAPI, universitiesAPI, enrollmentsAPI } from '../../services/api';

const AdminAnalyticsPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalUniversities: 0,
    totalFormations: 0,
    totalEnrollments: 0,
    pendingVerifications: 0
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30'); // days

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch all data
      const [usersResponse, universitiesResponse, formationsResponse, enrollmentsResponse, pendingResponse] = await Promise.all([
        adminAPI.getAllUsers(),
        universitiesAPI.getAll(),
        formationsAPI.getAll(),
        enrollmentsAPI.getAll(),
        adminAPI.getPendingUniversities()
      ]);

      setStats({
        totalUsers: usersResponse.data.length,
        totalUniversities: universitiesResponse.data.length,
        totalFormations: formationsResponse.data.length,
        totalEnrollments: enrollmentsResponse.data.length,
        pendingVerifications: pendingResponse.data.length
      });
    } catch (err) {
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!authService.isAuthenticated() || !authService.isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Accès non autorisé</h2>
          <p className="text-gray-600">Cette page est réservée aux administrateurs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Statistiques et Analytics</h1>
              <p className="text-gray-600 mt-1">
                Analyser l'utilisation de la plateforme
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/dashboard/admin"
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Home className="w-4 h-4" />
                Retour au dashboard
              </Link>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des statistiques...</p>
          </div>
        ) : (
          <>
            {/* Time Range Filter */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Période d'analyse</h2>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <select
                    className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                  >
                    <option value="7">7 derniers jours</option>
                    <option value="30">30 derniers jours</option>
                    <option value="90">90 derniers jours</option>
                    <option value="365">12 derniers mois</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.totalUsers}</div>
                    <div className="text-gray-600">Utilisateurs</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.totalUniversities}</div>
                    <div className="text-gray-600">Universités</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.totalFormations}</div>
                    <div className="text-gray-600">Formations</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.totalEnrollments}</div>
                    <div className="text-gray-600">Inscriptions</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Shield className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.pendingVerifications}</div>
                    <div className="text-gray-600">En attente</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* User Growth Chart */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Croissance des utilisateurs</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Graphique d'évolution des utilisateurs</p>
                    <p className="text-sm text-gray-500 mt-2">(Implémentation à venir)</p>
                  </div>
                </div>
              </div>

              {/* Enrollment Trends */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendances des inscriptions</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Graphique des tendances d'inscription</p>
                    <p className="text-sm text-gray-500 mt-2">(Implémentation à venir)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Analytics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Analyses détaillées</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Top Universities */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Universités les plus actives</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Université d'Antananarivo</span>
                      <span className="text-sm font-medium">125 formations</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">EMIT Fianarantsoa</span>
                      <span className="text-sm font-medium">89 formations</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Université de Toamasina</span>
                      <span className="text-sm font-medium">67 formations</span>
                    </div>
                  </div>
                </div>

                {/* Popular Domains */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Domaines les plus populaires</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Informatique</span>
                      <span className="text-sm font-medium">342 inscriptions</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Médecine</span>
                      <span className="text-sm font-medium">298 inscriptions</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Ingénierie</span>
                      <span className="text-sm font-medium">256 inscriptions</span>
                    </div>
                  </div>
                </div>

                {/* Enrollment Status */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Statut des inscriptions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Acceptées</span>
                      <span className="text-sm font-medium text-green-600">1,245</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">En cours</span>
                      <span className="text-sm font-medium text-yellow-600">356</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Refusées</span>
                      <span className="text-sm font-medium text-red-600">89</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;