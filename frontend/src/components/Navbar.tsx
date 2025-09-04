import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Bell, MessageCircle, BookOpen, ChevronDown, AlertTriangle } from 'lucide-react';
import { authService } from '../services/authService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getUser();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setUserMenuOpen(false);
  };

  const handleLogoutConfirm = () => {
    authService.logout();
    navigate('/');
    setShowLogoutConfirm(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'student':
        return '/dashboard/student';
      case 'university':
        return '/dashboard/university';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/';
    }
  };

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Universités', href: '/universities' },
    { name: 'Formations', href: '/formations' },
  ];

  const userNavigation = [
    { name: 'Mon profil', href: '/profile', icon: User },
    { name: 'Paramètres', href: '/settings', icon: Settings },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Messages', href: '/chat', icon: MessageCircle },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                OrientMada
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered and Spaced */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side - Auth buttons or user menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications - only for authenticated users */}
            {isAuthenticated && (
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                {/* Notification badge - you can add logic here */}
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            )}

            {isAuthenticated ? (
              /* User Menu */
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">
                    {user?.profile.prenom} {user?.profile.nom}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.profile.prenom} {user?.profile.nom}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                    </div>

                    <Link
                      to={getDashboardPath()}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Tableau de bord
                    </Link>

                    {userNavigation.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {item.name}
                        </Link>
                      );
                    })}

                    <div className="border-t border-gray-200">
                      <button
                        onClick={handleLogoutClick}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Auth Buttons */
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  S'inscrire
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {!isAuthenticated && (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/login"
                      className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Se connecter
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-center transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      S'inscrire
                    </Link>
                  </div>
                </div>
              )}

              {isAuthenticated && (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="px-3 py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user?.profile.prenom} {user?.profile.nom}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={getDashboardPath()}
                    className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Tableau de bord
                  </Link>


                  {userNavigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.name}
                      </Link>
                    );
                  })}

                  <button
                    onClick={() => {
                      handleLogoutClick();
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleLogoutCancel} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Confirmer la déconnexion</h3>
                <p className="text-sm text-gray-500">Êtes-vous sûr de vouloir vous déconnecter ?</p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={handleLogoutCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;