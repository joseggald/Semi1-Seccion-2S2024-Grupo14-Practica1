const express = require("express");
const router = express.Router();
const {
  createSong,
  deleteSong,
  updateSong,
  getSongById,
  getAllAdmin,
  getByNameAdmin,
  getByAuthorAdmin
} = require("../controllers/songController");

router.post("/create", createSong);
router.put("/update/:id", updateSong);
router.delete("/delete/:id", deleteSong);
router.get("/get_by_Id/:id", getSongById);
router.get("/get_all_admin", getAllAdmin);
router.get("/get_by_name_admin/:name", getByNameAdmin);
router.get("/get_by_author_admin/:author", getByAuthorAdmin);

module.exports = router;
