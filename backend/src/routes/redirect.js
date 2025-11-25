const express = require('express');
const router = express.Router();
const { redirectToTarget } = require('../controllers/linkController');

// GET /:code - Redirect to target URL
router.get('/:code', redirectToTarget);

module.exports = router;