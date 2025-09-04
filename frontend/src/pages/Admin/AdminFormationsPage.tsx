import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Home, Search, Filter, Eye, Edit, Trash2, CheckCircle, XCircle, Shield } from 'lucide-react';
import { formationsAPI, Formation, University } from '../../services/api';
import { authService } from '../../services/authService';
import { universitiesAPI } from '../../services/api';

const AdminFormationsPage = () => {
  const navigate = useNavigate();
  const [formations, setFormations] = useState<(Formation & { universityName?: string })[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUniversity, setFilterUniversity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchFormations();
    fetchUniversities();
  }, []);

  const fetchFormations = async () => {
    try {
      setLoading(true);
      const response = await formationsAPI.getAll();
      
      // Fetch university names for each formation
      const formationsWithUniversityNames = await Promise.all(
        response.data.map(async (formation) => {
          try {
            const universityResponse = await universitiesAPI.getById(formation.universityId);
            return {
              ...formation,
              universityName: universityResponse.data?.name || 'Université inconnue'
            };
          } catch (err) {
            return {
              ...formation,
              universityName: 'Université inconnue'
            };
          }
        })
      );
      
      setFormations(formationsWithUniversityNames);
    } catch (err) {
      console.error('Error fetching formations:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUniversities = async () => {
    try {
      const response = await universitiesAPI.getAll();
      setUniversities(response.data);
    } catch (err) {
      console.error('Error fetching universities:', err);
    }
  };

  const handlePublishFormation = async (formationId: string, publish: boolean) => {
    try {
      await formationsAPI.update(formationId, { published: publish });
      fetchFormations(); // Refresh the list
    } catch (err) {
      console.error('Error updating formation:', err);
    }
  };

  const handleDeleteFormation = async (formationId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      try {
        await formationsAPI.delete(formationId);
        fetchFormations(); // Refresh the list
      } catch (err) {
        console.error('Error deleting formation:', err);
      }
    }
  };

  const getStatusColor = (published: boolean) => {
    return published 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case 'onsite': return 'Présentiel';
      case 'online': return 'En ligne';
      case 'hybrid': return 'Hybride';
      default: return mode;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'onsite': return 'bg-green-100 text-green-800';
      case 'online': return 'bg-blue-100 text-blue-800';
      case 'hybrid': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFormations = formations.filter(formation => {
    const matchesSearch = formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (formation.universityName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUniversity = filterUniversity === 'all' || formation.universityId === filterUniversity;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'published' && formation.published) || 
                         (filterStatus === 'draft' && !formation.published);
    return matchesSearch && matchesUniversity && matchesStatus;
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
              <h1 className="text-2xl font-bold text-gray-900">Modération des formations</h1>
              <p className="text-gray-600 mt-1">
                Contrôler la qualité du contenu des formations
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
            <p className="mt-4 text-gray-600">Chargement des formations...</p>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher par titre ou université..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filterUniversity}
                  onChange={(e) => setFilterUniversity(e.target.value)}
                >
                  <option value="all">Toutes les universités</option>
                  {universities.map(university => (
                    <option key={university._id} value={university._id}>
                      {university.name}
                    </option>
                  ))}
                </select>

                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="published">Publiées</option>
                  <option value="draft">Brouillons</option>
                </select>
              </div>
            </div>

            {/* Formations List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Formations ({filteredFormations.length})
                </h2>
              </div>

              {filteredFormations.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Aucune formation trouvée</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Formation
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Université
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Domaine
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mode
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Frais
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredFormations.map((formation) => (
                        <tr key={formation._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {formation.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formation.level} - {formation.duration}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formation.universityName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formation.domain}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getModeColor(formation.mode)}`}>
                              {getModeLabel(formation.mode)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(formation.published)}`}>
                              {formation.published ? 'Publiée' : 'Brouillon'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formation.fees.toLocaleString()} Ar
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              {!formation.published ? (
                                <button
                                  onClick={() => handlePublishFormation(formation._id, true)}
                                  className="text-green-600 hover:text-green-900 p-1"
                                  title="Publier"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handlePublishFormation(formation._id, false)}
                                  className="text-yellow-600 hover:text-yellow-900 p-1"
                                  title="Mettre en brouillon"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}
                              <button className="text-blue-600 hover:text-blue-900 p-1" title="Voir détails">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900 p-1" title="Modifier">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteFormation(formation._id)}
                                className="text-red-600 hover:text-red-900 p-1"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
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

export default AdminFormationsPage;