import mongoose from "mongoose";
import "./User";
import "./Categoy";
import "./Question";
const { Schema } = mongoose;

const interviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // Other fields in the interview schema
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  answer: {
    type: String,
    required: true,
    maxLength: 1000,
  },
});

const Interview =
  mongoose.models.Interview || mongoose.model("Interview", interviewSchema);

export default Interview;
