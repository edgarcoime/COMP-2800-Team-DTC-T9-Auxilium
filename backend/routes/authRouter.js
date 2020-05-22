import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Item model to find data in DB
import User from "../models/User.model";

// Middleware
import auth from "../middleware/auth.middleware";

const userRouter = express.Router();

// <===================================================================================================================>
// Creates a user and signs a token using JWT which initializes logging the user in
// I found this code through a post in StackOverflow which led me to the GithubRepo of Brad's project

// This has been vastly modified for our use case since we are using posts and mongoose population
// of references

// @author   Brad Traversy from https://traversymedia.com/
// @see      https://github.com/bradtraversy/mern_shopping_list
// <===================================================================================================================>


// @route     POST api/auth
// @desc      Authenticate the user by signing in to account
// @access    Public (implement auth later)
userRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
  
    // Check existing user
    // const foundUser = await User.findOne({ email });
    // if (!foundUser) { return res.status(400).json({ msg: "User does not exist" })}
    const foundUser = await User.findOne({ email })
    .populate("postsCreated")
    .populate("covidPostsCreated")
    .populate("covidPostsAccepted")

    console.log(foundUser)

    // Return error if user is not found
    if (!foundUser) return res.status(400).json({ msg: "There is no user found with that email." })

    // Validate password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    // If passwords do not match send an error as a response
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
  
    // If passwords do match
    jwt.sign(
      { id: foundUser.id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        // This is where we generate a token for the user
        res.json({
          token, // <-- Json Web Token
          user: {
            userId: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            postsCreated: foundUser.postsCreated,
            covidPostsCreated: foundUser.covidPostsCreated,
            covidPostsAccepted: foundUser.covidPostsAccepted,
          }
        });
      }
    )
  } catch (error) {
    console.log(error)
  }
});


// @route     get api/auth/user
// @desc      Get user data based on token data
// @access    Private (implement auth later)
userRouter.get("/user", auth, async (req, res) => {
  try {
    const populatedUser = await User.findById(req.user.id)
      .populate("postsCreated")
      .populate("covidPostsCreated")
      .populate("covidPostsAccepted")
      .select("-password")
    res.json(populatedUser)
  } catch (error) {
    console.log(error)
  }
})

export default userRouter;