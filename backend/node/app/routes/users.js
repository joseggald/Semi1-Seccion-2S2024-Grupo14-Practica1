const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifySession, logoutUser, getUserById } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify_session', verifySession);
router.post('/logout', logoutUser);
router.get('/get_user_byId', getUserById);

module.exports = router;