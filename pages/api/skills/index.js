import dbConnect from "../../../db/connect";
import Skill from "@/db/models/Skill";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const skills = await Skill.find();

    return response.status(200).json(skills);
  }
}
