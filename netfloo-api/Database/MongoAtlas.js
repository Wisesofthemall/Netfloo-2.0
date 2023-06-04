const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB Atlas connection string
const uri = "Add link here!";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = client.db("Netfloo2");
const videos = database.collection("Videos");

const db = {};
db.run = async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    // query the Videos collection and log the results
    const query = {};
    const videosList = await videos.find(query).toArray();
    //console.log("VIDEO LIST", videosList);
  } catch (err) {
    console.error(err);
  }
};

db.insert = async function insert(movieId, link, name) {
  await client.connect();
  const result = await videos.insertOne({
    movieId: movieId,
    link: link,
    name: name,
  });
};

db.find = async function find(movieId) {
  await client.connect();
  const find = await videos.findOne(
    { movieId: movieId },
    function (err, result) {
      if (err) throw err;
      console.log("THE RESULTS", result);
      return result;
    },
  );

  return find;
};

db.findAll = async function findAll() {
  await client.connect();
  const query = {};
  const videosList = await videos.find(query).toArray();
  return videosList;
};
db.delete = async function del(params) {
  //THE PURGEEEEEEEEEEEEEEE
  const result = await videos.deleteMany({});
};

module.exports = db;
