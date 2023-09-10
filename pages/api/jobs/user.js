import dbConnect from "@/db/connect";
import Job from "@/db/models/Job";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

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
        .populate("niceToHaveSkills")
        .populate("user_id", "userProfileImagePath");

      response.status(200).json(userJobs);
    } catch (error) {
      response
        .status(500)
        .json({ error: "Internal server error while fetching jobs." });
    }
  } else {
    return response.status(405).end("Method Not Allowed");
  }
}
