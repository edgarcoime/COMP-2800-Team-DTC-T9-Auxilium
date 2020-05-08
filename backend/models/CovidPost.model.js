import mongoose, { Schema } from "mongoose";

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
    assignedTo: {
      type: Object
    },
  },
  { timestamps: true }
);

const CovidPost = mongoose.model("covidPost", CovidPostSchema);
export default CovidPost;
