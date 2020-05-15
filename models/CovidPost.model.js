import mongoose, { Schema } from "mongoose";

// Create chridren schema : comment
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

// Create Schema
const CovidPostSchema = new Schema(
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
    assignedTo: {
      type:mongoose.Schema.Types.ObjectId, 
      ref: 'user',
    },
  },
  { timestamps: true }
);

const CovidPost = mongoose.model("covidPost", CovidPostSchema);
export default CovidPost;
