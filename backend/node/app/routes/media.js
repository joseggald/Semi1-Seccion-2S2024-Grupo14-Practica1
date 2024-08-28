const express = require('express');
const router = express.Router();
const { createSong, deleteSong, updateSong, getSongById, getSongs } = require('../controllers/mediaController');

router.post('/song', createSong);
router.put('/song/:id', updateSong);
router.delete('/song/:id', deleteSong);
router.get('/song/:id', getSongById);
router.get('/song', getSongs);

module.exports = router;