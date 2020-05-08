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
  const { name, email, password, firstName, lastName, userType } = req.body;

  // Check existing user
  const foundUser = await User.findOne({ email });
  if (!foundUser) { return res.status(400).json({ msg: "User does not exist" })}

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
          email: foundUser.email
        }
      });
    }
  )
});


// @route     get api/auth/user
// @desc      Get user data based on token data
// @access    Private (implement auth later)
userRouter.get("/user", auth, async (req, res) => {
  const foundUser = await User.findById(req.user.id).select("-password");
  res.json(foundUser);
})

export default userRouter;