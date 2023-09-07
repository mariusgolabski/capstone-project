import dbConnect from "@/db/connect";
import Job from "@/db/models/Job";

export default async function handler(request, response) {
  await dbConnect();
  const { id: user_id } = request.query;
  const jobData = request.body;

  if (request.method === "GET") {
    try {
      const userJobs = await Job.find({
        user_id: user_id,
      })
        .populate("mustHaveSkills")
        .populate("niceToHaveSkills");

      response.status(200).json(userJobs);
    } catch (error) {
      response
        .status(500)
        .json({ error: "Internal server error while fetching jobs." });
    }
  } else if (request.method === "PUT") {
    const { id } = request.query;

    try {
      const updatedJob = await Job.findByIdAndUpdate(id, jobData);

      if (!updatedJob) {
        return response.status(404).json({ error: "Job not found." });
      }
      return response.status(200).json({ message: "Job updated successfully" });
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  } else if (request.method === "DELETE") {
    const { id } = request.query;
    await Job.findByIdAndDelete(id);
    response.status(200).json({ message: "Job successfully deleted." });
  } else {
    response.status(405).json({ error: "Method Not Allowed" });
  }
}
