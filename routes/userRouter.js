import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Item model to find data in DB
import User from "../models/User.model";

const userRouter = express.Router();

// @route     POST api/users
// @desc      Register a new User
// @access    Public (implement auth later)
userRouter.post("/", async (req, res) => {
  try {
    const { name, email, password, firstName, lastName, confirmPassword } = req.body;
  
    // Simple validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" })
    };
  
    // Check existing user with given email
    const foundUserEmail = await User.findOne({ email });
    if (foundUserEmail) { return res.status(400).json({ msg: "User with that email already exists" })}
  
    // Check existing user with given username
    const foundUserUserName = await User.findOne({ name });
    if (foundUserUserName) { return res.status(400).json({ msg: "User with that username already exists" })}
  
    // Check to see if passwords are the same
    if (confirmPassword !== password) { return res.status(400).json({ msg: "Both Passwords must match" })}
  
    // If user doesn't exist
    const newUser = new User({
      name,
      username: name,
      email, 
      password,
      firstName,
      lastName,
    });
  
    // create Salt and hash for user password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
          .then(user => {
            // JWT sign in 
            jwt.sign(
              { id: user.id },
              process.env.JWT_SECRET,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                // This is where we generate a token for the user
                res.json({
                  token, // <-- Json Web Token
                  user: {
                    userId: user.id,
                    name: user.name,
                    email: user.email
                  }
                });
              }
            )
          }).catch(error => console.log(error));
      });
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({ msg: "unexpected error", error })
  }
});

export default userRouter;
