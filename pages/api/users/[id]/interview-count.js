import dbConnect from "../../../../db/connect";
import Interview from "../../../../db/models/Interview";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const interviewsCount = await Interview.countDocuments({ userId: id });
      return response.status(200).json({ interviewsCount });
    } catch (error) {
      console.error("Error fetching interview count:", error);
      return response.status(500).json({ message: "Internal server error" });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
