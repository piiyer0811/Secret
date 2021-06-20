const mongoose = require('mongoose');
const config = require('config');

// db is the variable which holds the URL to connect to the mongo db atlas and it comes from default.json file in the config folder
const db = config.get('MONGO_URL');

//mongoose.connect is used to connect our app with the database by using the mongo URL

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDb Connected...');
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
