import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Clock, CheckCircle, XCircle, MessageCircle, Bell, TrendingUp, BookOpen, LogOut, User, Home, AlertTriangle } from 'lucide-react';
import { enrollmentsAPI, formationsAPI, Enrollment, Formation } from '../../services/api';
import { authService } from '../../services/authService';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<(Enrollment & { formation?: Formation | null })[]>([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

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

  useEffect(() => {
    if (authService.isAuthenticated() && authService.isStudent()) {
      fetchEnrollments();
    }
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await enrollmentsAPI.getAll({ userId: authService.getUser()?._id });
      const enrollmentsData = response.data;

      // Fetch formation details for each enrollment
      const enrollmentsWithFormations = await Promise.all(
        enrollmentsData.map(async (enrollment: Enrollment) => {
          try {
            const formationResponse = await formationsAPI.getById(enrollment.formationId);
            return { ...enrollment, formation: formationResponse.data };
          } catch (err) {
            console.error('Error fetching formation:', err);
            return enrollment;
          }
        })
      );

      setEnrollments(enrollmentsWithFormations);

      // Calculate stats
      const stats = enrollmentsWithFormations.reduce(
        (acc, enrollment) => {
          acc.total++;
          switch (enrollment.status) {
            case 'pending':
              acc.pending++;
              break;
            case 'approved':
              acc.approved++;
              break;
            case 'rejected':
              acc.rejected++;
              break;
          }
          return acc;
        },
        { total: 0, pending: 0, approved: 0, rejected: 0 }
      );
      setStats(stats);
    } catch (err: any) {
      setError('Erreur lors du chargement des inscriptions');
      console.error('Error fetching enrollments:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'submitted':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'under_review':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Brouillon';
      case 'submitted':
        return 'Soumis';
      case 'under_review':
        return 'En cours d\'examen';
      case 'accepted':
        return 'Accepté';
      case 'rejected':
        return 'Refusé';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'under_review':
        return 'bg-orange-100 text-orange-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de votre tableau de bord...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Mon tableau de bord</h1>
              <p className="text-gray-600 mt-1">
                Bienvenue, {authService.getUser()?.profile.prenom} {authService.getUser()?.profile.nom}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Home className="w-4 h-4" />
                Accueil
              </Link>
              <Link
                to="/formations"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Parcourir les formations
              </Link>
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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-gray-600">Total inscriptions</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
                <div className="text-gray-600">En attente</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.approved}</div>
                <div className="text-gray-600">Acceptées</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.rejected}</div>
                <div className="text-gray-600">Refusées</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Mes inscriptions récentes</h2>

          {enrollments.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune inscription</h3>
              <p className="text-gray-600 mb-4">
                Vous n'avez pas encore d'inscription. Commencez par explorer les formations disponibles.
              </p>
              <Link
                to="/formations"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Découvrir les formations
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enrollments.slice(0, 5).map((enrollment) => (
                <div key={enrollment._id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {enrollment.formation?.title || 'Formation inconnue'}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(enrollment.status)}`}>
                          {getStatusLabel(enrollment.status)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>Domaine: {enrollment.formation?.domain || 'N/A'}</span>
                        <span>Niveau: {enrollment.formation?.level || 'N/A'}</span>
                        <span>Frais: {enrollment.formation?.fees?.toLocaleString() || 'N/A'} Ar</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Demandée le {new Date(enrollment.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>

                    <div className="ml-4 flex items-center gap-2">
                      {getStatusIcon(enrollment.status)}
                      <Link
                        to={`/formations/${enrollment.formationId}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        Voir la formation
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {enrollments.length > 5 && (
                <div className="text-center pt-4">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Voir toutes les inscriptions ({enrollments.length})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Échangez avec les universités concernant vos inscriptions.
            </p>
            <Link
              to="/chat"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Ouvrir la messagerie →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Bell className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Restez informé des mises à jour de vos dossiers.
            </p>
            <Link
              to="/notifications"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Voir les notifications →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Recommandations</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Découvrez des formations adaptées à votre profil.
            </p>
            <Link
              to="/formations"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Explorer →
            </Link>
          </div>
        </div>

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

export default StudentDashboard;