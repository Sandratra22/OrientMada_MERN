import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Users, FileText, TrendingUp, Plus, Edit, Eye, LogOut, User, Home, AlertTriangle, Clock } from 'lucide-react';
import { authService } from '../../services/authService';

const UniversityDashboard = () => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [stats, setStats] = useState({
    totalFormations: 0,
    totalEnrollments: 0,
    pendingEnrollments: 0,
    approvedEnrollments: 0
  });
  const [recentEnrollments, setRecentEnrollments] = useState<any[]>([]);
  const [formations, setFormations] = useState<any[]>([]);
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

  const handleNewFormation = () => {
    // Navigate to formation creation page
    navigate('/formations/create');
  };

  const handleViewStudentDetails = (studentId: string) => {
    // For now, show a modal with student details
    // In a real app, this would navigate to a student details page
    const student = recentEnrollments.find(e => e.id === studentId);
    if (student) {
      alert(`Détails de l'étudiant:\n\nNom: ${student.studentName}\nFormation: ${student.formationTitle}\nStatut: ${student.status === 'approved' ? 'Approuvé' : 'En attente'}\nDate: ${new Date(student.submittedAt).toLocaleDateString('fr-FR')}`);
    }
  };

  const handleViewFormation = (formationId: string) => {
    // Navigate to formation details page
    navigate(`/formations/${formationId}`);
  };

  const handleEditFormation = (formationId: string) => {
    // Navigate to formation edit page (for now, same as view)
    // In a real app, this would be an edit page
    navigate(`/formations/${formationId}?edit=true`);
  };

  useEffect(() => {
    if (authService.isAuthenticated() && authService.isUniversity()) {
      fetchDashboardData();
    }
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // TODO: Implement API calls to fetch university dashboard data
      // For now, using mock data
      setStats({
        totalFormations: 12,
        totalEnrollments: 156,
        pendingEnrollments: 23,
        approvedEnrollments: 89
      });

      setRecentEnrollments([
        {
          id: '1',
          studentName: 'Jean Rakoto',
          formationTitle: 'Informatique de Gestion',
          status: 'pending',
          submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
        },
        {
          id: '2',
          studentName: 'Marie Andria',
          formationTitle: 'Marketing Digital',
          status: 'approved',
          submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
        }
      ]);

      setFormations([
        {
          id: '1',
          title: 'Informatique de Gestion',
          level: 'Licence',
          enrollments: 45,
          status: 'published'
        },
        {
          id: '2',
          title: 'Marketing Digital',
          level: 'Master',
          enrollments: 32,
          status: 'published'
        }
      ]);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const user = authService.getUser();

  if (!authService.isAuthenticated() || !authService.isUniversity()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Accès non autorisé</h2>
          <p className="text-gray-600">Cette page est réservée aux universités</p>
        </div>
      </div>
    );
  }

  if (user?.status === 'pending') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Compte en attente de validation</h2>
          <p className="text-gray-600 mb-6">
            Votre compte universitaire doit être validé par un administrateur avant de pouvoir accéder au tableau de bord.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs">ℹ️</span>
              </div>
              <div className="ml-3 text-sm text-blue-800">
                <p className="font-medium mb-1">Validation en cours</p>
                <ul className="space-y-1">
                  <li>• Un administrateur examinera votre demande</li>
                  <li>• Vous recevrez un e-mail de confirmation</li>
                  <li>• La validation peut prendre 1-3 jours ouvrés</li>
                </ul>
              </div>
            </div>
          </div>
          <button
            onClick={() => authService.logout()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Se déconnecter
          </button>
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
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord université</h1>
              <p className="text-gray-600 mt-1">
                Gérez vos formations et suivez les inscriptions
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
              <button
                onClick={handleNewFormation}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Nouvelle formation
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.totalFormations}</div>
                    <div className="text-gray-600">Formations</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.totalEnrollments}</div>
                    <div className="text-gray-600">Inscriptions totales</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <FileText className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.pendingEnrollments}</div>
                    <div className="text-gray-600">En attente</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.approvedEnrollments}</div>
                    <div className="text-gray-600">Approuvées</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Enrollments */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Inscriptions récentes</h2>

                {recentEnrollments.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aucune inscription récente</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentEnrollments.map((enrollment: any) => (
                      <div key={enrollment.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{enrollment.studentName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            enrollment.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {enrollment.status === 'approved' ? 'Approuvé' : 'En attente'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{enrollment.formationTitle}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Soumis le {new Date(enrollment.submittedAt).toLocaleDateString('fr-FR')}
                          </span>
                          <button
                            onClick={() => handleViewStudentDetails(enrollment.id)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Voir détails
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* My Formations */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Mes formations</h2>

                {formations.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Aucune formation créée</p>
                    <button
                      onClick={handleNewFormation}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Créer ma première formation
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formations.map((formation: any) => (
                      <div key={formation.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{formation.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            formation.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {formation.status === 'published' ? 'Publié' : 'Brouillon'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {formation.level} • {formation.enrollments} inscriptions
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleViewFormation(formation.id)}
                              className="text-blue-600 hover:text-blue-700 p-1"
                              title="Voir la formation"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditFormation(formation.id)}
                              className="text-gray-600 hover:text-gray-900 p-1"
                              title="Modifier la formation"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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

export default UniversityDashboard;