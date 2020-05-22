import mongoose, { Schema } from "mongoose";

// Create User model Schema that will store posts created and accepted
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      unique: false,
    },
    lastName: {
      type: String,
      unique: false,
    },
    postsCreated: [
      {
        // References regular Post to populate later
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    covidPostsCreated: [
      {
        // References Covid post to populate later
        type: mongoose.Schema.Types.ObjectId,
        ref: "covidPost",
      },
    ],
    covidPostsAccepted: [
      {
        // References Covid post to populate later
        type: mongoose.Schema.Types.ObjectId,
        ref: "covidPost",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
export default User;
