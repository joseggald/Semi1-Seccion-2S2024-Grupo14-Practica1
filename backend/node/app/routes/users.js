const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifySession, logoutUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify_session', verifySession);
router.post('/logout', logoutUser);

module.exports = router;