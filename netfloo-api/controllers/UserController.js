const User = require("../models/UserModels.js");
var YOUTUBE_API_KEY = "AIzaSyCMo_cxoTE3VklCXSaEQy55QCWytx8myLI";
const axios = require("axios");
const Atlas = require("../Database/MongoAtlas.js");
Atlas.run().catch(console.error);

// Atlas.insert(12322143, "youtube.com");

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

module.exports.getYTLink = async (req, res) => {
  try {
    const { movieId, name } = req.query;

    const find = await Atlas.find(movieId);

    if (!find) {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${name} trailer&type=video&key=${YOUTUBE_API_KEY}`;

      const response = await axios.get(url);
      const link = response.data.items[0].id.videoId;
      const data = await Atlas.insert(movieId, link).then(async () => {
        return await Atlas.find(movieId);
      });

      return res.json({ msg: "Video recieve", movies: data });
    } else {
      const unique = await Atlas.find(movieId).then((err, data) => {
        if (err) {
          return err;
        } else {
          return data[0];
        }
      });
      return res.json({ msg: "Video recieve", movies: unique });
    }
  } catch (error) {
    console.log(error);
  }
};
