import { getJob, getUser, alreadyApplied } from "lib/data";
import prisma from "lib/prisma";
import Link from "next/link";

import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const Job = ({ job, user, applied }) => {
  return (
    <div className="mx-auto flex w-1/2 flex-col">
      <div className="m-4 p-4 text-center">
        <Link href={`/`}>
          <a href="" className="mb-10 text-sm font-bold underline">
            back
          </a>
        </Link>
      </div>
      <div className="m-4 p-4 text-center">
        <h2 className="mb-10 text-4xl font-bold">{job.title}</h2>
      </div>

      <div className="mb-4 mt-20">
        <div className="-mt-6 pl-16 pr-16">
          <p className="mt-3 text-base font-normal">{job.description}</p>
          <p>Salary: ${job.salary}</p>
          <p>Location: {job.location}</p>
          {user.company ? (
            <>
              {user.id === job.authorId ? (
                <div className="mt-20 flex justify-center ">
                  <Link href={`/job/${job.id}/edit`}>
                    <button className=" mt-0  rounded-full border bg-black  px-8 py-2 font-bold text-white ">
                      Edit job listing
                    </button>
                  </Link>
                  <p></p>
                </div>
              ) : null}
            </>
          ) : (
            <>
              {applied ? (
                <div className="mt-20 flex justify-center ">
                  <Link href={`/dashboard`}>
                    <button className=" mt-0  rounded-full border bg-black  px-8 py-2 font-bold text-white ">
                      You already applied!
                    </button>
                  </Link>
                  <p></p>
                </div>
              ) : (
                <div className="mt-20 flex justify-center ">
                  {job.published ? (
                    <Link href={`/job/${job.id}/apply`}>
                      <button className=" mt-0  rounded-full border bg-black  px-8 py-2 font-bold text-white ">
                        Apply to this job
                      </button>
                    </Link>
                  ) : (
                    <div className="flex flex-col text-center">
                      <span className="py-2 font-bold">Job is unpublished</span>
                      <Link href={`/`}>
                        <button className=" mt-0  rounded-full border bg-black  px-8 py-2 font-bold text-white ">
                          Return home
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          <div className="mt-4">
            <h4 className="inline">Posted by</h4>
            <div className="inline">
              <div className="ml-3 -mt-6 inline">
                <span>
                  <Link href={`/company/${job.author.id}`}>
                    <a>
                      <span className="color-primary text-base font-medium underline">
                        {job.author.name}
                      </span>
                    </a>
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const id = await context.params.id;
  let job = await getJob(prisma, id);
  job = JSON.parse(JSON.stringify(job));

  let user = await getUser(prisma, session.user.id);
  user = JSON.parse(JSON.stringify(user));

  let applied = await alreadyApplied(prisma, session.user.id, job.id);

  return {
    props: {
      job,
      user,
      applied,
    },
  };
}
