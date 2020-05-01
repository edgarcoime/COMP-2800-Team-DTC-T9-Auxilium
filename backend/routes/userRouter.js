import express from "express";
import bcrypt from "bcryptjs"

// Item model to find data in DB
import User from "../models/User.model";

const userRouter = express.Router();

// @route     POST api/users
// @desc      Register a new User
// @access    Public (implement auth later)
userRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  // Simple validation (maybe implement Joi later)
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  };

  // Check existing user
  const foundUser = await User.findOne({ email });
  if (foundUser) { return res.status(400).json({ msg: "User already exists" })}

  // If user doesn't exist
  const newUser = new User({
    name,
    email, 
    password
  });

  // create Salt and hash for user password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save()
        .then(user => {
          // This is where we generate a token for the user
          res.json({
            user: {
              userId: user.id,
              name: user.name,
              email: user.email
            }
          });
        });
    });
  });
});

export default userRouter;
