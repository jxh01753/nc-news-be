const seedDB = require("./seed");
const mongoose = require("mongoose");
const data = require("./devData/index");
const { DB_URL } = require("../config");

mongoose
  .connect(DB_URL)
  .then(() => seedDB(data))
  .then(() => {
    console.log(`Database has been successfully seeded!`);
    console.log(`Disconnecting from mongodb...`);
    return mongoose.disconnect();
  })
  .catch(console.log);
