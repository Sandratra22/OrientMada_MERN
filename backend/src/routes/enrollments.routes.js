// src/routes/enrollments.routes.js
const express = require('express');
const router = express.Router();
const enrollmentsController = require('../controllers/enrollments.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// CRUD Enrollment (inscriptions)
router.get('/', authMiddleware, enrollmentsController.getEnrollments);
router.get('/:id', authMiddleware, enrollmentsController.getEnrollment);
router.post('/', authMiddleware, enrollmentsController.createEnrollment);
router.patch('/:id', authMiddleware, enrollmentsController.updateEnrollment);

module.exports = router;
