import dbConnect from "../../../db/connect";
import Interview from "@/db/models/Interview";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      // userId is in request.body
      const interviewData = request.body;
      const interview = new Interview(interviewData);
      await interview.save();
      return response
        .status(201)
        .json({ message: "Interview successfully created" });
    } catch (error) {
      console.error(error);
      return response
        .status(400)
        .json({ error: "Failed to create interview", message: error.message });
    }
  }
}
