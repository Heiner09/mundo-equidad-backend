const User = require('../models/User');

const userController = {
  getUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      if (req.user.userId !== req.params.id) {
        return res.status(403).json({ message: 'No autorizado para actualizar este usuario' });
      }

      const { username, email } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { username, email },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.json({ message: 'Usuario actualizado', user });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
