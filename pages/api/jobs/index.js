import dbConnect from "../../../db/connect";
import Job from "../../../db/models/Job";

export default async function handler(request, response) {
  await dbConnect();

  const user_id = "64f0c5a8b979a78d64d3b750";

  if (request.method === "GET") {
    try {
      const jobs = await Job.find({ user_id })
        .populate("mustHaveSkills")
        .populate("niceToHaveSkills");

      return response.status(200).json(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  } else if (request.method === "POST") {
    try {
      const jobData = request.body;
      jobData.user_id = user_id;
      const job = new Job(jobData);
      await job.save();
      return response.status(201).json({ message: "Job created successfully" });
    } catch (error) {
      console.error("Error creating job:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return response.status(405).json({ message: "Method Not Allowed" });
  }
}
