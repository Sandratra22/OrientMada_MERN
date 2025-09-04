// src/services/recommendation.service.js
const Formation = require('../models/Formation');

/**
 * Simple recommandation basée sur le domaine préféré de l'étudiant
 * @param {String} userId 
 * @param {Number} limit 
 * @returns {Array} liste de formations
 */
async function getRecommendedFormations(userProfile, limit = 5) {
  const domain = userProfile.preferredDomain || null;
  const filters = {};
  if (domain) filters.domain = domain;

  // Retourne les formations publiées correspondant au domaine
  return await Formation.find({ ...filters, published: true })
                        .limit(limit)
                        .sort({ createdAt: -1 });
}

module.exports = {
  getRecommendedFormations
};
