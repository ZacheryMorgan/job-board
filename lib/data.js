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

export async function getUser(prisma, userId) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
}

export async function getAllCompanyJobs(prisma, userId) {
  const jobs = await prisma.job.findMany({
    where: {
      authorId: userId,
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

  await Promise.all(
    jobs.map(
      async (job) => (job.applications = await getJobApplications(prisma, job))
    )
  );
  return jobs;
}

export async function getUserApplications(prisma, userId) {
  const applications = await prisma.application.findMany({
    where: {
      authorId: userId,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      author: true,
      job: true,
    },
  });
  return applications;
}

export async function alreadyApplied(prisma, userId, jobId) {
  const applications = await prisma.application.findMany({
    where: {
      authorId: userId,
      jobId: parseInt(jobId),
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

  return applications.length > 0 ? true : false;
}

async function getJobApplications(prisma, job) {
  const jobApplications = await prisma.application.findMany({
    where: {
      jobId: job.id,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: { author: true },
  });

  return jobApplications;
}
