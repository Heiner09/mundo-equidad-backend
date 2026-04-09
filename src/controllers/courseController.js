const Course = require('../models/Course');

const courseController = {
  getCourses: async (req, res, next) => {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error) {
      next(error);
    }
  },

  createCourse: async (req, res, next) => {
    try {
      const { title, description, imageUrl, externalLink } = req.body;

      if (!title || !description || !externalLink) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
      }

      const course = new Course({
        title,
        description,
        imageUrl,
        externalLink,
      });

      await course.save();
      res.status(201).json({ message: 'Curso creado', course });
    } catch (error) {
      next(error);
    }
  },

  getCourseById: async (req, res, next) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      res.json(course);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = courseController;
