const User = require('../models/user'); 
const Product = require('../models/product');
const Feedback = require('../models/feedback');
const { generateToken } = require('../utils/auth');



module.exports = {
  Query: {
  me: async (_, __, context) => {
    if (!context.user) throw new Error("Non authentifié");
    return await User.findById(context.user.id);
  },

  user: async (_, { id }, context) => {
    if (!context.user) throw new Error("Non authentifié");
    return await User.findById(id);
  },

  users: async (_, __, context) => {
    if (!context.user) throw new Error("Non authentifié");
    return await User.find();
  },

  products: async (_, __, context) => {
    if (!context.user) throw new Error("Non authentifié");
    return await Product.find();
  },

  product: async (_, { id }, context) => {
    if (!context.user) throw new Error("Non authentifié");
    return await Product.findById(id);
  },

  feedbacks: async (_, { productId }, context) => {
    if (!context.user) throw new Error("Non authentifié");
    return await Feedback.find({ product: productId }).populate('user').populate('product');
  },

  feedbackByUser: async (_, { userId }, context) => {
    if (!context.user) throw new Error("Non authentifié");
    return await Feedback.find({ user: userId }).populate('user').populate('product');
  },

  allFeedbacks: async (_, __, context) => {
    if (!context.user) throw new Error("Non authentifié");
    return await Feedback.find().populate('user').populate('product');
  },

  averageRating: async (_, { productId }, context) => {
    if (!context.user) throw new Error("Non authentifié");
    const feedbacks = await Feedback.find({ product: productId });
    if (feedbacks.length === 0) return 0;
    const total = feedbacks.reduce((sum, f) => sum + f.rating, 0);
    return total / feedbacks.length;
  },
},

 
  Mutation: {
  login: async (_, { email }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Utilisateur non trouvé');

    const token = generateToken(user);
    return { token, user };
    },

  createUser: async (_, { name, email }) => {
    const user = new User({ name, email });
    await user.save();
    return user;
  },

  updateUser: async (_, { id, name, email }, context) => {
    if (!context.user) throw new Error("Non authentifié");
    if (context.user.id !== id) throw new Error("Tu ne peux modifier que ton propre compte");
    return await User.findByIdAndUpdate(id, { name, email }, { new: true });
  },

  deleteUser: async (_, { id }, context) => {
    if (!context.user) throw new Error("Non authentifié");
    if (context.user.id !== id) throw new Error("Tu ne peux supprimer que ton propre compte");
    return await User.findByIdAndDelete(id);
  },

  createProduct: async (_, { name, description }, context) => {
    if (!context.user) throw new Error("Non authentifié");
    const product = new Product({ name, description });
    await product.save();
    return product;
  },

  updateProduct: async (_, { id, name, description }, context) => {
    if (!context.user) throw new Error("Non authentifié");
    return await Product.findByIdAndUpdate(id, { name, description }, { new: true });
  },

  deleteProduct: async (_, { id }, context) => {
    if (!context.user) throw new Error("Non authentifié");
    return await Product.findByIdAndDelete(id);
  },

  createFeedback: async (_, { productId, rating, comment }, context) => {
    if (!context.user) throw new Error("Non authentifié");

    const feedback = new Feedback({
      user: context.user.id,
      product: productId,
      rating,
      comment,
    });

    await feedback.save();
    await feedback.populate(['user', 'product']);
    return feedback;
  },

  deleteFeedback: async (_, { id }, context) => {
    if (!context.user) throw new Error("Non authentifié");

    const feedback = await Feedback.findById(id);
    if (!feedback) throw new Error("Feedback introuvable");

    if (String(feedback.user) !== context.user.id) {
      throw new Error("Tu ne peux supprimer que ton propre feedback");
    }

    return await Feedback.findByIdAndDelete(id);
  },
},

};
