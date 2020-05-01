// ESM syntax is supported.
export {}

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const dotenv = require("dotenv").config();

// Routes
import {
  userRouter,
  postRouter
} from "./routes/index";

const app = express();

// Middleware to allow Cross origin point, parsing JSON, and body
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, 
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established succesfully");
});

// User Routes
const apiRouter = express.Router();
app.use("/api", apiRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/posts", postRouter);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})