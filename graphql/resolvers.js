const User = require('../models/user'); // Import du modèle User
const Product = require('../models/product');
const Feedback = require('../models/feedback');


module.exports = {
  Query: {
    feedbacks: async (_, { productId }) => {
      return await Feedback.find({ product: productId }).populate('user').populate('product');
    },
    products: async () => {
      return await Product.find();
    },
    users: async () => {
      return await User.find();
    },
  },
  Mutation: {
    createFeedback: async (_, { userId, productId, rating, comment }) => {
  try {
    const feedback = new Feedback({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    await feedback.save();

    await feedback.populate([{ path: 'user' }, { path: 'product' }]); // ✅ Correction ici

    return feedback;
  } catch (error) {
    console.error("Erreur lors de la création du feedback :", error);
    throw new Error("Erreur lors de la création du feedback");
  }
},

    createUser: async (_, { name, email }) => {
      try {
        console.log('Création d\'un utilisateur avec :', { name, email });  // Log des données reçues
        const user = new User({ name, email });
        console.log('Utilisateur créé, tentative de sauvegarde...');
        await user.save();
        console.log('Utilisateur sauvegardé avec succès');
        return user;
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);  // Log d'erreur
        throw new Error('Erreur lors de la création de l\'utilisateur');
      }
    },
    createProduct: async (_, { name, description }) => {
  try {
    console.log('Données reçues pour createProduct :', { name, description });
    const product = new Product({ name, description });
    await product.save();
    console.log('Produit créé avec succès');
    return product;
  } catch (error) {
    console.error("Erreur lors de la création du produit :", error);
    throw new Error("Erreur lors de la création du produit");
  }
},

    
  },
};
