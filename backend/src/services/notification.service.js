// src/services/notification.service.js
const Enrollment = require('../models/Enrollment');
const Message = require('../models/Message');

/**
 * Exemple simple de notification : compter les messages non lus
 * @param {String} userId 
 * @returns {Object} { unreadMessages, pendingEnrollments }
 */
async function getUserNotifications(userId) {
  const unreadMessages = await Message.countDocuments({ toUserId: userId, readAt: null });
  const pendingEnrollments = await Enrollment.countDocuments({ userId, status: 'under_review' });

  return { unreadMessages, pendingEnrollments };
}

module.exports = {
  getUserNotifications
};
