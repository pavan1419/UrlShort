const express = require('express');
const {
  generateNewShortUrl,
  handleGetAnalytics,
} = require('../controllers/urlController');

const router = express.Router();

router.post('/shorten', generateNewShortUrl);

// router.get('/analytics/', handleGetAnalytics);
router.get('/analytics/:shortId', handleGetAnalytics);
module.exports = router;
