const express = require('express');
const router = express.Router();
const CourseController = require("../controllers/CourseControllers.js");

router.get('/', CourseController.getCourses);
router.post('/', CourseController.createCourse);
router.put('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);

module.exports = router;