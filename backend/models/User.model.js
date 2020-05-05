import mongoose, { Schema } from "mongoose";

// Create Schema  
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userType: {
    type: Number, // 0=RegularUser, 1=Volunteer, 2=InNeedOfHelp
    required: true
  }
}, { timestamps: true });

const User = mongoose.model("user", UserSchema);
export default User;