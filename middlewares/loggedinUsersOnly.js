const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const loggedinUsersOnly = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    if (user.isBanned) return res.status(403).json({ message: 'User is banned' });

    req.user = user;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = loggedinUsersOnly;
