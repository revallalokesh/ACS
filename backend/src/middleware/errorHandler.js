const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.stack);

  
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ error: errors.join(', ') });
  }

  
  if (err.code === 11000) {
    return res.status(409).json({ error: 'Code already exists' });
  }

  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;