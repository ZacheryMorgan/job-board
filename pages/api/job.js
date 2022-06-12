import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const { title, description, salary, location } = req.body;

  if (req.method !== "POST" && req.method !== "PUT") return res.end();
  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return res.status(401).json({ message: "User not found" });

  if (req.method === "PUT") {
    const job = await prisma.job.findUnique({
      where: {
        id: parseInt(req.body.id),
      },
    });

    if (job.authorId !== session.user.id) {
      res.status(401).json({ message: "Not authorized to edit" });
    }

    if (!user.company) return res.end();
    console.log(user, req.body);

    await prisma.job.update({
      where: {
        id: req.body.id,
      },
      data: {
        published: req.body.published,
      },
    });

    return res.end();
  }

  if (req.method === "POST") {
    if (!title)
      return res
        .status(400)
        .json({ message: "Required parameter TITLE missing" });
    if (!description)
      return res
        .status(400)
        .json({ message: "Required parameter DESCRIPTION missing" });
    if (!salary)
      return res
        .status(400)
        .json({ message: "Required parameter SALARY missing" });
    if (!location)
      return res
        .status(400)
        .json({ message: "Required parameter LOCATION missing" });

    await prisma.job.create({
      data: {
        title,
        description,
        salary,
        location,
        author: { connect: { id: user.id } },
      },
    });

    return res.status(200).end();
  }
};

export default handler;
