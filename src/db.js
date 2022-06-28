const mongoose = require('mongoose');
const { config } = require('./config/index');
var colors = require('colors');
const dbName = config.DB_NAME;
const dbUser = config.DB_USER;
const dbPassword = config.DB_PASSWORD;

const DB_URI = `mongodb+srv://${dbUser}:${dbPassword}@gp-mongo.30zjx.mongodb.net/${dbName}?retryWrites=true&w=majority`;

(async () => {
  try {
    const db = await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });

    console.log('Database Connected', db.connection.host.cyan.bold);
  } catch (error) {
    console.log(error);
  }
})();
