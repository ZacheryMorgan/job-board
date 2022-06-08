import { getJob } from "lib/data";
import prisma from "lib/prisma";
import Link from "next/link";

const Job = ({ job }) => {
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
  const id = await context.params.id;
  let job = await getJob(prisma, id);

  job = JSON.parse(JSON.stringify(job));

  return {
    props: {
      job,
    },
  };
}
