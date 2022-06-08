import Link from "next/link";

const Job = ({ job }) => {
  return (
    <div className="mx-auto mb-8 w-3/4 rounded-lg border-t border-slate-300 px-10 pt-6 pb-2 shadow-md shadow-slate-400">
      <Link href={`/job/${job.id}`}>
        <a href="" className="mb-3 text-2xl font-bold underline">
          {job.title}
        </a>
      </Link>
      <p className="mb-3">{job.description}</p>
      <Link href={`/company/${job.authorId}`}>
        <a href="">
          <span className="text-gray-600">
            posted by:{" "}
            <span className="hover:text-slate-900 hover:underline">
              {job.author.name}
            </span>
          </span>
        </a>
      </Link>
    </div>
  );
};

export default Job;
