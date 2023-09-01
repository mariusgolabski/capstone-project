import dbConnect from "@/db/connect";
import User from "../../../db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const users = await User.find();
      return response.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return response.status(500).json({ message: "Internal server error" });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
