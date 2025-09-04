import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Mail, BookOpen, CheckCircle } from 'lucide-react';

const UniversityPendingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Compte en attente de validation
          </h2>

          <p className="text-gray-600 mb-6">
            Votre demande d'inscription en tant qu'université a été enregistrée avec succès.
            Un administrateur doit valider votre compte avant que vous puissiez accéder à la plateforme.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Que se passe-t-il ensuite ?</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• Un administrateur examinera votre demande</li>
                  <li>• Vous recevrez un e-mail de confirmation</li>
                  <li>• L'approbation peut prendre 1-3 jours ouvrés</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium text-gray-900 mb-2">Contactez-nous</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>support@orientmada.mg</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 mr-2">📞</span>
                  <span>+261 34 12 345 67</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Retour à l'accueil
              </Link>

              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-center"
              >
                Se connecter avec un autre compte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityPendingPage;