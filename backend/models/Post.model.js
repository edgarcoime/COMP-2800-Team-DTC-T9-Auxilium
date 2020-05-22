import mongoose, { Schema } from "mongoose";

// Create subdocument schema : comment
const commentSchema = new Schema({
  text: {
    type: String,
  },
  owner: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  }
}, { timestamps: true });


// Create regular post Schema
const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    comments: { type: [commentSchema], default: [] },
    likes:{
    type:Array,
    default: []
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", PostSchema);
export default Post;
