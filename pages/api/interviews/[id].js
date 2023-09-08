import dbConnect from "@/db/connect";
import Interview from "@/db/models/Interview";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  const { id: interviewId } = request.query;

  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  const sessionUserId = session.user.id;

  if (request.method === "GET") {
    try {
      const userInterviews = await Interview.find({
        userId: sessionUserId,
      })
        .populate({
          path: "category",
          select: "-questions",
        })
        .populate("question")
        .populate("answer");

      response.status(200).json(userInterviews);
    } catch (error) {
      response
        .status(500)
        .json({ error: "Internal server error while fetching interviews." });
    }
  } else if (request.method === "PUT") {
    const interviewData = request.body;

    try {
      const interview = await Interview.findById(interviewId);

      if (!interview) {
        return response.status(404).json({ error: "Interview not found." });
      }
      // https://www.mongodb.com/docs/manual/reference/method/ObjectId.toString/
      if (interview.userId.toString() !== sessionUserId) {
        return response
          .status(401)
          .json({ message: "Unauthorized, wrong user." });
      }
      const updatedInterview = await Interview.findByIdAndUpdate(
        interviewId,
        interviewData
      );
      if (!updatedInterview) {
        return response.status(404).json({ error: "Interview not found." });
      }
      return response
        .status(200)
        .json({ status: "Interview successfully updated." });
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Internal server error while updating interview." });
    }
  } else if (request.method === "DELETE") {
    try {
      const interview = await Interview.findById(interviewId);

      if (!interview) {
        return response.status(404).json({ error: "Interview not found." });
      }
      if (interview.userId.toString() !== sessionUserId) {
        return response
          .status(401)
          .json({ message: "Unauthorized, wrong user." });
      }

      // Delete the interview
      await Interview.findByIdAndDelete(interviewId);
      return response
        .status(200)
        .json({ message: "Interview successfully deleted." });
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Internal server error while deleting interview." });
    }
  }
}
