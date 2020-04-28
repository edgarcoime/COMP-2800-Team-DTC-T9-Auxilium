const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv').config()
const passport = require("passport");
const localStrategy = require("passport-local");
const passportMongoose = require("passport-local-mongoose");

const app = express();

// const userSchema = new mongoose.Schema({
//   username      : String,
//   password      : String,
// });
// userSchema.plugin(passportMongoose);
// const User = mongoose.model("User", userSchema);


app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, 
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established succesfully");
})

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>")
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})