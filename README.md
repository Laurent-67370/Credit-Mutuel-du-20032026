# 📋 Service d'Inscription - A.G. Crédit Mutuel 2026

Application web moderne pour la gestion des inscriptions à l'Assemblée Générale du Crédit Mutuel, avec synchronisation en temps réel via Firebase.

## 🌟 Fonctionnalités

### Pour les participants
- ✅ **S'inscrire rapidement** - Nom, nombre de personnes, créneaux optionnels
- ✅ **Modifier son inscription** - Cliquer sur ✏️ pour changer n'importe quel détail
- ✅ **Se désinscrire** - Cliquer sur 🗑️ avec confirmation via une modale dédiée
- ✅ **Synchro temps réel** - Les mises à jour sont instantanées pour tous !
- ✅ **Créneaux optionnels** - Possibilité de s'inscrire sans connaître ses horaires

### Pour les organisateurs
- ✅ **Vue en temps réel** - Liste mise à jour instantanément via Firebase
- ✅ **Statistiques automatiques** - Total personnes, créneaux 18H/19H
- ✅ **Statistiques T-Shirts** - Compteur par taille (S/M/L/XL/XXL) + total à commander
- ✅ **Gestion des torchons** - Compteur partagé et persistant via Firebase (barre de progression)
- ✅ **Indicateur de connexion** - Badge vert/rouge en temps réel
- ✅ **Google Sheet consultatif** - Accès direct depuis l'en-tête (lecture seule)
- ✅ **Partage WhatsApp** - Bouton pour envoyer le lien avec message pré-rédigé
- ✅ **Impression de la liste** - Vue d'impression optimisée (formulaire masqué, date automatique)
- ✅ **Mode sombre automatique** - S'adapte au thème du système (iOS/Android/desktop)
- ✅ **Design responsive** - Optimisé mobile, tablette et desktop

## 🚀 Déploiement

### Méthode 1 : Drag & Drop sur Netlify (la plus simple)

