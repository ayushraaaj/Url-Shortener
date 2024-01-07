const express = require('express');
const router = express.Router();

const {
    handleHomePage,
    handleSignUpPage,
    handleLogInPage,
    handleGetUrlByShortId
} = require('../controllers/staticController');

router.get('/', handleHomePage);
router.get('/signup', handleSignUpPage);
router.get('/login', handleLogInPage);
router.get('/:shortId', handleGetUrlByShortId);

module.exports = router;