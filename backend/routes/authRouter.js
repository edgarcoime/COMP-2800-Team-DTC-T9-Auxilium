import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Item model to find data in DB
import User from "../models/User.model";

// Middleware
import auth from "../middleware/auth.middleware";

const userRouter = express.Router();

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

    // Validate password
    const isMatch = await bcrypt.compare(password, foundUser.password);
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
  // const foundUser = await User.findById(req.user.id).select("-password");
  // res.json(foundUser);
  // User.findById(req.user.id)
  //   .populate("postsCreated").exec((err, populatedUser) => {
  //     if (err) { console.log(err)}
  //     res.json(populatedUser)
  //   })
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