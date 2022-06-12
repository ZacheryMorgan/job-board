import { useRouter } from "next/router";
import { useState } from "react";
import { getJob } from "lib/data";
import prisma from "lib/prisma";

import { useSession } from "next-auth/react";

const Edit = ({ job }) => {
  const router = useRouter();
  const [title, setTitle] = useState(job.title || "");
  const [description, setDescription] = useState(job.description || "");
  const [salary, setSalary] = useState(job.salary || "");
  const [location, setLocation] = useState(job.location || "");
  const [published, setPublished] = useState(job.published);

  const { data: session } = useSession();

  if (!session) return null;

  if (session.user.id !== job.authorId) {
    router.push("/");
    return (
      <h1 className="mt-20 text-center text-3xl font-bold">
        You are not the owner of this job listing. <br />
        Returning back to homepage
      </h1>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/edit", {
      body: JSON.stringify({
        title,
        description,
        salary,
        location,
        published,
        id: job.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto flex w-1/2 flex-col">
        <h2 className="mt-10 mb-10 text-4xl font-bold">Edit job</h2>
        <div className=" mt-2 mr-1 pt-2">
          <input
            className="color-primary w-full border bg-transparent p-4 text-lg font-medium outline-none "
            placeholder="Job title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className=" mt-2 mr-1 pt-2 ">
          <textarea
            className="color-primary w-full border bg-transparent p-4 text-lg font-medium outline-none "
            rows={2}
            cols={50}
            placeholder="Job description"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className=" mt-2 mr-1 pt-2">
          <input
            className="color-primary w-full border bg-transparent p-4 text-lg font-medium outline-none "
            placeholder="Salary"
            required
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div className=" mt-2 mr-1 pt-2">
          <input
            className="color-primary w-full border bg-transparent p-4 text-lg font-medium outline-none "
            placeholder="Location"
            required
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
        </div>
        <div className=" mt-2 mr-1 pt-2">
          <label>Published?</label>
          <input
            type="checkbox"
            name="published"
            onChange={(e) => {
              setPublished(e.target.checked);
            }}
            value={published}
          />
        </div>
        <div className="mt-5">
          <button className="float-right mt-0 rounded-full border px-8  py-2 font-bold">
            Submit edit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Edit;

export async function getServerSideProps(context) {
  const id = parseInt(context.params.id);

  let job = await getJob(prisma, id);
  job = JSON.parse(JSON.stringify(job));

  return {
    props: {
      job,
    },
  };
}
