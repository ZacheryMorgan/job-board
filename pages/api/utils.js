import prisma from "lib/prisma";
import { faker } from "@faker-js/faker";

const generateFakeJob = (user) => ({
  title: faker.name.jobTitle(),
  description: faker.lorem.paragraphs(),
  author: {
    connect: { id: user.id },
  },
});

const handler = async (req, res) => {
  if (req.method !== "POST") res.end();

  if (req.body.task === "clean_database") {
    await prisma.Application.deleteMany({});
    await prisma.job.deleteMany({});
    await prisma.user.deleteMany({
      where: {
        id: {
          not: "cl46768pc03353sv53ikrybts",
        },
      },
    });
  }

  if (req.body.task === "generate_one_job") {
    const users = await prisma.user.findMany({
      where: {
        company: true,
      },
    });

    await prisma.job.create({
      data: generateFakeJob(users[0]),
    });
  }

  if (req.body.task === "generate_users_and_jobs") {
    let count = 0;
    // Create 10 users
    while (count < 10) {
      await prisma.user.create({
        data: {
          name: faker.internet.userName().toLowerCase(),
          email: faker.internet.email().toLowerCase(),
          company: faker.datatype.boolean(),
        },
      });
      count++;
    }

    const users = await prisma.user.findMany({
      where: {
        company: true,
      },
    });

    users.forEach(async (user) => {
      await prisma.job.create({
        data: generateFakeJob(user),
      });
    });
  }
  res.end();
};

export default handler;

// faker.internet.userName()
// faker.internet.email()
// faker.datatype.boolean();
