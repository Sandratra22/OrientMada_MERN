import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Search, BookOpen, TrendingUp, Users, Award } from 'lucide-react';
import Navbar from '../components/Navbar';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous les articles', count: 12 },
    { id: 'orientation', name: 'Orientation', count: 5 },
    { id: 'etudes', name: 'Études', count: 4 },
    { id: 'carriere', name: 'Carrière', count: 3 }
  ];

  const articles = [
    {
      id: 1,
      title: "Comment choisir sa formation universitaire à Madagascar",
      excerpt: "Guide complet pour aider les étudiants à faire le bon choix parmi les nombreuses formations disponibles.",
      author: "Marie Andria",
      date: "2024-01-15",
      category: "orientation",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      tags: ["orientation", "conseils", "formation"]
    },
    {
      id: 2,
      title: "Les métiers les plus demandés en 2024",
      excerpt: "Découvrez les secteurs porteurs et les compétences recherchées par les entreprises malgaches.",
      author: "Jean Rakoto",
      date: "2024-01-10",
      category: "carriere",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      tags: ["carrière", "emploi", "tendances"]
    },
    {
      id: 3,
      title: "L'importance de l'expérience pratique pendant les études",
      excerpt: "Comment combiner théorie et pratique pour maximiser ses chances de réussite professionnelle.",
      author: "Sophie Ranaivo",
      date: "2024-01-05",
      category: "etudes",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop",
      tags: ["stage", "expérience", "compétences"]
    },
    {
      id: 4,
      title: "Guide des bourses d'études à Madagascar",
      excerpt: "Toutes les informations sur les aides financières disponibles pour les étudiants.",
      author: "Marc Dubois",
      date: "2023-12-28",
      category: "orientation",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
      tags: ["bourses", "financement", "étudiants"]
    },
    {
      id: 5,
      title: "L'impact du numérique sur l'enseignement supérieur",
      excerpt: "Comment la digitalisation transforme l'éducation à Madagascar et dans le monde.",
      author: "Alice Randria",
      date: "2023-12-20",
      category: "etudes",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      tags: ["digital", "innovation", "enseignement"]
    },
    {
      id: 6,
      title: "Témoignages d'anciens étudiants",
      excerpt: "Des parcours inspirants d'étudiants qui ont réussi grâce à OrientMada.",
      author: "L'équipe OrientMada",
      date: "2023-12-15",
      category: "carriere",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop",
      tags: ["témoignages", "réussite", "inspiration"]
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = articles[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Blog OrientMada
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conseils, actualités et témoignages pour vous accompagner dans votre parcours universitaire
          </p>
        </div>

        {/* Featured Article */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Article à la une
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{featuredArticle.title}</h2>
              <p className="text-gray-600 mb-6">{featuredArticle.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{featuredArticle.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(featuredArticle.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{featuredArticle.readTime}</span>
                </div>
              </div>
              <Link
                to={`/blog/${featuredArticle.id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Lire l'article complet
              </Link>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredArticles.slice(1).map(article => (
            <article key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    article.category === 'orientation' ? 'bg-blue-100 text-blue-800' :
                    article.category === 'etudes' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {categories.find(cat => cat.id === article.category)?.name}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <BookOpen className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <Link
                    to={`/blog/${article.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Lire →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Restez informé</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Abonnez-vous à notre newsletter pour recevoir les derniers articles,
            conseils d'orientation et actualités de l'enseignement supérieur à Madagascar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition-colors">
              S'abonner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;