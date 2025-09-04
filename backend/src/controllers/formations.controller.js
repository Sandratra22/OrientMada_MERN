// src/controllers/formations.controller.js
const Formation = require('../models/Formation');

exports.createFormation = async (req, res) => {
  try {
    const data = req.body;
    const formation = await Formation.create(data);
    res.status(201).json(formation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur création formation" });
  }
};

exports.getFormations = async (req, res) => {
  try {
    const filters = {};
    if (req.query.universityId) filters.universityId = req.query.universityId;
    if (req.query.domain) filters.domain = req.query.domain;
    if (req.query.level) filters.level = req.query.level;
    const list = await Formation.find(filters);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur récupération formations" });
  }
};

exports.getFormation = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) return res.status(404).json({ message: "Formation non trouvée" });
    res.json(formation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.updateFormation = async (req, res) => {
  try {
    const formation = await Formation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(formation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur mise à jour" });
  }
};

exports.deleteFormation = async (req, res) => {
  try {
    await Formation.findByIdAndDelete(req.params.id);
    res.json({ message: "Supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur suppression" });
  }
};