1. Extraire tous les fichiers en conservant la structure :
```
credit-mutuel-ag-2026/
├── index.html
├── README.md
└── netlify/
    └── functions/
        └── api.js
```
2. Aller sur [Netlify](https://app.netlify.com)
3. Cliquer sur **"Add new site"** → **"Deploy manually"**
4. Glisser-déposer le dossier complet
5. ✅ Le site est en ligne avec une URL partageable !

### Méthode 2 : Via GitHub (recommandé pour les mises à jour)

1. Créer un repo GitHub avec tous les fichiers
2. Sur Netlify → **"Add new site"** → **"Import an existing project"**
3. Connecter GitHub et sélectionner le repo
4. Netlify redéploie automatiquement à chaque modification

### Méthode 3 : Netlify CLI

```bash
npm install -g netlify-cli
netlify login
cd ton-dossier
netlify deploy --prod
```

## 📁 Structure du projet

```
credit-mutuel-ag-2026/
├── index.html              # Frontend principal (tout-en-un)
├── README.md               # Ce fichier
└── netlify/
    └── functions/
        └── api.js          # API Serverless (GET, POST, PUT, DELETE)
```

⚠️ **Important :** Le fichier `netlify.toml` n'est pas nécessaire. La configuration des fonctions Netlify se fait via les variables d'environnement dans le dashboard Netlify.

## 🔥 Firebase

### Base de données utilisée

- **Service** : Firebase Realtime Database (Europe West)
- **Projet** : `credit-mutuel-ag-2026`
- **Structure des données** :

```
/volunteers/
  /{id}/
    id: string
    name: string
    time18: boolean
    time19: boolean
    persons: number
    tshirt: string (OK | S | M | L | XL | XXL | -)
    createdAt: ISO string

/torchons/
  count: number
```

### Consulter les données

Accéder directement à la [Firebase Console](https://console.firebase.google.com/project/credit-mutuel-ag-2026/database/credit-mutuel-ag-2026-default-rtdb/data) pour visualiser ou modifier les données en temps réel.

### Règles de sécurité recommandées

Dans Firebase Console → Realtime Database → Règles :

```json
{
  "rules": {
    "volunteers": {
      ".read": true,
      ".write": true
    },
    "torchons": {
      ".read": true,
      ".write": true
    }
  }
}
```

> ⚠️ Ces règles permettent l'accès en lecture/écriture à tous. Suffisant pour un usage interne et événementiel.

## 🛠️ API Netlify Functions

L'API serverless (`netlify/functions/api.js`) gère toutes les opérations sur Firebase.

### Endpoints

| Méthode | URL | Action |
|--------|-----|--------|
| GET | `/.netlify/functions/api` | Récupérer tous les volontaires |
| POST | `/.netlify/functions/api` | Ajouter un volontaire |
| PUT | `/.netlify/functions/api` | Modifier un volontaire |
| DELETE | `/.netlify/functions/api/{id}` | Supprimer un volontaire |

### Exemples de réponses

**GET** → tableau de volontaires :
```json
[
  {
    "id": "abc123",
    "name": "Jean Dupont",
    "time18": true,
    "time19": false,
    "persons": 2,
    "tshirt": "M",
    "createdAt": "2026-03-20T17:00:00.000Z"
  }
]
```

**POST / PUT / DELETE** → confirmation :
```json
{ "success": true, "id": "abc123" }
```

## 🎨 Personnalisation

### Modifier le titre et la date

Dans `index.html` :
```html
<h1>Service A.G. du Crédit Mutuel</h1>
<p>📅 Vendredi 20 Mars 2026</p>
```

### Modifier l'objectif torchons

Dans `index.html`, chercher `/40` et remplacer par le nombre souhaité (2 occurrences : affichage + barre de progression).

### Modifier le message WhatsApp

Dans `index.html`, dans la fonction `partagerWhatsApp()` :
```javascript
const msg = encodeURIComponent("📋 Inscriptions A.G. Crédit Mutuel – Vendredi 20 Mars 2026\n\nClique ici pour t'inscrire ou voir la liste :\n" + window.location.href);
```

### Changer les couleurs

```css
:root {
    --primary: #004B87;      /* Bleu Crédit Mutuel */
    --primary-dark: #003a6b;
    --success: #22c55e;      /* Vert */
    --warning: #f59e0b;      /* Orange */
    --danger: #ef4444;       /* Rouge */
    --info: #0ea5e9;         /* Bleu info */
}
```

> Le mode sombre possède ses propres valeurs dans `@media (prefers-color-scheme: dark)` — à ajuster séparément si besoin.

## 💡 Guide d'utilisation

### Pour les participants

#### 1. S'inscrire pour la première fois

1. Remplir ton **Nom / Prénom**
2. Cocher les créneaux où tu es disponible : 18H et/ou 19H (optionnel)
3. Indiquer le **nombre de personnes** qui viennent avec toi
4. Choisir ta **taille de T-shirt** (si c'est ta première fois)
5. Cliquer sur **"✅ Valider mon inscription"**

#### 2. Tu ne connais pas encore tes horaires ?

1. S'inscrire avec **seulement ton nom et le nombre de personnes**
2. Laisser les créneaux vides
3. Plus tard, cliquer sur **✏️** à côté de ton nom pour ajouter tes créneaux

#### 3. Modifier son inscription

1. Cliquer sur **✏️** à côté de son nom dans la liste
2. Modifier les informations souhaitées
3. Cliquer sur **"💾 Enregistrer"**

#### 4. Se désinscrire

1. Cliquer sur **🗑️** à côté de son nom
2. Confirmer dans la modale qui s'affiche
3. L'inscription est retirée instantanément

### Pour les organisateurs

#### Statistiques en temps réel

Les compteurs se mettent à jour automatiquement :
- **Total Participants** - Nombre total de personnes
- **Dispo 18H** - Nombre de volontaires disponibles à 18H
- **Dispo 19H** - Nombre de volontaires disponibles à 19H
- **T-Shirts par taille** - S / M / L / XL / XXL + total à commander

#### Partager le lien

Cliquer sur le bouton **💬 Partager** (vert) pour ouvrir WhatsApp avec le lien et un message pré-rédigé.

#### Imprimer la liste

Cliquer sur **🖨️ Imprimer** pour obtenir une vue d'impression propre :
- Formulaire et boutons masqués
- Liste complète avec statistiques
- Date et heure d'impression automatiques

#### Google Sheet

Le bouton **Google Sheet** est **consultatif uniquement**. Toutes les inscriptions, modifications et suppressions doivent être effectuées depuis l'application.

## 🎨 Design et Responsivité

### Points forts

- ✅ **Mobile-first** - Optimisé pour smartphones et tablettes
- ✅ **Mode sombre automatique** - Suit le thème du système (iOS, Android, macOS, Windows)
- ✅ **Tableau responsive** - Scroll horizontal sur petits écrans
- ✅ **Anti-overflow** - Aucun débordement horizontal sur petits écrans
- ✅ **Boutons tactiles** - Taille idéale pour le touch
- ✅ **Notifications visuelles** - Messages de confirmation colorés
- ✅ **Modales animées** - Édition et suppression sans changer de page

### Breakpoints

```css
@media (max-width: 860px)  { /* En-tête en colonne */ }
@media (max-width: 768px)  { /* Grille principale en 1 colonne */ }
@media (max-width: 640px)  { /* Ajustements stats et modal */ }
@media (max-width: 520px)  { /* Padding réduit, éléments compactés */ }
@media (prefers-color-scheme: dark) { /* Mode sombre */ }
@media print               { /* Vue impression */ }
```

## 🔒 Sécurité

### Bonnes pratiques actuelles

1. **HTTPS obligatoire** - Déployé sur Netlify avec HTTPS automatique
2. **Firebase sécurisé** - Règles limitées aux chemins `/volunteers` et `/torchons`
3. **Validation côté serveur** - Données validées dans `api.js` avant enregistrement
4. **Confirmation avant suppression** - Modale dédiée pour éviter les erreurs

### Pour aller plus loin

1. Restreindre l'écriture Firebase aux utilisateurs authentifiés
2. Ajouter un code d'accès pour protéger l'application
3. Ajouter une vérification anti-doublons (même nom)
4. Activer les logs d'audit Netlify

## 🌐 Personnalisation du domaine

### Sur Netlify

1. Aller sur **Site Settings** → **"Change site name"**
2. Entrer un nom personnalisé (ex: `ag-credit-mutuel-2026`)
3. L'URL sera : `https://ag-credit-mutuel-2026.netlify.app`

### Domaine personnalisé

1. Ajouter ton domaine dans **Domain Management**
2. Configurer les DNS selon les instructions Netlify
3. Attendre la propagation DNS (quelques minutes à 24h)

## 📱 Compatibilité

- ✅ Chrome / Edge (dernières versions)
- ✅ Firefox (dernières versions)
- ✅ Safari (iOS et macOS)
- ✅ Chrome Mobile, Samsung Internet, Safari iOS
- ✅ Tablettes (iPad, Android)

## 🐛 Résolution de problèmes

### L'indicateur affiche "Hors ligne"

1. Vérifier la connexion internet
2. Actualiser la page
3. Consulter la [Firebase Console](https://console.firebase.google.com/project/credit-mutuel-ag-2026/database)

### Les données ne s'affichent pas

1. Vérifier l'indicateur de connexion (badge en haut)
2. Ouvrir la console du navigateur (F12 → Console)
3. Vérifier les règles de sécurité Firebase

### Erreur lors d'une inscription ou modification

1. Vérifier que Netlify Functions est bien déployé
2. Vérifier les logs dans Netlify Dashboard → Functions
3. S'assurer que `api.js` est bien dans `netlify/functions/`

### Le bouton WhatsApp ne s'ouvre pas

WhatsApp doit être installé sur l'appareil. En cas d'échec, copier-coller manuellement l'URL depuis la barre d'adresse.

### L'impression ne fonctionne pas correctement

Utiliser **Chrome** ou **Edge** pour une meilleure compatibilité. Sur mobile : menu ⋮ → "Imprimer" ou "Partager → Imprimer".

## 📞 Support

- **Documentation Firebase** : https://firebase.google.com/docs
- **Documentation Netlify** : https://docs.netlify.com/
- **Problème avec l'app** : Contacter l'organisateur de l'AG

## 📄 Licence

Ce projet est propriété de l'organisateur de l'Assemblée Générale du Crédit Mutuel.

---

**Développé avec ❤️ pour les volontaires du Crédit Mutuel**
