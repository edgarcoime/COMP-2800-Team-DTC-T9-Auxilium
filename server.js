// ESM syntax is supported.
export {};

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import favicon from "express-favicon";
import path from "path";
const dotenv = require("dotenv").config();

// Routes
import {
  userRouter,
  postRouter,
  authRouter,
  commentRouter,
  covidPostRouter,
} from "./routes/index";

const app = express();

// More difficult to see that app is using express
app.disable("x-powered-by");

// Middleware to allow Cross origin point, parsing JSON, and body
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(favicon(__dirname + "/build/favicon.ico"));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});

app.get("/ping", function (req, res) {
  return res.send("pong");
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// User Routes
const apiRouter = express.Router();
app.use("/api", apiRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/posts", postRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/covid", covidPostRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
