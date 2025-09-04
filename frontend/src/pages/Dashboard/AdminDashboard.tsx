import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, BookOpen, FileText, TrendingUp, Shield, Settings, BarChart3, LogOut, Home, AlertTriangle, CheckCircle, XCircle, Eye } from 'lucide-react';
import { authService } from '../../services/authService';
import { adminAPI, User } from '../../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalUniversities: 0,
    totalFormations: 0,
    totalEnrollments: 0,
    pendingVerifications: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [pendingUniversities, setPendingUniversities] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    authService.logout();
    navigate('/');
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  const handleApproveUniversity = async (userId: string) => {
    try {
      await adminAPI.approveUniversity(userId);
      // Refresh the list
      fetchDashboardData();
    } catch (err) {
      console.error('Error approving university:', err);
    }
  };

  const handleRejectUniversity = async (userId: string) => {
    try {
      await adminAPI.rejectUniversity(userId);
      // Refresh the list
      fetchDashboardData();
    } catch (err) {
      console.error('Error rejecting university:', err);
    }
  };

  useEffect(() => {
    if (authService.isAuthenticated() && authService.isAdmin()) {
      fetchDashboardData();
    }
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch pending universities
      const pendingResponse = await adminAPI.getPendingUniversities();
      setPendingUniversities(pendingResponse.data);

      // TODO: Implement API calls to fetch admin dashboard data
      // For now, using mock data
      setStats({
        totalUsers: 1250,
        totalUniversities: 25,
        totalFormations: 150,
        totalEnrollments: 3200,
        pendingVerifications: pendingResponse.data.length
      });

      setRecentActivity([
        {
          id: '1',
          type: 'user_registration',
          description: 'Nouvel étudiant inscrit: Marie Andria',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
        },
        {
          id: '2',
          type: 'university_verification',
          description: 'Université EMIT validée',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
        },
        {
          id: '3',
          type: 'formation_created',
          description: 'Nouvelle formation créée: Data Science',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
        }
      ]);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
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
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord administrateur</h1>
              <p className="text-gray-600 mt-1">
                Supervision globale de la plateforme OrientMada
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Home className="w-4 h-4" />
                Accueil
              </Link>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Paramètres
              </button>
              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement du tableau de bord...</p>
          </div>
        ) : (
          <>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Activité récente</h2>

                {recentActivity.length === 0 ? (
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucune activité récente</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentActivity.map((activity: any) => (
                      <div key={activity.id} className="border-l-4 border-blue-500 pl-4 py-2">
                        <p className="text-gray-900 font-medium">{activity.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(activity.timestamp).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Actions rapides</h2>

                <div className="space-y-4">
                  <button
                    onClick={() => navigate('/admin/users')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-medium transition-colors text-left flex items-center gap-3"
                  >
                    <Users className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Gérer les utilisateurs</div>
                      <div className="text-sm opacity-90">Voir et modifier les comptes utilisateur</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigate('/admin/universities')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg font-medium transition-colors text-left flex items-center gap-3"
                  >
                    <BookOpen className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Valider les universités</div>
                      <div className="text-sm opacity-90">Approuver les nouvelles universités</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigate('/admin/formations')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg font-medium transition-colors text-left flex items-center gap-3"
                  >
                    <FileText className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Modérer les formations</div>
                      <div className="text-sm opacity-90">Contrôler la qualité du contenu</div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigate('/admin/analytics')}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg font-medium transition-colors text-left flex items-center gap-3"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <div>
                      <div className="font-medium">Voir les statistiques</div>
                      <div className="text-sm opacity-90">Analyser l'utilisation de la plateforme</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">État du système</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Serveur API</h3>
                  <p className="text-sm text-gray-600">Opérationnel</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Base de données</h3>
                  <p className="text-sm text-gray-600">Connectée</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">Sauvegarde</h3>
                  <p className="text-sm text-gray-600">En cours</p>
                </div>
              </div>
            </div>

            {/* University Validation */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Validation des universités</h2>

              {pendingUniversities.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <p className="text-gray-600">Aucune université en attente de validation</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingUniversities.map((university: User) => (
                    <div key={university._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {university.universityInfo?.universityName}
                            </h3>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                              En attente
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                            <div>
                              <span className="font-medium">Contact:</span> {university.profile.prenom} {university.profile.nom}
                            </div>
                            <div>
                              <span className="font-medium">Ville:</span> {university.universityInfo?.universityCity}
                            </div>
                            <div>
                              <span className="font-medium">Email:</span> {university.email}
                            </div>
                            <div>
                              <span className="font-medium">Téléphone:</span> {university.universityInfo?.universityPhone}
                            </div>
                          </div>

                          {university.universityInfo?.universityDescription && (
                            <div className="mb-3">
                              <span className="font-medium text-sm text-gray-600">Description:</span>
                              <p className="text-sm text-gray-700 mt-1">{university.universityInfo.universityDescription}</p>
                            </div>
                          )}

                          <div className="text-xs text-gray-500">
                            Demande créée le {new Date(university.createdAt || '').toLocaleDateString('fr-FR')}
                          </div>
                        </div>

                        <div className="ml-4 flex flex-col gap-2">
                          <button
                            onClick={() => handleApproveUniversity(university._id)}
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approuver
                          </button>
                          <button
                            onClick={() => handleRejectUniversity(university._id)}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            Rejeter
                          </button>
                          <button className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                            <Eye className="w-4 h-4" />
                            Détails
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleLogoutCancel} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Confirmer la déconnexion</h3>
                <p className="text-sm text-gray-500">Êtes-vous sûr de vouloir vous déconnecter ?</p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={handleLogoutCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;