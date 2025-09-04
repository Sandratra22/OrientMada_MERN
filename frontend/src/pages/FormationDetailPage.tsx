import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, BookOpen, DollarSign, Clock, CheckCircle, ArrowLeft, User } from 'lucide-react';
import { formationsAPI, universitiesAPI, Formation, University } from '../services/api';
import { authService } from '../services/authService';

const FormationDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formation, setFormation] = useState<Formation | null>(null);
  const [university, setUniversity] = useState<University | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchFormationDetails();
    }
  }, [id]);

  const fetchFormationDetails = async () => {
    try {
      setLoading(true);
      const formationResponse = await formationsAPI.getById(id!);
      const formationData = formationResponse.data;
      setFormation(formationData);

      // Fetch university details
      if (formationData && formationData.universityId) {
        const universityResponse = await universitiesAPI.getById(formationData.universityId);
        setUniversity(universityResponse.data);
      }
    } catch (err: any) {
      setError('Erreur lors du chargement de la formation');
      console.error('Error fetching formation:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = () => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    if (authService.isStudent()) {
      navigate(`/enrollment/${id}`);
    } else {
      // Show message for non-students
      alert('Seuls les étudiants peuvent s\'inscrire à une formation.');
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de la formation...</p>
        </div>
      </div>
    );
  }

  if (error || !formation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <BookOpen className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Formation non trouvée</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/formations"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Retour aux formations
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
              to="/formations"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour aux formations
            </Link>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{formation.title}</h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-5 h-5" />
                  {formation.domain}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-5 h-5" />
                  {formation.level}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getModeColor(formation.mode)}`}>
                  {getModeLabel(formation.mode)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {formation.fees.toLocaleString()} Ar
              </div>
              <div className="text-gray-600">Frais d'inscription</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description and Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations générales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Durée</div>
                      <div className="text-gray-600">{formation.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Niveau</div>
                      <div className="text-gray-600">{formation.level}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Domaine</div>
                      <div className="text-gray-600">{formation.domain}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Statut</div>
                      <div className="text-gray-600">{formation.published ? 'Publié' : 'Brouillon'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            {formation.prerequisites && formation.prerequisites.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Prérequis</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {formation.prerequisites.map((prereq, index) => (
                    <li key={index}>{prereq}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sessions */}
            {formation.sessions && formation.sessions.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Sessions disponibles</h2>
                <div className="space-y-3">
                  {formation.sessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">
                            Session {index + 1}
                          </div>
                          <div className="text-sm text-gray-600">
                            Du {new Date(session.startDate).toLocaleDateString('fr-FR')} au {new Date(session.endDate).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* University Information */}
            {university && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Établissement</h2>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{university.name}</h3>
                      {university.isVerified && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{university.city}</span>
                    </div>
                    {university.description && (
                      <p className="text-gray-700 mb-4">{university.description}</p>
                    )}
                    <Link
                      to={`/universities/${university._id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Voir l'établissement →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">S'inscrire à cette formation</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {formation.fees.toLocaleString()} Ar
                  </div>
                  <div className="text-gray-600 text-sm">Frais d'inscription</div>
                </div>

                <button
                  onClick={handleEnroll}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  {authService.isAuthenticated() && authService.isStudent()
                    ? 'Commencer l\'inscription'
                    : 'Se connecter pour s\'inscrire'
                  }
                </button>

                {!authService.isAuthenticated() && (
                  <p className="text-sm text-gray-600 text-center">
                    Vous devez être connecté en tant qu'étudiant pour vous inscrire
                  </p>
                )}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Domaine</span>
                  <span className="font-medium">{formation.domain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Niveau</span>
                  <span className="font-medium">{formation.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Durée</span>
                  <span className="font-medium">{formation.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mode</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getModeColor(formation.mode)}`}>
                    {getModeLabel(formation.mode)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frais</span>
                  <span className="font-medium">{formation.fees.toLocaleString()} Ar</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            {university && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacter l'établissement</h3>
                <div className="space-y-3">
                  {university.contacts.email && (
                    <a
                      href={`mailto:${university.contacts.email}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <User className="w-4 h-4" />
                      Envoyer un e-mail
                    </a>
                  )}
                  <Link
                    to={`/chat`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <User className="w-4 h-4" />
                    Ouvrir une discussion
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationDetailPage;