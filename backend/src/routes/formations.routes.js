// src/routes/formations.routes.js
const express = require('express');
const router = express.Router();
const formationsController = require('../controllers/formations.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// CRUD Formation
router.get('/', formationsController.getFormations);
router.get('/:id', formationsController.getFormation);
router.post('/', authMiddleware, roleMiddleware('university','admin'), formationsController.createFormation);
router.patch('/:id', authMiddleware, roleMiddleware('university','admin'), formationsController.updateFormation);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), formationsController.deleteFormation);

module.exports = router;
