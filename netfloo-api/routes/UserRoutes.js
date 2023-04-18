const {
  addToLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
  getYTLink,
} = require("../controllers/UserController.js");
const router = require("express").Router();

router.post("/add", addToLikedMovies);
router.get("/liked/:email", getLikedMovies);
router.get("/video", getYTLink);
router.put("/remove", removeFromLikedMovies);
router.get("/video", getYTLink);
module.exports = router;
