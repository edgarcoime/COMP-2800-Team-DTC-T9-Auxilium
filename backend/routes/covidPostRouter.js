import express from "express";

// Item model to find data in DB
import CovidPost from "../models/CovidPost.model";
import User from "../models/User.model";

// Auth middleware
import auth from "../middleware/auth.middleware";

const covidPostRouter = express.Router();

// @route     GET api/covid/getall
// @desc      Get All posts
// @access    Public
covidPostRouter.get("/getall", async (req, res) => {
  try {
    const response = await CovidPost.find().sort({ updatedAt: -1 });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

// @route     GET api/covid/getone/:id
// @desc      GET a single covid post based on postId
// @access    Public
covidPostRouter.get("/getone/:id", async (req, res) => {
  try {
    const covidPostId = req.params.id;
    const foundCovidPost = await CovidPost.findById(covidPostId)
    res.json(foundCovidPost);
  } catch (error) {
    console.log(error);
  }
});

// @route     GET api/covid/getSet
// @desc      GET a set of posts based on array of postIDs
// @access    Public
covidPostRouter.get("/getset", async (req, res) => {
  try {
    const { postSet } = req.body;
    const foundSet = await CovidPost.find().where("_id").in(postSet).exec();
    res.json(foundSet);
  } catch (error) {
    console.log(error);
  }
});

// @route     POST api/covid
// @desc      Create a post based on covid where they can ask for help
// @access    Private (implement auth later)
covidPostRouter.post("/", auth, async (req, res) => {
  const { title, content, owner, ownerId } = req.body;
  try {
    // Saving post in database
    const newCovidPost = new CovidPost({
      title,
      content,
      owner,
      ownerId
    });
    const registeredPost = await newCovidPost.save();
    console.log(registeredPost)

    User.updateOne({ _id: ownerId }, { $push: { covidPostsCreated: registeredPost._id } }).then(
      (data) => {
        console.log(data);
      }
    );

    res.json({
      registeredPost,
      msg: "Saved covid post in user profile"
    });
  } catch (error) {
    console.log(error);
  }
});

// @route     delete api/covid/:id
// @desc      Delete a post
// @access    Private (implement auth later)
covidPostRouter.delete("/:id", auth, async (req, res) => {
  try {
    const { reqOwner, reqOwnerId, postId } = req.body;

    const foundPost = await CovidPost.findById(postId);

    // Check if user is the one who created post
    if (reqOwner !== foundPost.owner) {
      res.json({ msg: "You do not have access to delete this post." });
    } else {
      
      // Delete made post in user profile
      console.log(foundPost, reqOwnerId)
      User.updateOne({ _id: reqOwnerId }, { $pull: { covidPostsCreated: foundPost._id } }).then(
        (data) => {
          console.log(data);
          const response = foundPost.remove();
          res.json({ success: true, msg: "Succesfully deleted post" })
        }
      );
    }
  } catch (error) {
    console.log(error)
    res.status(404).json({ success: false });
  }
});

export default covidPostRouter;
