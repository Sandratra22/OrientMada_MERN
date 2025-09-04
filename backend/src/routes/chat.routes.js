// src/routes/chat.routes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// Chat
router.post('/messages', authMiddleware, chatController.sendMessage);
router.get('/threads', authMiddleware, chatController.getThreads);
router.get('/messages', authMiddleware, chatController.getMessages);

module.exports = router;
