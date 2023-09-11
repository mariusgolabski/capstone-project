import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/User";
import Interview from "../../../../db/models/Interview";
import Job from "../../../../db/models/Job";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  if (request.method === "GET") {
    const user = await User.findById(id);
    if (!user) {
      return response.status(404).json({ status: "Not Found" });
    }

    const interviews = await Interview.find({ userId: user._id })
      .populate("category")
      .populate("question");

    const jobs = await Job.find({ user_id: user._id })
      .populate("mustHaveSkills")
      .populate("niceToHaveSkills");

    const userData = {
      user,
      interviews,
      jobs,
    };

    return response.status(200).json({ data: userData });
  }
}
