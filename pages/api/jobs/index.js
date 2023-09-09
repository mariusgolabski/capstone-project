import dbConnect from "../../../db/connect";
import { getServerSession } from "next-auth/next";
import Job from "../../../db/models/Job";

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response);

  if (!session) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  if (request.method === "GET") {
    try {
      const jobs = await Job.find()
        .populate("mustHaveSkills")
        .populate("niceToHaveSkills")
        .populate("user_id", "_id userProfileImagePath");
      return response.status(200).json(jobs);
    } catch (error) {
      console.error("Error creating job:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  } else if (request.method === "POST") {
    try {
      // userId is in request.body
      const jobData = request.body;
      console.log(jobData);
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
