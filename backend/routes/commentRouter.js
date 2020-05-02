import express from "express";

// Item model to find data in DB
import Comment from "../models/Comment.model";

// Auth middleware
import auth from "../middleware/auth.middleware";

const commentRouter = express.Router();

// @route     GET api/comments/:postId
// @desc      Get all comments under a post by post ID 
// @access    Public
commentRouter.get("/", async (req, res) => {
  try {
    const response = await Comment.find().sort({ date: -1 });
    res.json(response);
  } catch (error) {
    console.log(error)
  }
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
