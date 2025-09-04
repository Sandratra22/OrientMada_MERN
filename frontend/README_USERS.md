# Utilisateurs de Test - OrientMada

## Comptes de Connexion

### 👑 Administrateur (1 seul)
- **Email**: admin@orientmada.mg
- **Mot de passe**: admin123
- **Rôle**: Administrateur
- **Accès**: Tableau de bord admin complet

### 🎓 Étudiants (10 comptes)
Tous les mots de passe étudiants sont: `student123`

| Email | Nom | Prénom | Ville |
|-------|-----|--------|-------|
| rakoto@example.com | Rakoto | Jean | Antananarivo |
| rasoa@example.com | Rasoamanana | Marie | Fianarantsoa |
| andria@example.com | Andrianarivo | Paul | Toamasina |
| raja@example.com | Rajao | Sophie | Mahajanga |
| rakotozafy@example.com | Rakotozafy | Michel | Toliara |
| randria@example.com | Randrianasolo | Alice | Antsiranana |
| rakotondrazaka@example.com | Rakotondrazaka | Jean-Claude | Antananarivo |
| rasolofomanana@example.com | Rasolofomanana | Nirina | Fianarantsoa |
| andriantsiferana@example.com | Andriantsiferana | Tovo | Toamasina |
| rakotomavo@example.com | Rakotomavo | Lalaina | Antananarivo |

### 🏫 Universités (8 comptes)
Tous les mots de passe universitaires sont: `univ123`

| Email | Université | Ville |
|-------|------------|-------|
| contact@univ-antananarivo.mg | Université d'Antananarivo | Antananarivo |
| info@espa.mg | ESPA | Antananarivo |
| rectorat@univ-toamasina.mg | Université de Toamasina | Toamasina |
| contact@univ-fianarantsoa.mg | Université de Fianarantsoa | Fianarantsoa |
| info@univ-mahajanga.mg | Université de Mahajanga | Mahajanga |
| rectorat@univ-toliara.mg | Université de Toliara | Toliara |
| contact@eni.mg | ENI | Antananarivo |
| info@ist-antsiranana.mg | IST Antsiranana | Antsiranana |

## 🚀 Démarrage Rapide

1. **Lancez l'application frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Connectez-vous avec un compte de test**:
   - Allez sur `/login`
   - Utilisez les identifiants ci-dessus

3. **Testez les fonctionnalités**:
   - **Étudiant**: Parcourez les formations, inscrivez-vous
   - **Université**: Gérez vos formations et inscriptions
   - **Admin**: Supervisez toute la plateforme

## 📊 Données Réelles de Madagascar

### Universités Incluses
- **Université d'Antananarivo** - Plus ancienne université
- **ESPA** - École Polytechnique d'Antananarivo
- **Université de Toamasina** - Spécialisée en sciences marines
- **Université de Fianarantsoa** - Agriculture et sciences de la vie
- **Université de Mahajanga** - Sciences marines et environnement
- **Université de Toliara** - Biologie et développement durable
- **ENI** - École Nationale d'Informatique
- **IST Antsiranana** - Institut Supérieur de Technologie

### Formations Disponibles
- **Médecine** (7 ans, 2.5M Ar)
- **Génie Civil** (5 ans, 2.2M Ar)
- **Informatique de Gestion** (3 ans, 1.2M Ar)
- **Sciences Marines** (5 ans, 1.9M Ar)
- **Développement Logiciel** (3 ans, 1.4M Ar)
- **Cybersécurité** (2 ans, 2M Ar)
- Et bien d'autres...

### Villes Couvertes
Antananarivo, Toamasina, Fianarantsoa, Mahajanga, Toliara, Antsiranana, Nosy Be, Morondava

## 🔧 Fonctionnalités à Tester

### Pour les Étudiants
- ✅ Recherche et filtrage des formations
- ✅ Consultation des détails universitaires
- ✅ Processus d'inscription complet
- ✅ Suivi des candidatures
- ✅ Messagerie avec les universités

### Pour les Universités
- ✅ Gestion du catalogue de formations
- ✅ Consultation des inscriptions
- ✅ Communication avec les étudiants
- ✅ Statistiques et rapports

### Pour les Administrateurs
- ✅ Supervision globale
- ✅ Gestion des utilisateurs
- ✅ Validation des universités
- ✅ Modération du contenu
- ✅ Métriques de plateforme

## 📝 Notes Techniques

- **API Mock**: Les données sont servies par un service mock pour le développement
- **Authentification**: Système complet avec JWT simulé
- **Base de données**: Données persistées en localStorage
- **Responsive**: Interface adaptée mobile et desktop

## 🎯 Scénarios de Test

1. **Inscription étudiante complète**:
   - Connexion étudiant → Recherche formation → Inscription → Suivi

2. **Gestion universitaire**:
   - Connexion université → Consultation inscriptions → Réponse étudiant

3. **Administration**:
   - Connexion admin → Validation université → Gestion utilisateurs

---

**OrientMada** - La plateforme de référence pour l'orientation universitaire à Madagascar 🇲🇬