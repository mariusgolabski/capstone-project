import mongoose from "mongoose";

const { Schema } = mongoose;

const skillSchema = new Schema({
  label: { type: String, required: true },
});

const Skill = mongoose.models.Skill || mongoose.model("Skill", skillSchema);

export default Skill;
