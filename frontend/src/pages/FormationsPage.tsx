import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, BookOpen, Filter, DollarSign, Clock } from 'lucide-react';
import { formationsAPI, Formation } from '../services/api';

const FormationsPage = () => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const domains = [
    'Informatique', 'Médecine', 'Ingénierie', 'Commerce', 'Droit',
    'Sciences', 'Arts', 'Agriculture', 'Tourism', 'Education'
  ];

  const levels = [
    'Licence', 'Master', 'Doctorat', 'BTS', 'DUT', 'DEUG'
  ];

  const modes = [
    { value: 'onsite', label: 'Présentiel' },
    { value: 'online', label: 'En ligne' },
    { value: 'hybrid', label: 'Hybride' }
  ];

  useEffect(() => {
    fetchFormations();
  }, [searchQuery, selectedDomain, selectedLevel, selectedMode, selectedUniversity, priceRange]);

  const fetchFormations = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (searchQuery) params.q = searchQuery;
      if (selectedDomain) params.domain = selectedDomain;
      if (selectedLevel) params.level = selectedLevel;
      if (selectedMode) params.mode = selectedMode;
      if (selectedUniversity) params.universityId = selectedUniversity;

      const response = await formationsAPI.getAll(params);
      let filteredFormations = response.data;

      // Filter by price range on frontend since backend might not have this filter
      if (priceRange) {
        filteredFormations = filteredFormations.filter((formation: Formation) => {
          const price = formation.fees;
          switch (priceRange) {
            case '0-500000': return price <= 500000;
            case '500000-1000000': return price > 500000 && price <= 1000000;
            case '1000000-2000000': return price > 1000000 && price <= 2000000;
            case '2000000+': return price > 2000000;
            default: return true;
          }
        });
      }

      setFormations(filteredFormations);
    } catch (err: any) {
      setError('Erreur lors du chargement des formations');
      console.error('Error fetching formations:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDomain('');
    setSelectedLevel('');
    setSelectedMode('');
    setSelectedUniversity('');
    setPriceRange('');
  };

  const getModeLabel = (mode: string) => {
    const modeObj = modes.find(m => m.value === mode);
    return modeObj ? modeObj.label : mode;
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
          <p className="mt-4 text-gray-600">Chargement des formations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Formations</h1>
            <p className="mt-2 text-gray-600">
              Découvrez toutes les formations disponibles à Madagascar
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une formation..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              <option value="">Tous les domaines</option>
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">Tous les niveaux</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
            >
              <option value="">Tous les modes</option>
              {modes.map(mode => (
                <option key={mode.value} value={mode.value}>{mode.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="">Tous les prix</option>
                <option value="0-500000">Moins de 500 000 Ar</option>
                <option value="500000-1000000">500k - 1M Ar</option>
                <option value="1000000-2000000">1M - 2M Ar</option>
                <option value="2000000+">Plus de 2M Ar</option>
              </select>
            </div>

            {(searchQuery || selectedDomain || selectedLevel || selectedMode || selectedUniversity || priceRange) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Effacer les filtres
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {formations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <BookOpen className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune formation trouvée</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {formations.length} formation{formations.length > 1 ? 's' : ''} trouvée{formations.length > 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formations.map((formation) => (
                <div key={formation._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{formation.title}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <BookOpen className="w-4 h-4 mr-1" />
                          <span>{formation.domain}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-3">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{formation.level}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Durée:</span>
                        <span className="font-medium">{formation.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Frais:</span>
                        <span className="font-medium">{formation.fees.toLocaleString()} Ar</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Mode:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getModeColor(formation.mode)}`}>
                          {getModeLabel(formation.mode)}
                        </span>
                      </div>
                    </div>

                    {formation.prerequisites && formation.prerequisites.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Prérequis:</p>
                        <p className="text-sm text-gray-700">{formation.prerequisites.join(', ')}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        {formation.published ? 'Publié' : 'Brouillon'}
                      </div>
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FormationsPage;