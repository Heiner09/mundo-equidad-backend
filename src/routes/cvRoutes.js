const express = require('express');
const multer = require('multer');
const path = require('path');
const cvController = require('../controllers/cvController');
const verifyTokenMiddleware = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'cv-' + uniqueSuffix + '.pdf');
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos PDF'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.get('/', verifyTokenMiddleware, checkRole(['persona']), cvController.getCV);
router.post('/', verifyTokenMiddleware, checkRole(['persona']), cvController.createOrUpdateCV);
router.post('/upload', verifyTokenMiddleware, checkRole(['persona']), upload.single('file'), cvController.uploadCV);

module.exports = router;
