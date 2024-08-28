const express = require('express');
const router = express.Router();
const { createSong, deleteSong, updateSong, getSongById, getSongs } = require('../controllers/songController');

router.post('/create', createSong);
router.put('/update/:id', updateSong);
router.delete('/delete/:id', deleteSong);
router.get('/get_by_Id/:id', getSongById);
router.get('/get_all', getSongs);

module.exports = router;