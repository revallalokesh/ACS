const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ error: errors.join(', ') });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Code already exists' });
  }

  // Default error
  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;