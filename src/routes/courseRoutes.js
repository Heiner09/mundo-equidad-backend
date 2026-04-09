const express = require('express');
const courseController = require('../controllers/courseController');
const verifyTokenMiddleware = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', verifyTokenMiddleware, checkRole(['empresa']), courseController.createCourse);

module.exports = router;
