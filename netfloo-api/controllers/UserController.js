const User = require("../models/UserModels.js");
const { getDatabase, onValue, ref, set } = require("firebase/database");
var YOUTUBE_API_KEY = "AIzaSyBxQZoxk2bmKqGRudoMFPua477bDIas-HU";
module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.findIndex(
        ({ id }) => id === data.id,
      );

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

module.exports.getYTVideo = async (req, res) => {
  res.json({ msg: "Error deleting movies" });
  console.log("THE REQ", req);
  const { movieId, name } = req.params;
  console.log("movie id and name", movieId, name);
  const reference = ref(db, "Videos/" + movieId);
  const db = getDatabase();
  function writeVideoData(movieId, link) {
    const reference = ref(db, "Videos/" + movieId);
    set(reference, {
      movieId: movieId,
      link: link,
    });
  }

  onValue(reference, async (snapshot) => {
    if (snapshot === null) {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${name} trailer&type=video&key=${YOUTUBE_API_KEY}`;
      try {
        const response = await axios.get(url);
        console.log("the response", response);
        // writeVideoData(movieId, r);
      } catch (error) {
        console.error(error);
      }
    } else {
      const data = snapshot.val();
      console.log("theytcyttc", data);
      return res.json({ msg: "success", data: data });
    }
  });
};
