# OrientMada - Frontend

Plateforme d'orientation universitaire à Madagascar avec données réelles et utilisateurs de test.

## 🚀 Démarrage Rapide

```bash
# Installation des dépendances
npm install

# Lancement en mode développement
npm run dev

# Build pour la production
npm run build
```

## 🔧 Problème de Connexion - RÉSOLU

### ❌ Problème Identifié
Si vous rencontriez "Erreur de connexion" même avec les bons identifiants, c'était dû à un problème dans la gestion des erreurs d'authentification.

### ✅ Solution Appliquée
- **Correction du Mock API** : Maintenant lance une erreur explicite au lieu de retourner `null`
- **Correction du Service API** : Format correct des réponses pour `authService`
- **Gestion d'erreurs améliorée** : Messages d'erreur clairs et précis

### 🧪 Test de Connexion
```bash
# L'application est maintenant accessible sur
http://localhost:5174

# Comptes de test fonctionnels :
# Admin: admin@orientmada.mg / admin123
# Étudiant: rakoto@example.com / student123
# Université: contact@univ-antananarivo.mg / univ123
```

**Voir [TROUBLESHOOTING.md](TROUBLESHOOTING.md) pour plus de détails**

## 📊 Fonctionnalités Implémentées

### ✅ Pages Principales
- **Accueil** - Recherche et présentation des universités
- **Universités** - Liste et recherche des établissements
- **Formations** - Catalogue complet des formations
- **Inscription** - Processus d'inscription guidé
- **Tableaux de bord** - Interfaces dédiées par rôle

### ✅ Authentification
- Connexion/Inscription avec validation
- Gestion des rôles (Étudiant, Université, Admin)
- Protection des routes
- Persistance de session

### ✅ Données Réelles de Madagascar

#### Universités (8 établissements)
- **Université d'Antananarivo** - Plus ancienne université
- **ESPA** - École Polytechnique d'Antananarivo
- **Université de Toamasina** - Sciences marines
- **Université de Fianarantsoa** - Agriculture et sciences
- **Université de Mahajanga** - Sciences côtières
- **Université de Toliara** - Biologie marine
- **ENI** - École Nationale d'Informatique
- **IST Antsiranana** - Institut Supérieur de Technologie

#### Formations (10 programmes)
- Médecine Générale (7 ans, 2.5M Ar)
- Génie Civil (5 ans, 2.2M Ar)
- Informatique de Gestion (3 ans, 1.2M Ar)
- Sciences Marines (5 ans, 1.9M Ar)
- Développement Logiciel (3 ans, 1.4M Ar)
- Cybersécurité (2 ans, 2M Ar)
- Et plus...

#### Villes Couvertes
Antananarivo, Toamasina, Fianarantsoa, Mahajanga, Toliara, Antsiranana

## 👥 Comptes de Test

### 👑 Administrateur (1 seul)
```json
{
  "email": "admin@orientmada.mg",
  "password": "admin123",
  "role": "admin"
}
```

### 🎓 Étudiants (10 comptes)
Tous les mots de passe: `student123`

| Email | Nom | Ville |
|-------|-----|-------|
| rakoto@example.com | Rakoto Jean | Antananarivo |
| rasoa@example.com | Rasoamanana Marie | Fianarantsoa |
| andria@example.com | Andrianarivo Paul | Toamasina |
| raja@example.com | Rajao Sophie | Mahajanga |
| rakotozafy@example.com | Rakotozafy Michel | Toliara |
| randria@example.com | Randrianasolo Alice | Antsiranana |
| rakotondrazaka@example.com | Rakotondrazaka Jean-Claude | Antananarivo |
| rasolofomanana@example.com | Rasolofomanana Nirina | Fianarantsoa |
| andriantsiferana@example.com | Andriantsiferana Tovo | Toamasina |
| rakotomavo@example.com | Rakotomavo Lalaina | Antananarivo |

### 🏫 Universités (8 comptes)
Tous les mots de passe: `univ123`

| Email | Université |
|-------|------------|
| contact@univ-antananarivo.mg | Université d'Antananarivo |
| info@espa.mg | ESPA |
| rectorat@univ-toamasina.mg | Université de Toamasina |
| contact@univ-fianarantsoa.mg | Université de Fianarantsoa |
| info@univ-mahajanga.mg | Université de Mahajanga |
| rectorat@univ-toliara.mg | Université de Toliara |
| contact@eni.mg | ENI |
| info@ist-antsiranana.mg | IST Antsiranana |

## 🛠️ Architecture Technique

### Technologies
- **React 18** - Framework frontend
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **React Router** - Routing
- **Axios** - Requêtes HTTP
- **Lucide React** - Icônes

### Structure des Dossiers
```
src/
├── components/          # Composants réutilisables
├── pages/              # Pages de l'application
│   ├── Dashboard/      # Tableaux de bord par rôle
│   └── ...             # Autres pages
├── services/           # Services API et authentification
├── data/               # Données mock
└── types/              # Types TypeScript
```

### API Mock
- Service mock complet pour le développement
- Simulation des appels backend
- Données persistées en localStorage
- Gestion d'état réaliste

## 🎯 Fonctionnalités par Rôle

### Étudiant
- ✅ Recherche et consultation des formations
- ✅ Inscription aux formations
- ✅ Suivi des candidatures
- ✅ Messagerie avec les universités
- ✅ Gestion du profil

### Université
- ✅ Gestion du catalogue de formations
- ✅ Consultation des inscriptions
- ✅ Communication avec les étudiants
- ✅ Statistiques et rapports
- ✅ Gestion du profil établissement

### Administrateur
- ✅ Supervision globale de la plateforme
- ✅ Gestion des utilisateurs
- ✅ Validation des universités
- ✅ Modération du contenu
- ✅ Métriques et analytics

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualisation du build
npm run lint         # Vérification du code
```

## 🌐 Déploiement

### Variables d'Environnement
```env
VITE_API_URL=http://localhost:5000/api
VITE_USE_MOCK_API=true  # Utiliser les données mock
```

### Build de Production
```bash
npm run build
# Les fichiers sont générés dans le dossier dist/
```

## 📝 Documentation

- **[README_USERS.md](README_USERS.md)** - Guide complet des comptes de test
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Guide de dépannage des problèmes courants
- **[API Documentation](../backend/README.md)** - Documentation du backend
- **[Contributing](../CONTRIBUTING.md)** - Guide de contribution

## 🎨 Design System

### Couleurs Principales
- **Primaire**: Bleu (#2563eb)
- **Secondaire**: Violet (#7c3aed)
- **Accent**: Orange (#f97316)
- **Succès**: Vert (#10b981)
- **Erreur**: Rouge (#ef4444)

### Composants
- Design responsive mobile-first
- Composants réutilisables
- Animations fluides
- Accessibilité WCAG 2.1

## 🚀 Roadmap

### Phase 1 ✅ (Complétée)
- Interface utilisateur complète
- Authentification et autorisation
- Données mock réalistes
- Navigation et routing

### Phase 2 🔄 (En cours)
- Intégration backend réel
- Tests automatisés
- Optimisation des performances
- Fonctionnalités avancées

### Phase 3 📋 (Planifiées)
- Notifications temps réel
- Chat intégré
- Système de paiement
- Application mobile

---

**OrientMada** - Révolutionner l'orientation universitaire à Madagascar 🇲🇬