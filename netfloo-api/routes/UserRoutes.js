const {
  addToLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
  getYTVideo,
} = require("../controllers/UserController.js");
const router = require("express").Router();

router.post("/add", addToLikedMovies);
router.get("/liked/:email", getLikedMovies);
router.put("/remove", removeFromLikedMovies);
router.get("/video", getYTVideo);
module.exports = router;
