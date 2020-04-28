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
});

const postsRouter = require("./routes/posts");
const usersRouter = require("./routes/users");

app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);


// app.get("/", (req, res) => {
//   res.send("<h1>Login page / Landing Page</h1>");
// });

// app.get("/register", (req, res) => {
//   res.send("<h1>Register page</h1>");
// })

// app.post("/logout", (req, res) => {
//   console.log("You have been logged out");
//   res.redirect("/");
// })

// app.get("/home", (req, res) => {
//   res.send("<h1>This is the user's personal homepage</h1>")
// })



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})