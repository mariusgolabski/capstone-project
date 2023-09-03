import dbConnect from "../../../db/connect";
import Category from "../../../db/models/Categoy";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    try {
      const categories = await Category.find().populate("questions");
      response.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      response.status(500).json({ error: "Error fetching categories" });
    }
  } else {
    response.status(405).json({ error: "Method Not Allowed" });
  }
}
