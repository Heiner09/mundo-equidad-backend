const bcryptjs = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

const authController = {
  register: [
    body('username').trim().notEmpty().withMessage('Username es requerido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('Contraseña mínimo 6 caracteres'),
    body('role').isIn(['persona', 'empresa']).withMessage('Role debe ser persona o empresa'),
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const { username, email, password, role } = req.body;

        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
          return res.status(400).json({ message: 'Usuario o email ya existe' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        user = new User({
          username,
          email,
          password: hashedPassword,
          role,
        });

        await user.save();

        const token = generateToken(user._id, user.role);

        res.status(201).json({
          message: 'Usuario registrado exitosamente',
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        });
      } catch (error) {
        next(error);
      }
    },
  ],

  login: [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('Contraseña requerida'),
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = generateToken(user._id, user.role);

        res.json({
          message: 'Login exitoso',
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        });
      } catch (error) {
        next(error);
      }
    },
  ],

  me: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
