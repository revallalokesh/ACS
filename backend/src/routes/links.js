const express = require('express');
const router = express.Router();
const {
  createLink,
  getAllLinks,
  getLinkStats,
  deleteLink
} = require('../controllers/linkController');


router.post('/', createLink);


router.get('/', getAllLinks);


router.get('/:code', getLinkStats);


router.delete('/:code', deleteLink);

module.exports = router;