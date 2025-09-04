// src/controllers/admin.controller.js
const User = require('../models/User');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Update user status
exports.updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;
    
    const user = await User.findByIdAndUpdate(
      userId, 
      { status }, 
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Get pending universities
exports.getPendingUniversities = async (req, res) => {
  try {
    const universities = await User.find({ 
      role: 'university', 
      status: 'pending' 
    });
    res.json(universities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Approve university
exports.approveUniversity = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByIdAndUpdate(
      userId, 
      { status: 'active' }, 
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: "Université non trouvée" });
    }
    
    res.json({ success: true, message: "Université approuvée avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Reject university
exports.rejectUniversity = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByIdAndUpdate(
      userId, 
      { status: 'suspended' }, 
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: "Université non trouvée" });
    }
    
    res.json({ success: true, message: "Demande rejetée" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};