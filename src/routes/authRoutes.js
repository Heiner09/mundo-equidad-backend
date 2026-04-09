const express = require('express');
const authController = require('../controllers/authController');
const verifyTokenMiddleware = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', verifyTokenMiddleware, authController.me);

module.exports = router;
