import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Users, Star, CheckCircle, Filter, Grid, List } from 'lucide-react';
import { universitiesAPI, University } from '../services/api';

const UniversitiesPage = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const cities = [
    'Antananarivo', 'Toamasina', 'Antsirabe', 'Fianarantsoa',
    'Mahajanga', 'Toliara', 'Antsiranana', 'Morondava'
  ];

  const domains = [
    'Informatique', 'Médecine', 'Ingénierie', 'Commerce', 'Droit',
    'Sciences', 'Arts', 'Agriculture', 'Tourism', 'Education'
  ];

  useEffect(() => {
    fetchUniversities();
  }, [searchQuery, selectedCity, selectedDomain]);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (searchQuery) params.q = searchQuery;
      if (selectedCity) params.city = selectedCity;
      if (selectedDomain) params.domain = selectedDomain;

      const response = await universitiesAPI.getAll(params);
      setUniversities(response.data);
    } catch (err: any) {
      setError('Erreur lors du chargement des universités');
      console.error('Error fetching universities:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedDomain('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des universités...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Universités</h1>
              <p className="mt-2 text-gray-600">
                Découvrez les établissements d'enseignement supérieur à Madagascar
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une université..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Toutes les villes</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

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

              {(searchQuery || selectedCity || selectedDomain) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4" />
                </button>
              )}
            </div>
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

        {universities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune université trouvée</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {universities.length} université{universities.length > 1 ? 's' : ''} trouvée{universities.length > 1 ? 's' : ''}
              </p>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {universities.map((university) => (
                  <div key={university._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{university.name}</h3>
                            {university.isVerified && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{university.city}</span>
                          </div>
                        </div>
                      </div>

                      {university.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {university.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          {/* Placeholder for formations count - would need to fetch formations for each university */}
                          Formations disponibles
                        </div>
                        <Link
                          to={`/universities/${university._id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Voir détails →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {universities.map((university) => (
                  <div key={university._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{university.name}</h3>
                          {university.isVerified && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{university.city}</span>
                        </div>
                        {university.description && (
                          <p className="text-gray-600 text-sm">
                            {university.description}
                          </p>
                        )}
                      </div>
                      <div className="ml-6">
                        <Link
                          to={`/universities/${university._id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          Voir détails
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UniversitiesPage;