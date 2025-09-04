# 🔧 Guide de Dépannage - OrientMada

## Problème: "Erreur de connexion"

### ❌ Symptôme
Quand vous essayez de vous connecter, vous recevez le message "Erreur de connexion" même avec les bons identifiants.

### ✅ Solution

Le problème était dans la gestion des erreurs d'authentification. Voici ce qui a été corrigé :

#### **1. Correction du Mock API**
```typescript
// AVANT (problématique)
async authenticateUser(email: string, password: string): Promise<{ user: User; token: string } | null> {
  // ...
  return null; // Retournait null au lieu de lancer une erreur
}

// APRÈS (corrigé)
async authenticateUser(email: string, password: string): Promise<{ user: User; token: string }> {
  // ...
  throw new Error('Email ou mot de passe incorrect'); // Lance une erreur explicite
}
```

#### **2. Correction du Service API**
```typescript
// AVANT (problématique)
export const authAPI = {
  login: async (credentials) => mockApi.authenticateUser(...), // Retournait directement
};

// APRÈS (corrigé)
export const authAPI = {
  login: async (credentials) => {
    const result = await mockApi.authenticateUser(...);
    return { data: result }; // Format correct pour authService
  },
};
```

### 🧪 Test de Connexion

#### **Comptes de Test Disponibles**

##### 👑 Administrateur
```json
{
  "email": "admin@orientmada.mg",
  "password": "admin123"
}
```

##### 🎓 Étudiants (exemples)
```json
{
  "email": "rakoto@example.com",
  "password": "student123"
}
{
  "email": "rasoa@example.com",
  "password": "student123"
}
```

##### 🏫 Universités
```json
{
  "email": "contact@univ-antananarivo.mg",
  "password": "univ123"
}
```

### 🚀 Démarrage de l'Application

```bash
# 1. Aller dans le dossier frontend
cd orientmada/frontend

# 2. Installer les dépendances
npm install

# 3. Lancer l'application
npm run dev

# 4. Ouvrir dans le navigateur
# http://localhost:5174 (ou le port indiqué)
```

### 🔍 Diagnostic

#### **Vérifications à faire :**

1. **Application démarrée** ✅
   ```bash
   # Vérifier que le serveur tourne
   curl http://localhost:5174
   ```

2. **Variables d'environnement** ✅
   ```env
   # Dans .env
   VITE_USE_MOCK_API=true
   ```

3. **Console du navigateur** 🔍
   - Ouvrir les outils de développement (F12)
   - Aller dans l'onglet Console
   - Vérifier l'absence d'erreurs JavaScript

4. **Réseau** 🔍
   - Onglet Network des outils de développement
   - Vérifier que les appels API arrivent bien

### 🐛 Debug Interactif

#### **Test dans la Console du Navigateur**

```javascript
// 1. Tester l'API directement
fetch('http://localhost:5174/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@orientmada.mg',
    password: 'admin123'
  })
}).then(r => r.json()).then(console.log);

// 2. Tester le service mock
// (Disponible dans la console globale)
testOrientMadaLogin('admin@orientmada.mg', 'admin123');
```

### 📝 Logs et Debugging

#### **Logs Importants à Vérifier**

1. **Terminal de développement**
   ```
   VITE v7.1.4  ready in 582 ms
   ➜  Local:   http://localhost:5174/
   ```

2. **Console du navigateur**
   - Pas d'erreurs JavaScript
   - Appels API réussis (statut 200)

3. **LocalStorage**
   ```javascript
   // Vérifier dans la console
   localStorage.getItem('token');  // Devrait contenir un token
   localStorage.getItem('user');   // Devrait contenir les données utilisateur
   ```

### 🔄 Redémarrage Complet

Si les problèmes persistent :

```bash
# 1. Arrêter l'application (Ctrl+C)
# 2. Nettoyer le cache
rm -rf node_modules/.vite
# 3. Vider le localStorage du navigateur
# 4. Redémarrer
npm run dev
```

### 📞 Support

Si le problème persiste après ces étapes :

1. **Vérifier la version de Node.js** : `node --version` (doit être ≥ 16)
2. **Vérifier npm** : `npm --version`
3. **Consulter les logs complets** du terminal
4. **Tester avec différents navigateurs**

### ✅ Vérification Finale

Pour confirmer que tout fonctionne :

1. **Aller sur** `http://localhost:5174/login`
2. **Se connecter avec** :
   - Email: `admin@orientmada.mg`
   - Mot de passe: `admin123`
3. **Vérifier la redirection** vers le tableau de bord admin
4. **Vérifier le localStorage** contient bien le token et l'utilisateur

---

**Résolution garantie** : Après ces corrections, la connexion devrait fonctionner parfaitement ! 🎉