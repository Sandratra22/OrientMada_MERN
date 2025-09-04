// src/controllers/universities.controller.js
const University = require('../models/University');

// Create
exports.createUniversity = async (req, res) => {
  try {
    const data = req.body;
    data.ownerUserId = req.user._id;
    const uni = await University.create(data);
    res.status(201).json(uni);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur création université" });
  }
};

// Read all
exports.getUniversities = async (req, res) => {
  try {
    const filters = {};
    if (req.query.city) filters.city = req.query.city;
    if (req.query.q) filters.name = { $regex: req.query.q, $options: 'i' };
    const unis = await University.find(filters);
    res.json(unis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur récupération universités" });
  }
};

// Read single
exports.getUniversity = async (req, res) => {
  try {
    const uni = await University.findById(req.params.id);
    if (!uni) return res.status(404).json({ message: "Université non trouvée" });
    res.json(uni);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Update
exports.updateUniversity = async (req, res) => {
  try {
    const uni = await University.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(uni);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur mise à jour" });
  }
};

// Delete
exports.deleteUniversity = async (req, res) => {
  try {
    await University.findByIdAndDelete(req.params.id);
    res.json({ message: "Supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur suppression" });
  }
};
