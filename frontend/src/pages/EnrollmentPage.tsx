import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ArrowLeft, Upload, FileText, User, MapPin, Phone } from 'lucide-react';
import { formationsAPI, enrollmentsAPI, Formation } from '../services/api';
import { authService } from '../services/authService';

const EnrollmentPage = () => {
  const { formationId } = useParams<{ formationId: string }>();
  const navigate = useNavigate();
  const [formation, setFormation] = useState<Formation | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    // Personal Information
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    ville: '',
    adresse: '',

    // Academic Information
    niveauEtudes: '',
    etablissementPrecedent: '',
    anneeObtention: '',
    moyenneGenerale: '',

    // Additional Information
    motivation: '',
    objectifs: '',

    // Documents
    documents: [] as File[]
  });

  const steps = [
    { id: 1, title: 'Informations personnelles', icon: User },
    { id: 2, title: 'Informations académiques', icon: FileText },
    { id: 3, title: 'Documents requis', icon: Upload },
    { id: 4, title: 'Confirmation', icon: CheckCircle }
  ];

  useEffect(() => {
    if (!authService.isAuthenticated() || !authService.isStudent()) {
      navigate('/login');
      return;
    }

    if (formationId) {
      fetchFormation();
    }
  }, [formationId, navigate]);

  const fetchFormation = async () => {
    try {
      const response = await formationsAPI.getById(formationId!);
      setFormation(response.data);
    } catch (err: any) {
      setError('Erreur lors du chargement de la formation');
      console.error('Error fetching formation:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!formation) return;

    setSubmitting(true);
    setError('');

    try {
      // Prepare enrollment data
      const enrollmentData = {
        formationId: formation._id,
        answers: {
          ...formData,
          documents: formData.documents.map(doc => ({
            name: doc.name,
            type: doc.type,
            size: doc.size
          }))
        }
      };

      await enrollmentsAPI.create(enrollmentData);

      // Redirect to dashboard
      navigate('/dashboard/student');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'inscription');
    } finally {
      setSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.nom && formData.prenom && formData.email && formData.telephone && formData.ville;
      case 2:
        return formData.niveauEtudes && formData.etablissementPrecedent;
      case 3:
        return formData.documents.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!formation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <FileText className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Formation non trouvée</h2>
          <button
            onClick={() => navigate('/formations')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Retour aux formations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Inscription à une formation</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span className="font-medium">{formation.title}</span>
            <span>•</span>
            <span>{formation.fees.toLocaleString()} Ar</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isActive ? 'bg-blue-500 text-white' :
                    'bg-gray-200 text-gray-400'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${
                      isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Informations personnelles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                  <input
                    type="text"
                    name="ville"
                    value={formData.ville}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Academic Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Informations académiques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Niveau d'études actuel *</label>
                  <select
                    name="niveauEtudes"
                    value={formData.niveauEtudes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Sélectionner un niveau</option>
                    <option value="bac">Baccalauréat</option>
                    <option value="bac+1">Bac +1</option>
                    <option value="bac+2">Bac +2</option>
                    <option value="bac+3">Bac +3</option>
                    <option value="bac+4">Bac +4</option>
                    <option value="bac+5">Bac +5</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Établissement précédent *</label>
                  <input
                    type="text"
                    name="etablissementPrecedent"
                    value={formData.etablissementPrecedent}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Année d'obtention</label>
                  <input
                    type="number"
                    name="anneeObtention"
                    value={formData.anneeObtention}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="2000"
                    max={new Date().getFullYear()}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Moyenne générale</label>
                  <input
                    type="number"
                    name="moyenneGenerale"
                    value={formData.moyenneGenerale}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    max="20"
                    step="0.01"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Motivation</label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Décrivez votre motivation pour cette formation..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Objectifs</label>
                <textarea
                  name="objectifs"
                  value={formData.objectifs}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Quels sont vos objectifs après cette formation..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Documents requis</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-600 mb-4">
                    Glissez-déposez vos documents ici ou cliquez pour sélectionner
                  </div>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="document-upload"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="document-upload"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors"
                  >
                    Sélectionner des fichiers
                  </label>
                </div>
              </div>

              {formData.documents.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900">Documents sélectionnés</h3>
                  {formData.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">{doc.name}</div>
                          <div className="text-sm text-gray-600">
                            {(doc.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeDocument(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Documents généralement requis :</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Copie de la carte d'identité ou passeport</li>
                  <li>• Relevés de notes des dernières années</li>
                  <li>• Diplôme ou attestation d'obtention du bac</li>
                  <li>• Lettre de motivation</li>
                  <li>• CV (optionnel)</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Confirmation de l'inscription</h2>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Récapitulatif</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Formation:</span>
                    <span className="font-medium">{formation.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frais d'inscription:</span>
                    <span className="font-medium">{formation.fees.toLocaleString()} Ar</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Candidat:</span>
                    <span className="font-medium">{formData.prenom} {formData.nom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Documents:</span>
                    <span className="font-medium">{formData.documents.length} fichier(s)</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <CheckCircle className="w-5 h-5 text-yellow-400 mr-2" />
                  <div className="text-sm text-yellow-800">
                    En soumettant cette inscription, vous acceptez que vos informations soient traitées
                    par l'établissement pour l'étude de votre candidature.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Suivant
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? 'Soumission...' : 'Soumettre l\'inscription'}
                <CheckCircle className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentPage;