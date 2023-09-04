import mongoose from "mongoose";
import "./Skill";
import "./User";

const { Schema } = mongoose;

const jobSchema = new Schema({
  companyName: { type: String },
  jobTitle: { type: String },
  seniorityLevel: { type: String },
  employmentType: { type: String },
  location: { type: String },
  location: { type: String },
  annualSalaryRange: { type: Array },
  howToApply: { type: String },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  mustHaveSkills: [
    { type: Schema.Types.ObjectId, ref: "Skill", required: true },
  ],
  niceToHaveSkills: [
    { type: Schema.Types.ObjectId, ref: "Skill", required: true },
  ],
});

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default Job;
