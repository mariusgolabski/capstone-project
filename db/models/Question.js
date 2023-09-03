import mongoose from "mongoose";
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  name: { type: String, required: true },
});

const Question =
  mongoose.models.Question || mongoose.model("Question", QuestionSchema);

export default Question;
