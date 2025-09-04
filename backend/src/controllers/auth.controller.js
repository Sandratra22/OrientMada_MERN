// src/controllers/auth.controller.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

// Register
exports.register = async (req, res) => {
  try {
    const { email, password, role, profile, universityInfo } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password et rôle requis" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email déjà utilisé" });

    const hash = await bcrypt.hash(password, 10);
    const userData = { 
      email, 
      passwordHash: hash, 
      role, 
      profile,
      status: role === 'university' ? 'pending' : 'active' // Universities start as pending
    };
    
    // Add university info if provided
    if (universityInfo) {
      userData.universityInfo = universityInfo;
    }
    
    const user = await User.create(userData);

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user: { id: user._id, email, role, status: user.status }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: "Email ou mot de passe incorrect" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user._id, email, role: user.role, status: user.status }, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
