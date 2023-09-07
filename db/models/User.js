import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  userCoverImagePath: { type: String, required: true },
  userProfileImagePath: { type: String, required: true },
  email: { type: String, required: true },
  githubId: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
