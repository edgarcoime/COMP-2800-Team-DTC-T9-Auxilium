import express from "express";

// Item model to find data in DB
import Post from "../models/Post.model";

// Auth middleware
import auth from "../middleware/auth.middleware";

const commentRouter = express.Router();

// @route     GET api/comments/:postId
// @desc      Get all comments under a post by post ID 
// @access    Public
commentRouter.get("/:postId", async (req, res) => {
  res.json({ msg: "This is where we get comments under a post id" })
});

// @route     Post api/comments/:postId
// @desc      Post a comments under a post by post ID 
// @access    Public
commentRouter.post("/:postId", async (req, res) => {
  res.json({ msg: "This is where the single post located" })
});

// @route     GET api/comments/:postId/:commentId
// @desc      GET a comments under a post by post ID and comment ID
// @access    Public
commentRouter.get("/:postId/:commentId", async (req, res) => {
  res.json({ msg: "This is where a comment under a post id" })
});

// @route     GET api/comments/:postId/:commentId
// @desc      Get all comments under a post by post ID and comment ID
// @access    Public
commentRouter.delete("/:postId/:commentId", async (req, res) => {
  res.json({ msg: "Delete a comment" })
});
 

export default commentRouter;
