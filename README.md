# Portfolio Étudiant en Ingénierie

Site portfolio moderne et responsive créé avec HTML, CSS et JavaScript pur.

## 🚀 Fonctionnalités

- **Design moderne et minimaliste** avec une palette bleu clair et blanc
- **Responsive** - S'adapte à tous les écrans (desktop, tablette, mobile)
- **Navigation fluide** avec menu mobile
- **Sections principales** :
  - Header avec navigation fixe
  - Section Hero (Accueil)
  - Section À propos avec compétences
  - Section Projets avec cartes interactives
  - Section Contact avec formulaire
  - Footer avec liens sociaux

## 📁 Structure des fichiers

```
site/
├── index.html      # Structure HTML du site
├── styles.css      # Styles CSS avec design responsive
├── script.js       # JavaScript pour interactions
└── README.md       # Documentation
```

## 🎨 Personnalisation

### Modifier les informations personnelles

1. **Dans `index.html`** :
   - Ligne 30 : Remplacer `[Votre Nom]` par votre nom
   - Lignes 50-55 : Modifier le texte de présentation dans la section "À propos"
   - Lignes 60-67 : Ajouter/modifier vos compétences
   - Lignes 75-120 : Modifier les projets (titre, description, tags, liens)
   - Lignes 140-150 : Mettre à jour les informations de contact

### Modifier les couleurs

Dans `styles.css`, les variables CSS sont définies dans `:root` (lignes 10-30) :
- `--color-primary` : Couleur principale (bleu)
- `--color-primary-light` : Bleu clair
- `--color-primary-dark` : Bleu foncé
- `--color-white` : Blanc
- `--color-light-blue` : Bleu très clair pour les arrière-plans

### Ajouter des projets

Dans `index.html`, copiez le bloc d'un projet existant (lignes 75-95) et modifiez :
- Le titre du projet
- La description
- Les tags de technologies
- Les liens vers le code et la démo

## 🌐 Déploiement

### Déploiement local

1. Ouvrez `index.html` dans votre navigateur
2. Ou utilisez un serveur local :
   ```bash
   # Avec Python
   python -m http.server 8000
   
   # Avec Node.js (http-server)
   npx http-server
   ```

### Déploiement en ligne

Le site peut être déployé sur :
- **GitHub Pages** : Poussez les fichiers dans un repository et activez GitHub Pages
- **Netlify** : Glissez-déposez le dossier ou connectez votre repository Git
- **Vercel** : Importez le projet depuis Git ou déployez via CLI
- Tout autre hébergeur de fichiers statiques

## 📱 Responsive Design

Le site est optimisé pour :
- **Desktop** : Largeur > 968px
- **Tablette** : Largeur 768px - 968px
- **Mobile** : Largeur < 768px

## 🔧 Technologies utilisées

- HTML5
- CSS3 (Variables CSS, Grid, Flexbox)
- JavaScript (ES6+)
- Aucune dépendance externe

## 📝 Notes

- Le formulaire de contact nécessite une configuration backend pour fonctionner réellement
- Les images de projets sont des placeholders - remplacez-les par vos propres images
- Tous les liens sociaux doivent être mis à jour avec vos vraies URLs

## 📄 Licence

Libre d'utilisation pour votre portfolio personnel.

