import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck } from 'lucide-react';
import Navbar from '../components/Navbar';

const PrivacyPage = () => {
  const sections = [
    {
      icon: Database,
      title: "Données collectées",
      content: [
        "Informations d'identification (nom, prénom, email, téléphone)",
        "Données académiques (niveau d'études, établissement, diplômes)",
        "Préférences d'utilisation et historique de navigation",
        "Données de connexion et d'utilisation de la plateforme"
      ]
    },
    {
      icon: Eye,
      title: "Utilisation des données",
      content: [
        "Fournir et améliorer nos services d'orientation universitaire",
        "Personnaliser votre expérience sur la plateforme",
        "Communiquer avec vous concernant vos inscriptions",
        "Assurer la sécurité et prévenir les fraudes"
      ]
    },
    {
      icon: Lock,
      title: "Protection des données",
      content: [
        "Chiffrement des données sensibles en transit et au repos",
        "Accès limité aux données selon le principe du moindre privilège",
        "Sauvegardes régulières et procédures de récupération",
        "Surveillance continue des accès et des menaces"
      ]
    },
    {
      icon: UserCheck,
      title: "Vos droits",
      content: [
        "Droit d'accès à vos données personnelles",
        "Droit de rectification des informations inexactes",
        "Droit à l'effacement de vos données",
        "Droit à la portabilité de vos données"
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
            Politique de confidentialité
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre confidentialité est importante pour nous. Cette politique explique
            comment nous collectons, utilisons et protégeons vos données personnelles.
          </p>
        </div>

        {/* Last Updated */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <p className="text-green-800">
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre engagement</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Chez OrientMada, nous nous engageons à protéger la confidentialité et la sécurité
            des données personnelles de nos utilisateurs. Cette politique de confidentialité
            décrit les types de données que nous collectons, comment nous les utilisons,
            et les mesures que nous prenons pour les protéger.
          </p>
          <p className="text-gray-700 leading-relaxed">
            En utilisant nos services, vous consentez à la collecte et à l'utilisation de vos
            données personnelles conformément à cette politique.
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

        {/* Cookies */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies et technologies similaires</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience
            sur notre plateforme. Ces technologies nous permettent de :
          </p>
          <ul className="space-y-2 text-gray-700 mb-4">
            <li>• Mémoriser vos préférences et paramètres</li>
            <li>• Analyser l'utilisation de notre plateforme</li>
            <li>• Personnaliser le contenu que nous vous proposons</li>
            <li>• Assurer la sécurité de votre compte</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Vous pouvez contrôler l'utilisation des cookies via les paramètres de votre navigateur.
          </p>
        </div>

        {/* Data Sharing */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Partage des données</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nous ne vendons, n'échangeons ni ne louons vos données personnelles à des tiers.
            Nous pouvons partager vos données dans les cas suivants :
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>• Avec les universités pour le traitement de vos inscriptions</li>
            <li>• Avec nos prestataires de services (hébergement, sécurité)</li>
            <li>• Lorsque la loi l'exige ou pour protéger nos droits</li>
            <li>• Avec votre consentement explicite</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact et réclamations</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Si vous avez des questions concernant cette politique de confidentialité
            ou souhaitez exercer vos droits, vous pouvez nous contacter :
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-900"><strong>Email :</strong> privacy@orientmada.mg</p>
            <p className="text-gray-900"><strong>Délégué à la protection des données :</strong> dpo@orientmada.mg</p>
            <p className="text-gray-900"><strong>Adresse :</strong> Antananarivo, Madagascar</p>
          </div>
        </div>

        {/* Updates */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <Shield className="w-6 h-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Mises à jour de la politique
              </h3>
              <p className="text-blue-800">
                Cette politique de confidentialité peut être modifiée à tout moment.
                Les changements importants vous seront notifiés par email ou via notre plateforme.
                Nous vous encourageons à consulter régulièrement cette page.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <Link
            to="/terms"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Voir nos conditions d'utilisation →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;