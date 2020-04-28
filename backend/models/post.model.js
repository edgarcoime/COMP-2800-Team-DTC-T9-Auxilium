import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  likes: {
    type: Number
  },
  comments: {
    type: Array,
  }
}, {
  timestamps: true
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;