import express from "express";

// Item model to find data in DB
import Post from "../models/Post.model";

const postRouter = express.Router();

// @route     GET api/posts
// @desc      Get All posts
// @access    Public
postRouter.get("/", async (req, res) => {
  try {
    const response = await Post.find().sort({ date: -1 });
    res.json(response);
  } catch (error) {
    console.log(error)
  }
});

// @route     POST api/posts
// @desc      Create a post
// @access    Private (implement auth later)
postRouter.post("/", async (req, res) => {
  const { title, content, owner } = req.body
  try {
    const newPost = new Post({
      title,
      content,
      owner
    });
  
    const registeredPost = await newPost.save();
    res.json(registeredPost);
  } catch (error) {
    console.log(error)
  }
});

// @route     delete api/posts/:id
// @desc      Delete a post
// @access    Private (implement auth later)
postRouter.delete("/:id", async (req, res) => {
  try {
    const foundPost = await Post.findById(req.params.id);
    foundPost.remove().then(() => res.json({ success: true }));
  } catch (error) {
    res.status(404).json({ success: false });
  }
});

// @route     delete api/posts/:id
// @desc      Delete a post
// @access    Private (implement auth later)
postRouter.put("/:id", async (req, res) => {
  try {
    const foundPost = await Post.findById(req.params.id);
    foundPost.remove().then(() => res.json({ success: true }));
  } catch (error) {
    res.status(404).json({ success: false });
  }
});

export default postRouter;
