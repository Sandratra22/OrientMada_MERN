import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, CheckCircle, Calendar, Users, BookOpen, ArrowLeft } from 'lucide-react';
import { universitiesAPI, formationsAPI, University, Formation } from '../services/api';

const UniversityDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [university, setUniversity] = useState<University | null>(null);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchUniversityDetails();
      fetchUniversityFormations();
    }
  }, [id]);

  const fetchUniversityDetails = async () => {
    try {
      const response = await universitiesAPI.getById(id!);
      setUniversity(response.data);
    } catch (err: any) {
      setError('Erreur lors du chargement de l\'université');
      console.error('Error fetching university:', err);
    }
  };

  const fetchUniversityFormations = async () => {
    try {
      const response = await formationsAPI.getAll({ universityId: id });
      setFormations(response.data);
    } catch (err: any) {
      console.error('Error fetching formations:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de l'université...</p>
        </div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <BookOpen className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Université non trouvée</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/universities"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Retour aux universités
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link
              to="/universities"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour aux universités
            </Link>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{university.name}</h1>
                {university.isVerified && (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{university.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            {university.description && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">À propos</h2>
                <p className="text-gray-700 leading-relaxed">{university.description}</p>
              </div>
            )}

            {/* Formations */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Formations ({formations.length})
                </h2>
                <Link
                  to="/formations"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Voir toutes les formations
                </Link>
              </div>

              {formations.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Aucune formation disponible pour le moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formations.slice(0, 5).map((formation) => (
                    <div key={formation._id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {formation.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {formation.domain}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formation.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {formation.level}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              formation.mode === 'onsite' ? 'bg-green-100 text-green-800' :
                              formation.mode === 'online' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {formation.mode === 'onsite' ? 'Présentiel' :
                               formation.mode === 'online' ? 'En ligne' : 'Hybride'}
                            </span>
                            <span className="text-gray-600">
                              {formation.fees.toLocaleString()} Ar
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <Link
                            to={`/formations/${formation._id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            Voir détails
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}

                  {formations.length > 5 && (
                    <div className="text-center pt-4">
                      <Link
                        to={`/formations?universityId=${university._id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Voir toutes les formations ({formations.length})
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de contact</h3>
              <div className="space-y-3">
                {university.contacts.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <a
                      href={`mailto:${university.contacts.email}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {university.contacts.email}
                    </a>
                  </div>
                )}

                {university.contacts.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <a
                      href={`tel:${university.contacts.phone}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {university.contacts.phone}
                    </a>
                  </div>
                )}

                {university.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <a
                      href={university.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Site web
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Formations</span>
                  <span className="font-semibold">{formations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ville</span>
                  <span className="font-semibold">{university.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statut</span>
                  <span className={`font-semibold ${university.isVerified ? 'text-green-600' : 'text-gray-600'}`}>
                    {university.isVerified ? 'Vérifié' : 'En attente'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <Link
                  to={`/formations?universityId=${university._id}`}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors block text-center"
                >
                  Voir toutes les formations
                </Link>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-lg font-medium transition-colors">
                  Contacter l'université
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetailPage;