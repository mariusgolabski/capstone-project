import dbConnect from "../../../db/connect";
import Interview from "@/db/models/Interview";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  const sessionUserId = session.user.id;

  if (request.method === "POST") {
    try {
      const interviewData = {
        ...request.body, // spread existing interview data
        userId: sessionUserId, // add sessionUserId
      };
      const interview = new Interview(interviewData);
      await interview.save();

      return response
        .status(201)
        .json({ message: "Interview successfully created" });
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Failed to create interview", message: error.message });
    }
  } else {
    return response.status(405)("Method Not Allowed");
  }
}
