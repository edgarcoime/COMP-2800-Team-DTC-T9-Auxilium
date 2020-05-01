import mongoose, { Schema } from "mongoose";

// Create Schema  
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  content: {
    type: String,
  }
}, { timestamps: true });

const Post = mongoose.model("post", PostSchema);
export default Post;