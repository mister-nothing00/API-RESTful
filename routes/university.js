const express = require('express');
const router = express.Router();
const UniversityController = require('../controllers/UniversityController.js');

router.post('/', UniversityController.createUniversity);
router.put('/:id', UniversityController.updateUniversity);
router.delete('/:id', UniversityController.deleteUniversity);

module.exports = router;