import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Home, Search, Filter, Eye, CheckCircle, XCircle, Shield } from 'lucide-react';
import { adminAPI, User } from '../../services/api';
import { authService } from '../../services/authService';

const AdminUniversitiesPage = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllUsers();
      // Filter only university users
      const universityUsers = response.data.filter(user => user.role === 'university');
      setUniversities(universityUsers);
    } catch (err) {
      console.error('Error fetching universities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveUniversity = async (userId: string) => {
    try {
      await adminAPI.approveUniversity(userId);
      fetchUniversities(); // Refresh the list
    } catch (err) {
      console.error('Error approving university:', err);
    }
  };

  const handleRejectUniversity = async (userId: string) => {
    try {
      await adminAPI.rejectUniversity(userId);
      fetchUniversities(); // Refresh the list
    } catch (err) {
      console.error('Error rejecting university:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUniversities = universities.filter(university => {
    const matchesSearch = university.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (university.universityInfo?.universityName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || university.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
              <h1 className="text-2xl font-bold text-gray-900">Gestion des universités</h1>
              <p className="text-gray-600 mt-1">
                Valider et gérer les comptes universitaires
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
            <p className="mt-4 text-gray-600">Chargement des universités...</p>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom d'université ou email..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="active">Actif</option>
                  <option value="suspended">Suspendu</option>
                </select>
              </div>
            </div>

            {/* Universities List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Universités ({filteredUniversities.length})
                </h2>
              </div>

              {filteredUniversities.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Aucune université trouvée</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Université
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ville
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date d'inscription
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUniversities.map((university) => (
                        <tr key={university._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {university.universityInfo?.universityName || 'N/A'}
                            </div>
                            <div className="text-sm text-gray-500">{university.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {university.profile.prenom} {university.profile.nom}
                            </div>
                            <div className="text-sm text-gray-500">
                              {university.universityInfo?.universityPhone || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {university.universityInfo?.universityCity || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(university.status)}`}>
                              {university.status === 'active' && 'Actif'}
                              {university.status === 'pending' && 'En attente'}
                              {university.status === 'suspended' && 'Suspendu'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {university.createdAt ? new Date(university.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              {university.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleApproveUniversity(university._id)}
                                    className="text-green-600 hover:text-green-900 p-1"
                                    title="Approuver"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleRejectUniversity(university._id)}
                                    className="text-red-600 hover:text-red-900 p-1"
                                    title="Rejeter"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() => navigate(`/admin/universities/${university._id}`)}
                                className="text-blue-600 hover:text-blue-900 p-1"
                                title="Voir détails"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUniversitiesPage;