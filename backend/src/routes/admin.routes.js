// src/routes/admin.routes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// All routes require authentication and admin role
router.use(authMiddleware);
router.use(roleMiddleware('admin'));

// User management
router.get('/users', adminController.getAllUsers);
router.patch('/users/:userId/status', adminController.updateUserStatus);

// University management
router.get('/universities/pending', adminController.getPendingUniversities);
router.patch('/universities/:userId/approve', adminController.approveUniversity);
router.patch('/universities/:userId/reject', adminController.rejectUniversity);

module.exports = router;