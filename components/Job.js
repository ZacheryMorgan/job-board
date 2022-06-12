import Link from "next/link";
import { useRouter } from "next/router";

const Job = ({ job, isDashboard }) => {
  const router = useRouter();
  return (
    <div className="mx-auto mb-8 w-3/4 rounded-lg border-t border-slate-300 px-10 pt-6 pb-2 shadow-md shadow-slate-400">
      <Link href={`/job/${job.id}`}>
        <a href="" className="mb-3 text-2xl font-bold underline">
          {job.title}
        </a>
      </Link>
      <p className="mb-3">{job.description}</p>
      {isDashboard && job.published && (
        <span
          className="mr-5 cursor-pointer bg-black p-2 text-sm uppercase text-white"
          onClick={async (e) => {
            await fetch("/api/job", {
              body: JSON.stringify({
                id: job.id,
                published: false,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "PUT",
            });
            router.reload(window.location.pathname);
          }}
        >
          ✅ Published
        </span>
      )}
      {isDashboard && !job.published && (
        <span
          className="mr-5 cursor-pointer bg-black p-2 text-sm uppercase  text-white"
          onClick={async (e) => {
            await fetch("/api/job", {
              body: JSON.stringify({
                id: job.id,
                published: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "PUT",
            });
            router.reload(window.location.pathname);
          }}
        >
          ❌ Unpublished
        </span>
      )}
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
