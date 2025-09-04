import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Users, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';

const TermsPage = () => {
  const sections = [
    {
      icon: Users,
      title: "Utilisation du service",
      content: [
        "OrientMada est une plateforme d'orientation universitaire à Madagascar.",
        "L'utilisation de nos services est gratuite pour les étudiants.",
        "Les universités peuvent s'inscrire gratuitement pour présenter leurs formations.",
        "Vous devez fournir des informations exactes lors de votre inscription."
      ]
    },
    {
      icon: Shield,
      title: "Protection des données",
      content: [
        "Nous collectons uniquement les données nécessaires à votre inscription et suivi.",
        "Vos données personnelles sont protégées et ne sont pas vendues à des tiers.",
        "Vous avez le droit de consulter, modifier ou supprimer vos données.",
        "Nous utilisons des mesures de sécurité avancées pour protéger vos informations."
      ]
    },
    {
      icon: FileText,
      title: "Contenu et propriété intellectuelle",
      content: [
        "Le contenu des formations appartient aux universités partenaires.",
        "OrientMada se réserve le droit de modérer les contenus publiés.",
        "Toute reproduction du contenu sans autorisation est interdite.",
        "Les utilisateurs sont responsables du contenu qu'ils publient."
      ]
    },
    {
      icon: AlertTriangle,
      title: "Responsabilités et limitations",
      content: [
        "OrientMada facilite la mise en relation mais n'est pas responsable des formations.",
        "Les décisions d'admission restent à la discrétion des universités.",
        "Nous ne garantissons pas l'exactitude de toutes les informations publiées.",
        "L'utilisation de nos services se fait à vos propres risques."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            Conditions d'utilisation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Les présentes conditions régissent votre utilisation de la plateforme OrientMada.
            En utilisant nos services, vous acceptez ces conditions.
          </p>
        </div>

        {/* Last Updated */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-blue-800">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Bienvenue sur OrientMada, la plateforme de référence pour l'orientation universitaire à Madagascar.
            Ces conditions d'utilisation régissent votre accès et votre utilisation de notre plateforme,
            accessible via notre site web et nos applications mobiles.
          </p>
          <p className="text-gray-700 leading-relaxed">
            En accédant à OrientMada, vous acceptez d'être lié par ces conditions.
            Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
          </p>
        </div>

        {/* Main Sections */}
        <div className="space-y-8 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>

                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Contact */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Si vous avez des questions concernant ces conditions d'utilisation,
            vous pouvez nous contacter :
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-900"><strong>Email :</strong> contact@orientmada.mg</p>
            <p className="text-gray-900"><strong>Téléphone :</strong> +261 XX XX XXX XX</p>
            <p className="text-gray-900"><strong>Adresse :</strong> Antananarivo, Madagascar</p>
          </div>
        </div>

        {/* Acceptance */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                Acceptation des conditions
              </h3>
              <p className="text-yellow-800">
                En continuant à utiliser OrientMada, vous reconnaissez avoir lu,
                compris et accepté ces conditions d'utilisation.
                Ces conditions peuvent être modifiées à tout moment sans préavis.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <Link
            to="/privacy"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Voir notre politique de confidentialité →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;