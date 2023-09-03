import dbConnect from "@/db/connect";
import Interview from "@/db/models/Interview";

export default async function handler(request, response) {
  await dbConnect();
  const { id: userId } = request.query;
  if (request.method === "GET") {
    try {
      const userInterviews = await Interview.find({
        userId: userId,
      })
        .populate({
          path: "category",
          select: "-questions", // Exclude the questions field
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
    const { id } = request.query;
    const interviewData = request.body;
    try {
      const updatedInterview = await Interview.findByIdAndUpdate(
        id,
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
    const { id } = request.query;
    await Interview.findByIdAndDelete(id);
    response.status(200).json({ message: "Interview successfully deleted." });
  } else {
    response.status(405).json({ error: "Method Not Allowed" });
  }
}
