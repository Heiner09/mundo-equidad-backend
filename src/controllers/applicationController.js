const Application = require('../models/Application');

const applicationController = {
  createApplication: async (req, res, next) => {
    try {
      const { vacancyId, personalData } = req.body;

      if (!vacancyId) {
        return res.status(400).json({ message: 'vacancyId es requerido' });
      }

      const application = new Application({
        vacancyId,
        personaId: req.user.userId,
        personalData,
        cvSource: 'system',
      });

      await application.save();
      res.status(201).json({ message: 'Aplicación creada', application });
    } catch (error) {
      next(error);
    }
  },

  getApplications: async (req, res, next) => {
    try {
      const applications = await Application.find({ personaId: req.user.userId })
        .populate('vacancyId')
        .populate('personaId', 'username email');
      res.json(applications);
    } catch (error) {
      next(error);
    }
  },

  getApplicationsByVacancy: async (req, res, next) => {
    try {
      const applications = await Application.find({ vacancyId: req.params.vacancyId })
        .populate('personaId', 'username email');
      res.json(applications);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = applicationController;
