const shortid = require('shortid');
const URL = require('../models/urlModel');

const generateNewShortUrl = async (req, res) => {
  const shortID = shortid();
  const body = req.body;
  if (!body.url) return res.status(400).json({ msg: 'URL is required' });
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
};

const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const result = await URL.findOne({ shortId });
    if (!result) {
      return res.status(404).json({ msg: 'URL not found' });
    }
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    return res.status(500).json({ msg: 'Error fetching analytics', error });
  }
};
module.exports = { generateNewShortUrl, handleGetAnalytics };
