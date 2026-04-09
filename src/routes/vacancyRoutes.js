const express = require('express');
const vacancyController = require('../controllers/vacancyController');
const verifyTokenMiddleware = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

router.get('/', vacancyController.getVacancies);
router.get('/:id', vacancyController.getVacancyById);
router.post('/', verifyTokenMiddleware, checkRole(['empresa']), vacancyController.createVacancy);
router.put('/:id', verifyTokenMiddleware, checkRole(['empresa']), vacancyController.updateVacancy);

module.exports = router;
