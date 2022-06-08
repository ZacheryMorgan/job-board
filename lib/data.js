import prisma from "./prisma";

export async function getJobs(prisma) {
  const jobs = await prisma.job.findMany({
    where: {
      published: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  });
  return jobs;
}

export async function getJob(prisma, id) {
  const job = await prisma.job.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true,
    },
  });

  return job;
}

export async function getCompany(prisma, company_id) {
  const company = await prisma.user.findUnique({
    where: {
      id: company_id,
    },
  });

  return company;
}

export async function getCompanyJobs(prisma, company_id) {
  const companyJobs = await prisma.job.findMany({
    where: {
      authorId: company_id,
      published: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
    },
  });

  return companyJobs;
}
