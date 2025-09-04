import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, BookOpen, Users, Star, ChevronLeft, ChevronRight, ArrowRight, CheckCircle, MessageCircle, FileText, Clock, TrendingUp, Award, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import { formationsAPI, universitiesAPI } from '../services/api';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredUniversities, setFeaturedUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Static data for domains and cities
  const domains = [
    'Informatique', 'Médecine', 'Ingénierie', 'Commerce', 'Droit',
    'Sciences', 'Arts', 'Agriculture', 'Tourisme', 'Éducation'
  ];

  const cities = [
    'Antananarivo', 'Toamasina', 'Antsirabe', 'Fianarantsoa',
    'Mahajanga', 'Toliara', 'Antsiranana', 'Morondava'
  ];

  useEffect(() => {
    fetchFeaturedUniversities();
  }, []);

  const fetchFeaturedUniversities = async () => {
    try {
      setLoading(true);
      // In a real app, this would fetch from the API
      // const response = await universitiesAPI.getAll({ limit: 3, featured: true });
      // For now, we'll use static data but simulate async loading
      const staticData = [
        {
          _id: "1",
          name: "Université d'Antananarivo",
          city: "Antananarivo",
          logoUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop",
          rating: 4.8,
          students: 15000,
          formations: 45,
          isVerified: true
        },
        {
          _id: "2",
          name: "École Supérieure Polytechnique d'Antananarivo",
          city: "Antananarivo",
          logoUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=250&fit=crop&auto=format&auto=compress",
          rating: 4.6,
          students: 3200,
          formations: 12,
          isVerified: true
        },
        {
          _id: "3",
          name: "Université de Toamasina",
          city: "Toamasina",
          logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=250&fit=crop",
          rating: 4.7,
          students: 8500,
          formations: 28,
          isVerified: true
        }
      ];
      
      // Transform the data to match the expected format
      const transformedData = staticData.map(univ => ({
        id: univ._id,
        name: univ.name,
        city: univ.city,
        image: univ.logoUrl,
        rating: univ.rating,
        students: univ.students,
        formations: univ.formations,
        verified: univ.isVerified
      }));
      
      setFeaturedUniversities(transformedData);
    } catch (error) {
      console.error('Error fetching featured universities:', error);
      // Fallback to static data
      setFeaturedUniversities([
        {
          id: 1,
          name: "Université d'Antananarivo",
          city: "Antananarivo",
          image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop",
          rating: 4.8,
          students: 15000,
          formations: 45,
          verified: true
        },
        {
          id: 2,
          name: "École Supérieure Polytechnique d'Antananarivo",
          city: "Antananarivo",
          image: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=250&fit=crop&auto=format&auto=compress",
          rating: 4.6,
          students: 3200,
          formations: 12,
          verified: true
        },
        {
          id: 3,
          name: "Université de Toamasina",
          city: "Toamasina",
          image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=250&fit=crop",
          rating: 4.7,
          students: 8500,
          formations: 28,
          verified: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: BookOpen, number: "150+", label: "Formations disponibles" },
    { icon: Users, number: "25", label: "Universités partenaires" },
    { icon: CheckCircle, number: "5000+", label: "Étudiants inscrits" },
    { icon: MapPin, number: "8", label: "Villes couvertes" }
  ];

  const features = [
    {
      icon: Search,
      title: "Recherche avancée",
      description: "Trouvez la formation idéale grâce à nos filtres intelligents par domaine, ville, niveau et budget."
    },
    {
      icon: FileText,
      title: "Inscription simplifiée",
      description: "Soumettez vos dossiers d'inscription en ligne et suivez leur progression en temps réel."
    },
    {
      icon: MessageCircle,
      title: "Communication directe",
      description: "Échangez directement avec les universités pour poser vos questions et obtenir des réponses rapides."
    },
    {
      icon: Clock,
      title: "Suivi personnalisé",
      description: "Recevez des notifications sur l'évolution de vos candidatures et ne ratez aucune échéance."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredUniversities.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredUniversities.length) % featuredUniversities.length);
  };

  const handleSearch = async () => {
    try {
      // Navigate to formations page with search parameters
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (selectedDomain) params.set('domain', selectedDomain);
      if (selectedCity) params.set('city', selectedCity);
      
      // Use React Router navigation instead of window.location
      navigate(`/formations?${params.toString()}`);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to URL navigation if React Router fails
      const params = new URLSearchParams();
      if (searchQuery) params.set('q', searchQuery);
      if (selectedDomain) params.set('domain', selectedDomain);
      if (selectedCity) params.set('city', selectedCity);
      window.location.href = `/formations?${params.toString()}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Trouvez votre voie à
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Madagascar
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Découvrez les meilleures universités et formations de Madagascar.
              Inscrivez-vous en ligne et réalisez vos ambitions académiques.
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 max-w-4xl mx-auto border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Que recherchez-vous ?</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Formation, université, domaine..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Domaine</label>
                <select
                  className="w-full px-4 py-3 rounded-lg border-0 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                >
                  <option value="">Tous les domaines</option>
                  {domains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Ville</label>
                <select
                  className="w-full px-4 py-3 rounded-lg border-0 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Toutes les villes</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button
              onClick={handleSearch}
              className="w-full md:w-auto mt-6 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Rechercher
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Universities Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Universités populaires
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les établissements les mieux notés par nos étudiants
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {featuredUniversities.map((university) => (
                    <div key={university.id} className="w-full flex-shrink-0">
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mx-4">
                        <div className="md:flex">
                          <div className="md:w-1/2">
                            <img 
                              src={university.image} 
                              alt={university.name}
                              className="w-full h-64 md:h-full object-cover"
                            />
                          </div>
                          <div className="md:w-1/2 p-8">
                            <div className="flex items-center gap-2 mb-4">
                              <h3 className="text-2xl font-bold text-gray-900">{university.name}</h3>
                              {university.verified && (
                                <CheckCircle className="w-6 h-6 text-green-500" />
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2 text-gray-600 mb-4">
                              <MapPin className="w-5 h-5" />
                              <span>{university.city}</span>
                            </div>
                            
                            <div className="flex items-center gap-1 mb-6">
                              <Star className="w-5 h-5 text-yellow-400 fill-current" />
                              <span className="font-semibold">{university.rating}</span>
                              <span className="text-gray-500 ml-2">({university.students.toLocaleString()} étudiants)</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="text-center p-3 bg-blue-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">{university.formations}</div>
                                <div className="text-sm text-blue-600">Formations</div>
                              </div>
                              <div className="text-center p-3 bg-green-50 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">{university.students.toLocaleString()}</div>
                                <div className="text-sm text-green-600">Étudiants</div>
                              </div>
                            </div>
                            
                            <Link
                              to={`/universities/${university.id}`}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                            >
                              Voir les formations
                              <ArrowRight className="w-5 h-5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Carousel Controls */}
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
              
              {/* Carousel Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {featuredUniversities.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir OrientMada ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une plateforme complète pour votre orientation universitaire à Madagascar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group hover:bg-blue-50 p-6 rounded-xl transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 group-hover:bg-blue-200 rounded-xl mb-6 transition-colors">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à commencer votre parcours ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'étudiants qui ont trouvé leur voie grâce à OrientMada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-colors text-center">
              Créer mon compte
            </Link>
            <Link to="/formations" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors text-center">
              Explorer les formations
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">OrientMada</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                La plateforme de référence pour l'orientation universitaire à Madagascar.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Étudiants</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/formations" className="hover:text-white transition-colors">Rechercher une formation</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">S'inscrire</Link></li>
                <li><Link to="/dashboard/student" className="hover:text-white transition-colors">Mon dashboard</Link></li>
                <li><Link to="/chat" className="hover:text-white transition-colors">Aide & Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Universités</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/register" className="hover:text-white transition-colors">Rejoindre la plateforme</Link></li>
                <li><Link to="/dashboard/university" className="hover:text-white transition-colors">Gérer mon catalogue</Link></li>
                <li><Link to="/dashboard/university" className="hover:text-white transition-colors">Statistiques</Link></li>
                <li><Link to="/chat" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">À propos</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/mission" className="hover:text-white transition-colors">Notre mission</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Conditions d'utilisation</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Confidentialité</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OrientMada. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;