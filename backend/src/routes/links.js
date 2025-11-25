const express = require('express');
const router = express.Router();
const {
  createLink,
  getAllLinks,
  getLinkStats,
  deleteLink
} = require('../controllers/linkController');

// POST /api/links - Create new short link
router.post('/', createLink);

// GET /api/links - Get all links
router.get('/', getAllLinks);

// GET /api/links/:code - Get single link stats
router.get('/:code', getLinkStats);

// DELETE /api/links/:code - Delete link
router.delete('/:code', deleteLink);

module.exports = router;