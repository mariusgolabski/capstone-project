import dbConnect from "@/db/connect";
import Job from "@/db/models/Job";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  const jobData = request.body;
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  const sessionUserId = session.user.id;

  if (request.method === "GET") {
    try {
      const userJobs = await Job.find({
        user_id: sessionUserId,
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
    const { id: _id } = request.query;
    try {
      const job = await Job.findById(_id);

      if (!job) {
        return response.status(404).json({ error: "Job not found." });
      }

      if (job.user_id.toString() !== sessionUserId) {
        return response
          .status(401)
          .json({ message: "Unauthorized, wrong user." });
      }

      const updatedJob = await Job.findByIdAndUpdate(_id, jobData);

      if (!updatedJob) {
        return response.status(404).json({ error: "Job not found." });
      }
      return response.status(200).json({ message: "Job updated successfully" });
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  } else if (request.method === "DELETE") {
    const { id: _id } = request.query;

    try {
      const job = await Job.findById(_id);

      if (!job) {
        return response.status(404).json({ error: "Job not found" });
      }
      if (job.user_id.toString() !== sessionUserId) {
        return response
          .status(401)
          .json({ message: "Unauthorized, wrong user." });
      }
      await Job.findByIdAndDelete(_id);
      return response
        .status(200)
        .json({ message: "Job successfully deleted." });
    } catch (error) {
      return response
        .status(500)
        .json({ error: "internal server error while deleting job." });
    }
  } else {
    return response.status(405).end("Method Not Allowed");
  }
}
