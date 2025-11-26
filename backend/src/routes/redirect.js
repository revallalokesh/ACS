const express = require('express');
const router = express.Router();
const { redirectToTarget } = require('../controllers/linkController');

router.get('/:code([A-Za-z0-9]{6,8})', redirectToTarget);

module.exports = router;