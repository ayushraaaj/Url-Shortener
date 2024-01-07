const express = require('express');
const router = express.Router();

const {
    handleCreateNewUrl,
    handleGetAnalytics,
} = require('../controllers/url');

router.post('/', handleCreateNewUrl);
router.get('/analytics/:shortId', handleGetAnalytics);
// router.get('/:shortId', handleGetUrlByShortId);

module.exports = router;