const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    console.log("ATLAS_URI:", uri);
    client
      .connect()
      .then((connection) => {
        _db = connection.db("bakbutiken-db");
        console.log("Successfully connected to MongoDB.");
        callback();
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        callback(error);
      });
  },

  getDb: function () {
    return _db;
  },
};
