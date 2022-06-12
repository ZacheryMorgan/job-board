import { useState } from "react";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";

import { getJob, alreadyApplied } from "lib/data";
import prisma from "lib/prisma";

export default function Apply({ job, applied }) {
  const [coverletter, setCoverletter] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null;

  if (!job.published) router.push("/");

  if (applied) router.push("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/application", {
      body: JSON.stringify({
        coverletter,
        job: job.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto flex w-1/2 flex-col">
        <div className="mt-10">
          <div className="m-4 p-4 text-center">
            <Link href={`/job/${job.id}`}>
              <a href="" className="mb-10 text-sm font-bold underline">
                back
              </a>
            </Link>
          </div>
          <div className="m-4 p-4 text-center">
            <h2 className="mb-10 text-4xl font-bold">
              Apply to the job: <br /> {job.title}
            </h2>
          </div>

          <div className="mb-4 mt-20">
            <div className="-mt-6 pl-16 pr-16">
              <p className="mt-3 text-base font-normal">{job.description}</p>
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
        <div className=" mt-2 mr-1 pt-2 ">
          <textarea
            className="color-primary w-full border bg-transparent p-4 text-lg font-medium outline-none "
            rows={6}
            cols={50}
            placeholder="Cover letter"
            required
            onChange={(e) => setCoverletter(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <button className="float-right mt-0 rounded-full border px-8  py-2 font-bold">
            Apply to this job
          </button>
        </div>
      </div>
    </form>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let job = await getJob(prisma, context.params.id);
  job = JSON.parse(JSON.stringify(job));

  const applied = await alreadyApplied(
    prisma,
    session.user.id,
    context.params.id
  );

  return {
    props: {
      job,
      applied,
    },
  };
}
