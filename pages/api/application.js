import prisma from "lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(501).end();
  }

  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: "Not logged in" });

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      Application: true,
    },
  });

  if (!user) return res.status(401).json({ message: "User not found" });

  if (req.method === "POST") {
    if (!req.body.coverletter)
      return res
        .status(400)
        .json({ message: "Required parameter coverletter missing" });

    if (!req.body.job)
      return res
        .status(400)
        .json({ message: "Required parameter job missing" });

    if (
      user.Application.find((application) => application.jobId === req.body.job)
    ) {
      return res.status(401).json({ message: "User already applied" });
    }

    const job = await prisma.job.findUnique({
      where: {
        id: req.body.job,
      },
    });

    if (!job.published)
      return res.status(401).json({ message: "Job is unpublished" });

    await prisma.application.create({
      data: {
        coverLetter: req.body.coverletter,
        job: {
          connect: { id: req.body.job },
        },
        author: {
          connect: { id: session.user.id },
        },
      },
    });

    res.status(200).end();
    return;
  }
}
