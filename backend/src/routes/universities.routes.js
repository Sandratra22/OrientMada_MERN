// src/routes/universities.routes.js
const express = require('express');
const router = express.Router();
const universitiesController = require('../controllers/universities.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// CRUD Université
router.get('/', universitiesController.getUniversities);
router.get('/:id', universitiesController.getUniversity);
router.post('/', authMiddleware, roleMiddleware('university','admin'), universitiesController.createUniversity);
router.patch('/:id', authMiddleware, roleMiddleware('university','admin'), universitiesController.updateUniversity);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), universitiesController.deleteUniversity);

module.exports = router;
