import dbConnect from "../../../../db/connect";
import Job from "../../../../db/models/Job";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const jobsCount = await Job.countDocuments({ user_id: id });
      return response.status(200).json({ jobsCount });
    } catch (error) {
      console.error("Error fetching job count:", error);
      return response.status(500).json({ message: "Internal server error" });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
