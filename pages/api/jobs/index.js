import dbConnect from "../../../db/connect";
import Job from "../../../db/models/Job";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
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
