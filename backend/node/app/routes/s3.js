const express = require('express');
const router = express.Router();
const { uploadSong, uploadImage } = require('../controllers/s3Controller');

router.post('/upload-song', uploadSong);
router.post('/upload-image', uploadImage);

module.exports = router;