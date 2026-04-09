const express = require('express');
const applicationController = require('../controllers/applicationController');
const verifyTokenMiddleware = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

router.post('/', verifyTokenMiddleware, checkRole(['persona']), applicationController.createApplication);
router.get('/', verifyTokenMiddleware, checkRole(['persona']), applicationController.getApplications);
router.get('/vacancy/:vacancyId', verifyTokenMiddleware, checkRole(['empresa']), applicationController.getApplicationsByVacancy);

module.exports = router;
