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
    const response = await CovidPost.find().sort({ createdAt: -1 });
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
    const foundCovidPost = await CovidPost.findById(covidPostId);
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
      ownerId,
    });
    const registeredPost = await newCovidPost.save();
    console.log(registeredPost);

    User.updateOne(
      { _id: ownerId },
      { $push: { covidPostsCreated: registeredPost._id } }
    ).then((data) => {
      console.log(data);
    });

    res.json({
      registeredPost,
      msg: "Saved covid post in user profile",
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
      console.log(foundPost, reqOwnerId);
      User.updateOne(
        { _id: reqOwnerId },
        { $pull: { covidPostsCreated: foundPost._id } }
      ).then((data) => {
        console.log(data);
        const response = foundPost.remove();
        res.json({ success: true, msg: "Succesfully deleted post" });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false });
  }
});

// @route     POST api/covid/acceptrequest
// @desc      POST by accepting a COVID request
// @access    Private (implement auth later)
covidPostRouter.post("/acceptrequest", async (req, res) => {
  try {
    const { reqOwner, reqOwnerId, covidPostId } = req.body;

    // assign user to covid post
    const response = await CovidPost.updateOne(
      { _id: covidPostId },
      { $set: { assignedTo: reqOwnerId } }
    );
    console.log(response);

    // assign covid post to user
    const userResponse = await User.updateOne(
      { _id: reqOwnerId },
      { $push: { covidPostsAccepted: covidPostId } }
    );
    console.log(userResponse)
    res.json({ success: true, msg: "Succesfully registed post to user" })
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Could not accept request", error });
  }
});

// @route     POST api/covid/deleterequest
// @desc      POST by deleting a covidpost from user profile and from Covid Post
// @access    Private (implement auth later)
covidPostRouter.post("/deleterequest", async (req, res) => {
  try {
    const { reqOwner, reqOwnerId, covidPostId } = req.body;

    // Delete user Assigned to covid Post
    const foundPost = await CovidPost.findById(covidPostId);
    foundPost.assignedTo = undefined;
    const response = await foundPost.save();
    console.log(response)

    // Delete post in user profile
    const userResponse = await User.updateOne(
      { _id: reqOwnerId },
      { $pull: { covidPostsAccepted: covidPostId } }
    );
    console.log(userResponse)
    res.json({ success: true, msg: "Succesfully assigned post from user Profile" })
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Could not delete post from user Profile", error }) 
  }
})

export default covidPostRouter;
