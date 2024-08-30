const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifySession, logoutUser, getUserById, updatePhoto } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify_session', verifySession);
router.post('/logout', logoutUser);
router.post('/get_user_byId', getUserById);
router.put('/update_photo', updatePhoto);

module.exports = router;