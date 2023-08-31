import mongoose from "mongoose";
const { Schema } = mongoose;

mongoose.set("debug", true);

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    userCoverImagePath: { type: String, required: true },
    userProfileImagePath: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    collection: "users",
  }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
