// Script de test pour vérifier la connexion
// À exécuter dans la console du navigateur

// Test des comptes de connexion
const testAccounts = [
  {
    email: 'admin@orientmada.mg',
    password: 'admin123',
    role: 'admin',
    description: 'Administrateur'
  },
  {
    email: 'rakoto@example.com',
    password: 'student123',
    role: 'student',
    description: 'Étudiant - Rakoto Jean'
  },
  {
    email: 'contact@univ-antananarivo.mg',
    password: 'univ123',
    role: 'university',
    description: 'Université d\'Antananarivo'
  }
];

// Fonction de test
async function testLogin(email, password, description) {
  console.log(`🔍 Test de connexion: ${description}`);
  console.log(`Email: ${email}`);
  console.log(`Mot de passe: ${password}`);

  try {
    // Simulation de l'appel API
    const response = await fetch('http://localhost:5174/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Connexion réussie!');
      console.log('Données utilisateur:', data);
    } else {
      const error = await response.text();
      console.log('❌ Erreur de connexion:', error);
    }
  } catch (error) {
    console.log('❌ Erreur réseau:', error.message);
  }

  console.log('---');
}

// Test automatique
async function runTests() {
  console.log('🚀 Test des connexions OrientMada');
  console.log('================================');

  for (const account of testAccounts) {
    await testLogin(account.email, account.password, account.description);
    // Attendre 1 seconde entre les tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('✅ Tests terminés!');
}

// Fonction pour tester manuellement
window.testOrientMadaLogin = async (email, password) => {
  await testLogin(email, password, 'Test manuel');
};

// Lancer les tests automatiquement
runTests();