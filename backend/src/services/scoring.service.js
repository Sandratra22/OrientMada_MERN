// src/services/scoring.service.js
const Enrollment = require('../models/Enrollment');

/**
 * Exemple : score basé sur le nombre d'inscriptions acceptées dans une formation
 * @param {String} formationId
 * @returns {Number} score
 */
async function getFormationScore(formationId) {
  const acceptedCount = await Enrollment.countDocuments({ formationId, status: 'accepted' });
  return acceptedCount; // simple score basé sur popularité
}

module.exports = {
  getFormationScore
};
