import express from "express";

// Item model to find data in DB
import Post from "../models/Post.model";

// Auth middleware
import auth from "../middleware/auth.middleware";

const postRouter = express.Router();

// @route     GET api/posts/getall
// @desc      Get All posts
// @access    Public
postRouter.get("/getall", async (req, res) => {
  try {
    const response = await Post.find().sort({ date: -1 });
    res.json(response);
  } catch (error) {
    console.log(error)
  }
});

// @route     GET api/posts/getone/:id
// @desc      GET a single post based on postId
// @access    Public
postRouter.get("/getone/:id", async (req, res) => {
  try {
    const postId = req.params.id
    const foundPost = await Post.findById(postId)
    res.json(foundPost);
  } catch (error) {
    console.log(error)
  }
});

// @route     POST api/posts
// @desc      Create a post
// @access    Private (implement auth later)
postRouter.post("/", auth, async (req, res) => {
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
postRouter.delete("/:id", auth, async (req, res) => {
  try {
    const foundPost = await Post.findById(req.params.id);

    // Check if user is the one who created post
    if (req.body.reqOwner !== foundPost.owner) {
      res.json({ msg: "You do not have access to delete this post."})
    } else {
      foundPost.remove().then(() => res.json({ success: true, msg: "Succesfully deleted post" }));
    }
  } catch (error) {
    res.status(404).json({ success: false });
  }
});



postRouter.post("/:postId/like", auth, (req, res) => {
  const like = {
    owner: req.body.owner,
    postId: req.body.postId  }

  Post.findByIdAndUpdate(req.params.postId, {
      $push: {
          likes: like
      }
  }, {
      new: true
  }).exec((err, result) => {
      if (err) {
          return res.status(422).json({ error: err })
      } else {
          console.log(result);

          res.json(result)
      }
  })
})



postRouter.post("/:postId/like/delete", auth, (req, res) => {
  const like = {
    owner: req.body.owner,
    postId: req.body.postId

  }

  Post.findByIdAndUpdate(req.params.postId, {
      $pull: {
          likes: like
      }
  }, {
      new: true
  }).exec((err, result) => {
      if (err) {
          return res.status(422).json({ error: err })
      } else {
          console.log(result);

          res.json(result)
      }
  })
})

postRouter.post("/comment", (req, res) => {
  const comment = {
      text: req.body.text,
      owner: req.body.owner,
      postId: req.body.postId
    }

  Post.findByIdAndUpdate(comment.postId, {
          $push: {
              comments: comment
          }
      }, {
          new: true
      })
      .populate("comments.postedBy", "id name")
      .exec((err, result) => {
          if (err) {
              return res.status(422).json({ error: err })
          } else {
              console.log(result);

              res.json(result)
          }
      })
})

postRouter.post("/comment/delete", (req, res) => {
  const comment = {
      text: req.body.text,
      owner: req.body.owner,
      postId: req.body.postId
    }
  
  Post.findByIdAndUpdate(comment.postId, {
          $pull: {
              comments: comment
          }
      }, {
          new: true
      })
      .populate("comments.postedBy", "id name")
      .exec((err, result) => {
          if (err) {
              return res.status(422).json({ error: err })
          } else {
              console.log(result);

              res.json(result)
          }
      })
})

export default postRouter;
