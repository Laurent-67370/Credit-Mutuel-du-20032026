# 📋 Service d'Inscription - A.G. Crédit Mutuel 2026

Application web moderne pour la gestion des inscriptions à l'Assemblée Générale du Crédit Mutuel, avec synchronisation en temps réel.

## 🌟 Fonctionnalités

### Pour les utilisateurs
- ✅ **S'inscrire rapidement** - Nom, nombre de personnes, créneaux optionnels
- ✅ **Modifier ses informations** - Cliquer sur ✏️ pour changer n'importe quel détail
- ✅ **Supprimer son inscription** - Cliquer sur 🗑️ avec confirmation
- ✅ **Synchro temps réel** - Les mises à jour sont instantanées !
- ✅ **Créneaux optionnels** - Peut s'inscrire sans connaître ses horaires

### Pour les organisateurs
- ✅ **Vue en temps réel** - Liste mise à jour instantanément
- ✅ **Statistiques automatiques** - Total personnes, créneaux 18H/19H
- ✅ **Gestion des torchons** - Compteur interactif
- ✅ **Tous les outils** - Modifier, supprimer, consulter en temps réel

## 🚀 Déploiement

### Méthode 1 : Drag & Drop (la plus simple)

1. Extraire tous les fichiers
2. Aller sur [Netlify](https://app.netlify.com)
3. Cliquer sur **"Add new site"** → **"Deploy manually"**
4. Glisser-déposer le dossier complet
5. ✅ C'est fini !

### Méthode 2 : Via GitHub (recommandé)

1. Créer un repo GitHub
2. Pousser tous les fichiers
3. Sur Netlify, cliquer sur **"Add new site"** → **"Import an existing project"**
4. Connecter ton compte GitHub
5. Sélectionner le repo
6. Netlify déploiera automatiquement à chaque push

### Méthode 3 : Netlify CLI (pour développeurs)

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
cd ton-dossier
netlify deploy --prod
```

## 📁 Structure du projet

```
credit-mutuel-ag-2026/
├── index.html              # Frontend principal
├── README.md              # Ce fichier
└── netlify/
    └── functions/
        └── api.js         # API Serverless (GET, POST, PUT, DELETE)
```

⚠️ **Important :** Le fichier `netlify.toml` n'est pas nécessaire. La configuration des fonctions Netlify se fait via les variables d'environnement dans le dashboard Netlify.

## 🎨 Customisation

### Modifier le titre et la date

Dans `index.html`, recherche et remplace :

```html
<h1>Service A.G. du Crédit Mutuel</h1>
<p>📅 Vendredi 20 Mars 2026</p>
```

### Changer les couleurs

Les couleurs sont définies dans `<style>` :

```css
/* Couleurs principales */
--primary-color: #004B87;    /* Bleu Crédit Mutuel */
--success-color: #22c55e;    /* Vert */
--warning-color: #f59e0b;    /* Orange */
--danger-color: #ef4444;      /* Rouge */
--text-primary: #1e293b;     /* Texte principal */
--text-secondary: #64748b;   /* Texte secondaire */
```

### Ajuster le nombre de torchons requis

Dans `index.html`, recherche :

```html
<p class="torchon-total">Total récolté : <span id="torchonsTotal">0</span>/40</p>
```

Remplace `40` par le nombre souhaité.

## 🔥 Firebase

### Configuration

La base de données Firebase Realtime est déjà configurée dans `index.html` :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyApJH6KoxUjKP-Mj3Xr-ZKjlAWZe31PI7Q",
  authDomain: "credit-mutuel-ag-2026.firebaseapp.com",
  databaseURL: "https://credit-mutuel-ag-2026-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "credit-mutuel-ag-2026",
  storageBucket: "credit-mutuel-ag-2026.firebasestorage.app",
  messagingSenderId: "120918886580",
  appId: "1:120918886580:web:211c59e44bb2ad8216efe1"
};
```

### Consulter les données en direct

1. Aller sur [Firebase Console](https://console.firebase.google.com/project/credit-mutuel-ag-2026/database)
2. Les données sont en temps réel
3. Tu peux modifier directement depuis Firebase si nécessaire

### Règles de sécurité

Pour la production, sécurise ta base de données :

```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

## 🛠️ API

L'API Serverless est déployée sur Netlify Functions :

### Endpoints

#### GET `/.netlify/functions/api`
Récupérer tous les volontaires

**Réponse :**
```json
[
  {
    "id": "abc123",
    "name": "Jean Dupont",
    "time18": true,
    "time19": false,
    "persons": 2,
    "tshirt": "M",
    "createdAt": "2026-02-24T17:00:00.000Z"
  }
]
```

#### POST `/.netlify/functions/api`
Ajouter un nouveau volontaire

**Corps de la requête :**
```json
{
  "name": "Jean Dupont",
  "time18": true,
  "time19": false,
  "persons": 2,
  "tshirt": "M"
}
```

#### PUT `/.netlify/functions/api`
Modifier un volontaire existant

**Corps de la requête :**
```json
{
  "id": "abc123",
  "name": "Jean Dupont Modifié",
  "time18": true,
  "time19": true,
  "persons": 3,
  "tshirt": "L"
}
```

#### DELETE `/.netlify/functions/api/{id}`
Supprimer un volontaire

**Réponse :**
```json
{
  "success": true,
  "id": "abc123"
}
```

## 💡 Guide d'utilisation

### Pour les participants

#### 1. S'inscrire pour la première fois

1. Remplir ton **Nom / Prénom**
2. Cocher les créneaux où tu es disponible :
   - ☑️ **18H** ou
   - ☑️ **19H** ou
   - ☑️ Les deux
3. Indiquer le **nombre de personnes** qui viennent avec toi
4. Choisir ta **taille de T-shirt** (si c'est ta première fois)
5. Cliquer sur **"✅ Valider mon inscription"**

#### 2. Tu ne connais pas encore tes horaires ?

Pas de problème ! Tu peux :
1. S'inscrire avec **seulement ton nom et le nombre de personnes**
2. Laisser les créneaux vides
3. Plus tard, cliquer sur le bouton **✏️ Modifier** à côté de ton nom
4. Ajouter tes créneaux

#### 3. Modifier ton inscription

1. Cliquer sur le bouton **✏️ Modifier** à côté de ton nom
2. Changer n'importe quelles informations :
   - Nom
   - Créneaux (18H / 19H)
   - Nombre de personnes (si quelqu'un de plus peut venir)
   - Taille de T-shirt
3. Cliquer sur **"💾 Enregistrer"**

#### 4. Se désinscrire

1. Cliquer sur le bouton **🗑️ Supprimer** à côté de ton nom
2. Confirmer la suppression
3. Ton inscription est retirée instantanément

### Pour les organisateurs

#### Voir les statistiques en temps réel

Les compteurs se mettent à jour automatiquement :
- **Total Personnes** - Nombre total de participants
- **Créneau 18H** - Nombre de volontaires disponibles à 18H
- **Créneau 19H** - Nombre de volontaires disponibles à 19H

#### Surveiller les inscriptions

La liste des volontaires est mise à jour en temps réel grâce à Firebase. Pas besoin de rafraîchir la page !

## 🎨 Design et Responsivité

### Points forts

- ✅ **Mobile-first** - Optimisé pour smartphones et tablettes
- ✅ **Tableau responsive** - Scroll horizontal sur petits écrans
- ✅ **Contraste élevé** - Accessible en toutes conditions lumineuses
- ✅ **Boutons tactiles** - Taille idéale pour le touch
- ✅ **Notifications visuelles** - Messages de confirmation colorés
- ✅ **Modal intuitif** - Édition simple sans changer de page

### Breakpoints

```css
/* Mobile (portrait) */
@media (max-width: 768px) {
  main { grid-template-columns: 1fr; }
}

/* Tablet (paysage) */
@media (min-width: 769px) {
  main { grid-template-columns: 1fr 2fr; }
}
```

## 🔒 Sécurité

### Bonnes pratiques

1. **HTTPS obligatoire** - Le site est déployé sur Netlify avec HTTPS automatique
2. **Firebase sécurisé** - Les règles de sécurité limitent l'accès si nécessaire
3. **Validation côté serveur** - Les données sont validées avant l'enregistrement
4. **XSS protégé** - Les entrées utilisateur sont échappées avant l'affichage

### Pour la production

1. Restreindre l'écriture Firebase aux utilisateurs authentifiés
2. Ajouter une limite de taux (rate limiting) sur les fonctions Netlify
3. Activer les logs d'audit
4. Mettre en place un backup automatique des données Firebase

## 🌐 Personnalisation du domaine

### Sur Netlify

1. Aller sur **Site Settings**
2. Cliquer sur **"Change site name"**
3. Entrer un nom personnalisé (ex: `ag-credit-mutuel-2026`)
4. C'est fini ! L'URL sera : `https://ag-credit-mutuel-2026.netlify.app`

### Domaine personnalisé

1. Ajouter ton propre domaine dans **Domain Management**
2. Configurer les DNS selon les instructions Netlify
3. Attendre la propagation DNS (quelques minutes à 24h)
4. Ton site sera accessible via ton propre domaine !

## 📱 Compatibilité

- ✅ Chrome/Edge (dernières versions)
- ✅ Firefox (dernières versions)
- ✅ Safari (iOS et macOS)
- ✅ Mobile browsers (Chrome Mobile, Safari iOS)
- ✅ Tablettes (iPad, Android tablets)

## 🐛 Résolution de problèmes

### Les données ne s'affichent pas

1. Vérifie que Firebase est connecté (indicateur "🔥 Synchro temps réel")
2. Regarde la console du navigateur (F12 → Console)
3. Vérifie l'accès à Firebase Console

### Erreur de connexion

1. Vérifie ta connexion internet
2. Actualise la page
3. Contacte l'organisateur si le problème persiste

### Les modifications ne s'affichent pas

Firebase est en temps réel, mais le cache du navigateur peut parfois retarder :
1. Actualise la page (F5 ou Ctrl+R)
2. Vide le cache si nécessaire
3. Attendre quelques secondes

## 📞 Support

Pour toute question ou problème :

- **Documentation Firebase** : https://firebase.google.com/docs
- **Documentation Netlify** : https://docs.netlify.com/
- **Problème avec l'app** : Contacter l'organisateur de l'AG

## 📄 Licence

Ce projet est propriété de l'organisateur de l'Assemblée Générale du Crédit Mutuel.

---

**Développé avec ❤️ pour les volontaires du Crédit Mutuel**
