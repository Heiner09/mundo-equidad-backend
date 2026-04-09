const express = require('express');
const userController = require('../controllers/userController');
const verifyTokenMiddleware = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/:id', verifyTokenMiddleware, userController.getUser);
router.put('/:id', verifyTokenMiddleware, userController.updateUser);

module.exports = router;
