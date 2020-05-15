const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");


const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(
process.env.MONGODB_URI ||
"mongodb://user2:dbpassword2@ds035557.mlab.com:35557/heroku_qhb4t7gk", 
{
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes here
app.use(require('./routes/api.js'));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});