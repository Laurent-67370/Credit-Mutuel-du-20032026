# AG Crédit Mutuel - Netlify Deployment

Service d'inscription pour l'Assemblée Générale du Crédit Mutuel avec Firebase.

## 🚀 Déploiement sur Netlify

### Méthode 1 : Drag & Drop (le plus simple)

1. **Compresser le dossier** en ZIP
2. Aller sur [app.netlify.com](https://app.netlify.com)
3. Cliquer sur **"Add new site"** → **"Deploy manually"**
4. Glisser-déposer le fichier ZIP
5. C'est fini ! 🎉

### Méthode 2 : Git (recommandé pour le long terme)

1. Créer un repo GitHub
2. Pousser le code
3. Sur Netlify : **"Add new site"** → **"Import an existing project"**
4. Connecter GitHub et sélectionner le repo

### Méthode 3 : Netlify CLI (pour développeurs)

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
cd ag-credit-mutuel-netlify
netlify deploy --prod
```

## 📁 Structure du projet

```
ag-credit-mutuel-netlify/
├── index.html              # Frontend
├── netlify.toml           # Configuration Netlify
├── package.json           # Dépendances
└── netlify/
    └── functions/
        └── api.js         # API Serverless (GET/POST)
```

## 🔥 Firebase

- **Database** : Firebase Realtime Database
- **Project ID** : credit-mutuel-ag-2026
- **Location** : europe-west1
- **URL** : https://credit-mutuel-ag-2026-default-rtdb.europe-west1.firebasedatabase.app

## 📊 Données importées

- **26 volontaires** depuis Google Sheet
- **15 torchons** récoltés
- Colonnes : Nom, 18H, 19H, Pers., T-shirt

## 🔧 Configuration

Le fichier `netlify/functions/api.js` contient déjà :
- La configuration Firebase
- Les handlers GET et POST
- La configuration CORS

## ✅ Test local (optionnel)

```bash
# Installer les dépendances
npm install

# Lancer Netlify en mode dev
npm run dev

# Accéder à http://localhost:8888
```

## 🌐 Une fois déployé

Le site sera accessible via :
- `https://votre-site-random-name.netlify.app`
- Tu peux personnaliser le domaine dans les settings Netlify
- Tu peux connecter ton propre domaine : `ag.lhusser.fr`

## 📝 Personnalisation

Pour changer le nom du site dans Netlify :
1. Aller sur **Site settings**
2. Cliquer sur **Change site name**
3. Entrer : `ag-credit-mutuel-2026`

## 🎯 Prochaines étapes

1. ✅ Déployer sur Netlify
2. ✅ Tester l'inscription
3. ✅ Partager le lien avec les volontaires
4. ✅ Surveiller Firebase Console

---

**Questions ?** Contactez-moi !
