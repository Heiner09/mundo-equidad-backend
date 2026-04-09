const handleErrors = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Error de validación',
      errors: err.errors
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'ID inválido' });
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(400).json({ message: 'Valor duplicado en base de datos' });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
  });
};

module.exports = handleErrors;
