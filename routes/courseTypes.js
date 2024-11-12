const express = require('express');
const router = express.Router();
const CourseTypeController = require("../controllers/CourseTypeController.js");

router.post('/', CourseTypeController.createCourseType);
router.put('/:id', CourseTypeController.updateCourseType);
router.delete('/:id', CourseTypeController.deleteCourseType);

module.exports = router;