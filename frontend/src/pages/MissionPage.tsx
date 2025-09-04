import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Users, BookOpen, Heart, Award } from 'lucide-react';
import Navbar from '../components/Navbar';

const MissionPage = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence académique",
      description: "Nous nous engageons à offrir une plateforme de qualité qui facilite l'accès à l'éducation supérieure à Madagascar."
    },
    {
      icon: Users,
      title: "Accessibilité pour tous",
      description: "Notre mission est de rendre l'orientation universitaire accessible à tous les étudiants, indépendamment de leur situation géographique ou socio-économique."
    },
    {
      icon: BookOpen,
      title: "Innovation pédagogique",
      description: "Nous encourageons l'innovation dans l'enseignement et soutenons les établissements qui adoptent des méthodes pédagogiques modernes."
    },
    {
      icon: Heart,
      title: "Accompagnement personnalisé",
      description: "Chaque étudiant reçoit un accompagnement personnalisé pour trouver la formation qui correspond à ses aspirations et compétences."
    },
    {
      icon: Award,
      title: "Qualité et transparence",
      description: "Nous garantissons la transparence des informations et la qualité des formations proposées sur notre plateforme."
    }
  ];

  const stats = [
    { number: "5000+", label: "Étudiants accompagnés" },
    { number: "25", label: "Universités partenaires" },
    { number: "150+", label: "Formations disponibles" },
    { number: "98%", label: "Taux de satisfaction" }
  ];

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
            Notre mission
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Faciliter l'accès à l'éducation supérieure à Madagascar en connectant étudiants et universités
            dans un écosystème transparent et innovant.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Révolutionner l'orientation universitaire à Madagascar
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              OrientMada est née d'une vision simple mais ambitieuse : démocratiser l'accès à l'éducation
              supérieure à Madagascar. Nous croyons que chaque étudiant mérite de trouver la formation
              qui lui correspond, indépendamment de sa localisation ou de ses ressources.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Notre plateforme crée un pont entre les aspirations des étudiants et les offres des
              établissements d'enseignement supérieur, favorisant ainsi l'excellence académique
              et le développement personnel de chacun.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Nos valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{value.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vision */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Notre vision</h2>
            <p className="text-xl leading-relaxed mb-8">
              Devenir la référence nationale en matière d'orientation universitaire,
              contribuant ainsi au développement éducatif et économique de Madagascar
              en formant les leaders de demain.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Éducation accessible</h3>
                <p>Rendre l'enseignement supérieur accessible à tous les étudiants malgaches</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Excellence académique</h3>
                <p>Promouvoir les meilleurs établissements et formations du pays</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Innovation continue</h3>
                <p>Adapter constamment notre plateforme aux besoins des utilisateurs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Rejoignez notre communauté
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Que vous soyez étudiant, établissement d'enseignement ou professionnel de l'éducation,
            OrientMada est fait pour vous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Créer un compte
            </Link>
            <Link
              to="/formations"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Explorer les formations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionPage;