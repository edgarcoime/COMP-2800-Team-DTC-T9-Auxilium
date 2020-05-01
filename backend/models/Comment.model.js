import mongoose, { Schema } from "mongoose";

// Create Schema  
const commentSchema = new Schema({
  owner: {
    type: String,
    required: true
  },
  comment: {
    type: String,
  }
}, { timestamps: true });

const Comment = mongoose.model("comment", commentSchema);
export default Comment;