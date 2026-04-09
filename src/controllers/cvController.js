const CV = require('../models/CV');

const cvController = {
  getCV: async (req, res, next) => {
    try {
      const cv = await CV.findOne({ userId: req.user.userId });
      if (!cv) {
        return res.status(404).json({ message: 'CV no encontrado' });
      }
      res.json(cv);
    } catch (error) {
      next(error);
    }
  },

  createOrUpdateCV: async (req, res, next) => {
    try {
      const { personalData, laboralProfile, education, references } = req.body;

      let cv = await CV.findOne({ userId: req.user.userId });

      if (cv) {
        cv.personalData = personalData || cv.personalData;
        cv.laboralProfile = laboralProfile || cv.laboralProfile;
        cv.education = education || cv.education;
        cv.references = references || cv.references;
      } else {
        cv = new CV({
          userId: req.user.userId,
          personalData,
          laboralProfile,
          education,
          references,
        });
      }

      await cv.save();
      res.json({ message: 'CV actualizado', cv });
    } catch (error) {
      next(error);
    }
  },

  uploadCV: async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Archivo PDF requerido' });
      }

      let cv = await CV.findOne({ userId: req.user.userId });

      if (!cv) {
        cv = new CV({ userId: req.user.userId });
      }

      cv.pdfUrl = `/uploads/${req.file.filename}`;

      await cv.save();
      res.json({ message: 'CV PDF subido', cv });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = cvController;
