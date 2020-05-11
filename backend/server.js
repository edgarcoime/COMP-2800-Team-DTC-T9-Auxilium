// ESM syntax is supported.
export {}

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const dotenv = require("dotenv").config();

// Routes
import { 
  userRouter, 
  postRouter, 
  authRouter,
  commentRouter,
  covidPostRouter,
  likeRouter
} from "./routes/index";

const app = express();

// More difficult to see that app is using express
app.disable("x-powered-by");

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
apiRouter.use("/auth", authRouter);
apiRouter.use("/comment", commentRouter);
apiRouter.use("/covid", covidPostRouter);
apiRouter.use("/like", likeRouter);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})