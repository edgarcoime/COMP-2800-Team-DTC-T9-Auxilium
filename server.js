// ESM syntax is supported.
export {};

// Dependencies
import express from "express";
import mongoose from "mongoose"; // Communicates with MongoDB
import cors from "cors"; // Allows for Cross-origin-point communication
const dotenv = require("dotenv").config(); // environment variables to store mongoURI and other strings

// Routes
import {
  userRouter,
  postRouter,
  authRouter,
  commentRouter,
  covidPostRouter,
  likeRouter,
  emailRouter,
} from "./routes/index";

const app = express();

// More difficult to see that app is using express
app.disable("x-powered-by");

// Middleware to allow Cross origin point, parsing JSON, and body
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Initiates MongoDB connection via process.env
const uri = process.env.ATLAS_URI;
mongoose.connect(
  uri,
  // Flags for mongoose that prevents deprecated methods and functions
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
const connection = mongoose.connection;

// Once DB connection is initialized logs if connection was succesful
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});

// Routes for the different endpoints that starts with https://<URL>/api/<routerEndPoints>
const apiRouter = express.Router();
app.use("/api", apiRouter);
apiRouter.use("/users", userRouter);      // endpoint - /api/users/
apiRouter.use("/posts", postRouter);      // endpoint - /api/posts/
apiRouter.use("/auth", authRouter);       // endpoint - /api/auth/
apiRouter.use("/comment", commentRouter); // endpoint - /api/comment/
apiRouter.use("/covid", covidPostRouter); // endpoint - /api/covid/
apiRouter.use("/like", likeRouter);       // endpoint - /api/like/
apiRouter.use("/email", emailRouter);     // endpoint - /api/email/

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
