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
  },
  lastName: {
    type: String,
  },
  userType: {
    type: Number, // 0=RegularUser, 1=Volunteer, 2=InNeedOfHelp
  }
}, { timestamps: true });

const User = mongoose.model("user", UserSchema);
export default User;