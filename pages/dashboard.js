import { getSession, useSession } from "next-auth/react";
import prisma from "lib/prisma";
import { getAllCompanyJobs, getUser, getUserApplications } from "lib/data.js";
import Jobs from "components/Jobs";
import Link from "next/link";
import Job from "components/Job";

export default function Dashboard({ jobs, user, applications }) {
  const { data: session, status } = useSession();

  const jobsElements = jobs.map((job, index) => (
    <>
      <Job key={index} job={job} isDashboard={true} />
      <div className="mb-4 mt-20">
        <div className="-mt-6 pl-16 pr-16">
          {job.applications.length === 0 ? (
            <p className="mb-10 text-2xl font-normal">
              No applications so far 😞
            </p>
          ) : (
            <p className="mb-10 text-2xl font-normal">
              {job.applications.length} applications
            </p>
          )}

          {job.applications.map((application, index) => (
            <>
              <h2 className="mt-3 text-base font-normal">
                <span className="mt-3 mr-3 text-base font-bold">
                  {application.author.name}
                </span>
                {application.author.email}
              </h2>
              <p className="mt-2 mb-3 text-lg font-normal">
                {application.coverLetter}
              </p>
              <hr />
            </>
          ))}
        </div>
      </div>
    </>
  ));

  return (
    <div className="mt-10">
      <div className="m-4 p-4 text-center">
        <h2 className="mb-10 text-4xl font-bold">Dashboard</h2>
        {user.company && (
          <span className="bg-black p-2 text-sm uppercase text-white ">
            Company
          </span>
        )}
        {session && (
          <p className="mt-10 mb-10 text-2xl font-normal">
            {user.company ? "all the jobs you posted" : "your applications"}
          </p>
        )}
      </div>

      {user.company ? (
        <div>{jobsElements}</div>
      ) : (
        <>
          {applications.map((application, index) => {
            return (
              <div key={index} className="mb-4 mt-20 flex justify-center">
                <div className="-mt-6 w-1/2 pl-16 pr-16">
                  <Link href={`/job/${application.job.id}`}>
                    <a className="text-xl font-bold underline">
                      {application.job.title}
                    </a>
                  </Link>
                  <h2 className="mt-3 text-base font-normal">
                    {application.coverLetter}
                  </h2>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  let user = await getUser(prisma, session.user.id);
  user = JSON.parse(JSON.stringify(user));

  let jobs = [];
  let applications = [];

  if (user.company) {
    jobs = await getAllCompanyJobs(prisma, user.id);
    jobs = JSON.parse(JSON.stringify(jobs));
  } else {
    applications = await getUserApplications(prisma, user.id);
    applications = JSON.parse(JSON.stringify(applications));
  }

  return {
    props: {
      jobs,
      user,
      applications,
    },
  };
}
