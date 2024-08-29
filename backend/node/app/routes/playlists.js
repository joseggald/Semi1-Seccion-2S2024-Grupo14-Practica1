const express = require("express");
const router = express.Router();
const {
  createPlaylist,
  deletePlaylist,
  addSongToPlaylist,
  deleteSongFromPlaylist,
  getSongsFromPlaylist,
  getPlaylistsAdmin,
  getPlaylistsUser
} = require("../controllers/playlistController.js");

router.post("/create", createPlaylist);
router.delete("/delete", deletePlaylist);
router.post("/add-song", addSongToPlaylist);
router.delete("/delete-song", deleteSongFromPlaylist);
router.get("/get-songs", getSongsFromPlaylist);
router.get("/get-all-admin", getPlaylistsAdmin);
router.get("/get-all-user", getPlaylistsUser);

module.exports = router;
