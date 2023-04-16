const User = require("../models/UserModels.js");

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.findIndex(
        ({ id }) => id === data.id,
      );
      console.log("liked movies", likedMovies);
      console.log("FOUND ? ", movieAlreadyLiked);
      if (movieAlreadyLiked == -1) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true },
        );
      } else {
        return res.json({ msg: "Movie already in liked list" });
      }
    } else {
      await User.create({ email, likedMovies: [data] });
      return res.json({ msg: "Movie added successfully" });
    }
  } catch (error) {
    return res.json({ msg: "Error addding Movies" });
  }
};

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (user) {
      res.json({ msg: "success", movies: user.likedMovies });
    } else {
      return res.json({ msg: "User with given email not found" });
    }
  } catch (error) {
    return res.json({ msg: "Error fetching movies" });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const { likedMovies } = user;

      const movieIndex = likedMovies.findIndex(({ id }) => movieId === id);

      if (movieIndex === -1) {
        res.status(400).send({ msg: "movie not found" });
      } else {
        likedMovies.splice(movieIndex, 1);
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies,
          },
          { new: true },
        );
        return res.json({ msg: "movie Deleted", movies: likedMovies });
      }
    }
  } catch (error) {
    console.log("ERROR DELETING MOVIES");
    return res.json({ msg: "Error deleting movies" });
  }
};
