const express = require('express');
const router = express.Router();
const { getProfileByUserId } = require('../controllers/user/profileGet');
const authenticateToken = require('../middleware/authenticateToken.js');

router.get('/profile/:userId',authenticateToken, getProfileByUserId);

module.exports = router;
