const { MongoClient } = require("mongodb");

// Replace the following with your MongoDB Atlas connection string
const uri = "mongodb+srv://Lovinson:01302004@cluster0.vf5mqzm.mongodb.net/test";

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
  } finally {
    await client.close();
  }
};

db.insert = async function insert(movieId, link) {
  await client.connect();
  const result = await videos.insertOne({ movieId: movieId, link: link });
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

db.delete = async function del(params) {
  const result = await videos.deleteMany({});
};
module.exports = db;