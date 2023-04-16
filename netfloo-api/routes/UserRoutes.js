const { addToLikedMovies } = require("../controllers/UserController.js");
const router = require("express").Router();

router.post("/add", addToLikedMovies);

module.exports = router;
