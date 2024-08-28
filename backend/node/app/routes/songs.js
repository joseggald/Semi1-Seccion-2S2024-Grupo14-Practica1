const express = require("express");
const router = express.Router();
const {
  createSong,
  deleteSong,
  updateSong,
  getSongById,
  getAllAdmin,
  getByNameAdmin,
  getByAuthorAdmin,
  addToFavorites,
  removeFromFavorites,
  getFavoritesUser,
  getAllUser
} = require("../controllers/songController");

router.post("/create", createSong);
router.put("/update/:id", updateSong);
router.delete("/delete/:id", deleteSong);
router.get("/get_by_Id/:id", getSongById);
router.get("/get_all_admin", getAllAdmin);
router.post("/get_by_name_admin", getByNameAdmin);
router.post("/get_by_author_admin", getByAuthorAdmin);
router.post("/add_to_favorites", addToFavorites);
router.delete("/remove_from_favorites", removeFromFavorites);
router.get("/get_favorites_user", getFavoritesUser);
router.get("/get_all_user", getAllUser);

module.exports = router;
