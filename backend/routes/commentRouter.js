import express from "express";

// Auth middleware
import auth from "../middleware/auth.middleware";

import Post from "../models/Post.model";

import CovidPost from "../models/CovidPost.model";

const commentRouter = express.Router();

// @route     POST api/comment
// @desc      Post comment
// @access    Private (implement auth later)
commentRouter.post("/getpostcomments", async (req, res) => {
  try {
    const { postId } = req.body;
    const foundPost = await Post.findById(postId);
    console.log(foundPost.comments);
    res.json({ comments: foundPost.comments });
    // console.log(req.body)
    // res.json("Hello comments")
  } catch (error) {
    console.log(error)
    res.status(400).json({ msg: "Could not get comments for post", error })
    // res.json({ error });
  }
});

// @route     POST api/comment
// @desc      Post comment
// @access    Private (implement auth later)
commentRouter.post("/", auth, async (req, res) => {
  const { text, owner, ownerId, postId } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: { text: text, owner: owner, ownerId: ownerId },
        },
      },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({
          error: err,
          msg: "Please provide correct owner name, owerId and postid",
        });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// @route     Post api/comment/delete/:commentId
// @desc      Delete a comments under a post by text,owner,ownerId
// @access    Public
commentRouter.post("/delete/:commentId", auth, async (req, res) => {
  const comment = {
    _id: req.params.commentId,
    text: req.body.text,
    owner: req.body.owner,
    ownerId: req.body.ownerId,
  };
  try {
    const post = await Post.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: {
          comments: comment,
        },
      },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({
          error: err,
          msg: "Please provide correct owner name, owerId and postid",
        });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// @route     POST api/comment/covid
// @desc      Post comment
// @access    Private (implement auth later)
commentRouter.post("/covid", auth, async (req, res) => {
  const { text, owner, ownerId, postId } = req.body;
  try {
    const post = await CovidPost.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: { text: text, owner: owner, ownerId: ownerId },
        },
      },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({
          error: err,
          msg: "Please provide correct owner name, owerId and postid",
        });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// @route     Post api/comment/covid/delete/:commentId
// @desc      Delete a comments under a post by text,owner,ownerId
// @access    Public
commentRouter.post("/covid/delete/:commentId", auth, async (req, res) => {
  const comment = {
    _id: req.params.commentId,
    text: req.body.text,
    owner: req.body.owner,
    ownerId: req.body.ownerId,
  };
  try {
    const post = await CovidPost.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: {
          comments: comment,
        },
      },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({
          error: err,
          msg: "Please provide correct owner name, owerId and postid",
        });
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

export default commentRouter;
