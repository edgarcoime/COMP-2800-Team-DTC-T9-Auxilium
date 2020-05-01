import express from "express";

// Item model to find data in DB
import Post from "../models/Post.model";

// Auth middleware
import auth from "../middleware/auth.middleware";

const commentRouter = express.Router();

// @route     GET api/comments/:id
// @desc      Get all comments under a post by post ID 
// @access    Public
commentRouter.get("/:postId", async (req, res) => {
  res.json({ msg: "This is where we get comments under an id" })
});

export default commentRouter;
