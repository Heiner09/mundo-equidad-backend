const Vacancy = require('../models/Vacancy');

const vacancyController = {
  getVacancies: async (req, res, next) => {
    try {
      const vacancies = await Vacancy.find({ isActive: true }).populate('empresaId', 'username email');
      res.json(vacancies);
    } catch (error) {
      next(error);
    }
  },

  createVacancy: async (req, res, next) => {
    try {
      const { position, description, requirements, location } = req.body;

      if (!position || !description || !requirements || !location) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
      }

      const vacancy = new Vacancy({
        empresaId: req.user.userId,
        position,
        description,
        requirements,
        location,
      });

      await vacancy.save();
      res.status(201).json({ message: 'Vacante creada', vacancy });
    } catch (error) {
      next(error);
    }
  },

  getVacancyById: async (req, res, next) => {
    try {
      const vacancy = await Vacancy.findById(req.params.id).populate('empresaId', 'username email');
      if (!vacancy) {
        return res.status(404).json({ message: 'Vacante no encontrada' });
      }
      res.json(vacancy);
    } catch (error) {
      next(error);
    }
  },

  updateVacancy: async (req, res, next) => {
    try {
      const vacancy = await Vacancy.findById(req.params.id);
      if (!vacancy) {
        return res.status(404).json({ message: 'Vacante no encontrada' });
      }

      if (vacancy.empresaId.toString() !== req.user.userId) {
        return res.status(403).json({ message: 'No autorizado para actualizar esta vacante' });
      }

      const { position, description, requirements, location, isActive } = req.body;
      Object.assign(vacancy, { position, description, requirements, location, isActive });

      await vacancy.save();
      res.json({ message: 'Vacante actualizada', vacancy });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = vacancyController;
