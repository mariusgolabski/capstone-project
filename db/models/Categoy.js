import mongoose from "mongoose";
import "./Question";
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  questions: { type: [Schema.Types.ObjectId], ref: "Question" },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
