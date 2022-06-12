import { getSession } from "next-auth/react";
import prisma from "lib/prisma";

const handler = async (req, res) => {
  if (req.method !== "PUT")
    return res.status(401).json({ message: "Method not allowed" });

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });
  if (!session.user.name)
    return res.status(401).json({ message: "User not found" });

  const job = await prisma.job.findUnique({
    where: {
      id: req.body.id,
    },
  });

  if (session.user.id !== job.authorId) {
    return res.end(401).json({ message: "User is not the owner of tis job" });
  }

  if (req.method === "PUT") {
    const { title, description, salary, location, published, id } = req.body;

    await prisma.job.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        salary,
        location,
        published,
      },
    });

    return res.end();
  }
};

export default handler;
