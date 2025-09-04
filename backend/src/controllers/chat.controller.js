// src/controllers/chat.controller.js

const Message = require('../models/Message');
const Enrollment = require('../models/Enrollment');

// Envoyer un message
exports.sendMessage = async (req, res) => {
  try {
    const { toUserId, body, attachments } = req.body;
    const fromUserId = req.user._id; // récupéré depuis authMiddleware

    if (!toUserId || !body) {
      return res.status(400).json({ message: 'Destinataire et contenu requis' });
    }

    // Créer une clé de thread unique (userId:toUserId)
    const threadKey =
      fromUserId.toString() < toUserId
        ? `${fromUserId}:${toUserId}`
        : `${toUserId}:${fromUserId}`;

    const message = new Message({
      threadKey,
      fromUserId,
      toUserId,
      body,
      attachments: attachments || [],
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de l’envoi du message' });
  }
};

// Récupérer tous les threads d’un utilisateur
exports.getThreads = async (req, res) => {
  try {
    const userId = req.user._id;

    const threads = await Message.aggregate([
      { $match: { $or: [{ fromUserId: userId }, { toUserId: userId }] } },
      {
        $group: {
          _id: '$threadKey',
          lastMessage: { $last: '$$ROOT' },
          count: { $sum: 1 },
        },
      },
      { $sort: { 'lastMessage.createdAt': -1 } },
    ]);

    res.json(threads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des threads' });
  }
};

// Récupérer tous les messages d’un thread
exports.getMessages = async (req, res) => {
  try {
    const { threadKey } = req.query;
    const userId = req.user._id;

    if (!threadKey) {
      return res.status(400).json({ message: 'threadKey requis' });
    }

    // Vérifier que l'utilisateur fait partie du thread
    const [user1, user2] = threadKey.split(':');
    if (userId.toString() !== user1 && userId.toString() !== user2) {
      return res.status(403).json({ message: 'Accès interdit' });
    }

    const messages = await Message.find({ threadKey }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des messages' });
  }
};
