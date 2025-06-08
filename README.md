
# 📝 Système de Feedback pour Produits Numériques

Ce projet permet à une entreprise SaaS de recueillir des retours d'utilisateurs sur ses produits numériques. Les utilisateurs peuvent noter et commenter les produits qu’ils ont utilisés. L'application utilise GraphQL, Node.js, Express et MongoDB.

## 🚀 Fonctionnalités

- Authentification par token JWT
- Création, lecture, mise à jour et suppression des utilisateurs
- Création, lecture, mise à jour et suppression des produits
- Création et suppression de feedbacks (note + commentaire)
- Calcul de la note moyenne d’un produit
- Requête pour voir tous les feedbacks par produit ou utilisateur

## 🧠 Modèle de données

### Entités principales

- **User** : nom, email
- **Product** : nom, description
- **Feedback** : note (1-5), commentaire, utilisateur, produit

## 🧰 Technologies

- **Node.js**, **Express**
- **Apollo Server** (GraphQL)
- **MongoDB** avec **Mongoose**
- **JWT** pour l’authentification

## 📌 Installation

```bash
git clone https://github.com/votre-utilisateur/feedback-system.git
cd feedback-system
npm install
```

Crée un fichier `.env` à la racine avec les variables suivantes :

```
MONGODB_URI=mongodb://localhost:27017/feedbackdb
JWT_SECRET=cle-secrete-jwt
```

Lance le serveur :

```bash
npm start
```

Serveur disponible sur: `http://localhost:4000/graphql`

## 🔐 Authentification

L'authentification est basée sur un token JWT.

### Exemple de login :

```graphql
mutation {
  login(email: "john@example.com") {
    token
    user {
      id
      name
    }
  }
}
```

Ensuite, ajoute le token JWT dans l'en-tête des requêtes :

```
Authorization: Bearer VOTRE_TOKEN
```

---

## 📚 Exemple de requêtes GraphQL

### 🔍 Obtenir tous les produits :

```graphql
query {
  products {
    id
    name
    description
  }
}
```

### ➕ Ajouter un produit :

```graphql
mutation {
  createProduct(name: "Mon Produit", description: "Description du produit") {
    id
    name
  }
}
```

### 💬 Donner un feedback :

```graphql
mutation {
  createFeedback(productId: "ID_DU_PRODUIT", rating: 4, comment: "Très bon produit") {
    id
    rating
    comment
    user {
      name
    }
    product {
      name
    }
  }
}
```

### ⭐ Obtenir la note moyenne :

```graphql
query {
  averageRating(productId: "ID_DU_PRODUIT")
}
```

---


## 📁 Structure du projet

```
.
├── models/
│   ├── user.js
│   ├── product.js
│   └── feedback.js
├── graphql/
│   ├── resolvers.js
│   └── schema.js
├── utils/
│   └── auth.js
├── index.js
├── .env
└── README.md
```

---

## 📄 Licence

Ce projet est libre de droits et à usage éducatif. Licence MIT.

---

## ✨ Auteur

Projet développé dans le cadre d’un système de gestion de feedbacks pour une entreprise SaaS.
