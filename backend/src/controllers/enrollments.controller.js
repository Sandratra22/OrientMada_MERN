// src/controllers/enrollments.controller.js
const Enrollment = require('../models/Enrollment');

exports.createEnrollment = async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user._id;
    data.status = "draft";
    const enrollment = await Enrollment.create(data);
    res.status(201).json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur création dossier" });
  }
};

exports.getEnrollments = async (req, res) => {
  try {
    const filter = {};
    if (req.user.role === 'student') filter.userId = req.user._id;
    if (req.query.formationId) filter.formationId = req.query.formationId;
    const list = await Enrollment.find(filter);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur récupération dossiers" });
  }
};

exports.getEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: "Dossier non trouvé" });
    res.json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.updateEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur mise à jour" });
  }
};
