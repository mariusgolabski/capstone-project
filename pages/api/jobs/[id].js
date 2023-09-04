import dbConnect from "@/db/connect";
import Job from "@/db/models/Job";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;
  const jobData = request.body;
  if (request.method === "PUT") {
    try {
      const updatedJob = await Job.findByIdAndUpdate(id, jobData);

      if (!updatedJob) {
        return response.status(404).json({ error: "Interview not found." });
      }
      return response.status(200).json({ message: "Job updated successfully" });
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  } else if (request.method === "DELETE") {
    await Job.findByIdAndDelete(id);
    response.status(200).json({ message: "Job successfully deleted." });
  } else {
    response.status(405).json({ error: "Method Not Allowed" });
  }
}
