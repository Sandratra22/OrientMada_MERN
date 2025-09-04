import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BookOpen, Home, CheckCircle, XCircle, Shield, User, Phone, Mail, MapPin, Globe, Calendar, FileText } from 'lucide-react';
import { adminAPI, User as UserType } from '../../services/api';
import { authService } from '../../services/authService';

const AdminUniversityDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [university, setUniversity] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchUniversityDetails();
    }
  }, [id]);

  const fetchUniversityDetails = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllUsers();
      const universityUser = response.data.find(user => user._id === id && user.role === 'university');
      setUniversity(universityUser || null);
    } catch (err) {
      console.error('Error fetching university details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveUniversity = async () => {
    if (!id) return;
    
    try {
      setActionLoading(true);
      await adminAPI.approveUniversity(id);
      // Refresh the data
      fetchUniversityDetails();
      // Show success message (in a real app, you might use a toast notification)
      alert('Université approuvée avec succès!');
    } catch (err) {
      console.error('Error approving university:', err);
      alert('Erreur lors de l\'approbation de l\'université');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectUniversity = async () => {
    if (!id) return;
    
    try {
      setActionLoading(true);
      await adminAPI.rejectUniversity(id);
      // Refresh the data
      fetchUniversityDetails();
      // Show success message
      alert('Demande rejetée avec succès!');
    } catch (err) {
      console.error('Error rejecting university:', err);
      alert('Erreur lors du rejet de la demande');
    } finally {
      setActionLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des détails de l'université...</p>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Université non trouvée</h2>
          <p className="text-gray-600">L'université demandée n'existe pas ou n'est plus disponible.</p>
          <Link
            to="/admin/universities"
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Retour à la liste des universités
          </Link>
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
              <h1 className="text-2xl font-bold text-gray-900">Détails de l'université</h1>
              <p className="text-gray-600 mt-1">
                Informations complètes sur l'établissement
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/admin/universities"
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Home className="w-4 h-4" />
                Retour à la liste
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* University Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {university.universityInfo?.universityName || 'Nom non spécifié'}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      university.status === 'active' ? 'bg-green-100 text-green-800' :
                      university.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {university.status === 'active' && 'Actif'}
                      {university.status === 'pending' && 'En attente'}
                      {university.status === 'suspended' && 'Suspendu'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Informations de l'établissement</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Ville</div>
                        <div className="font-medium">{university.universityInfo?.universityCity || 'N/A'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Téléphone</div>
                        <div className="font-medium">{university.universityInfo?.universityPhone || 'N/A'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Email</div>
                        <div className="font-medium">{university.email}</div>
                      </div>
                    </div>
                    
                    {university.universityInfo?.universityWebsite && (
                      <div className="flex items-start gap-3">
                        <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <div className="text-sm text-gray-600">Site web</div>
                          <a 
                            href={university.universityInfo.universityWebsite} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-medium text-blue-600 hover:text-blue-700"
                          >
                            {university.universityInfo.universityWebsite}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Contact administratif</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Nom du contact</div>
                        <div className="font-medium">
                          {university.profile.prenom} {university.profile.nom}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Téléphone du contact</div>
                        <div className="font-medium">{university.profile.telephone || 'N/A'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm text-gray-600">Email du contact</div>
                        <div className="font-medium">{university.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {university.universityInfo?.universityDescription && (
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700">
                    {university.universityInfo.universityDescription}
                  </p>
                </div>
              )}

              <div className="mt-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Inscrit le {university.createdAt ? new Date(university.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            {university.status === 'pending' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions de validation</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleApproveUniversity}
                    disabled={actionLoading}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    <CheckCircle className="w-5 h-5" />
                    {actionLoading ? 'Traitement...' : 'Approuver l\'université'}
                  </button>
                  
                  <button
                    onClick={handleRejectUniversity}
                    disabled={actionLoading}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    <XCircle className="w-5 h-5" />
                    {actionLoading ? 'Traitement...' : 'Rejeter la demande'}
                  </button>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex">
                    <FileText className="w-5 h-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      Veuillez vérifier attentivement les informations avant de valider ou rejeter cette demande.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Status Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statut actuel</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Statut</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    university.status === 'active' ? 'bg-green-100 text-green-800' :
                    university.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {university.status === 'active' && 'Actif'}
                    {university.status === 'pending' && 'En attente'}
                    {university.status === 'suspended' && 'Suspendu'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rôle</span>
                  <span className="font-medium">Université</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Email vérifié</span>
                  <span className="font-medium">Oui</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUniversityDetailPage;