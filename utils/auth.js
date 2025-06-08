const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'cle-secrete-jwt';

function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    SECRET_KEY,
    { expiresIn: '1d' }
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
