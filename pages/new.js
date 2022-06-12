import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const New = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");

  const { data: session } = useSession();

  if (!session || !session.user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/job", {
      body: JSON.stringify({
        title,
        description,
        salary,
        location,
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
        <h2 className="mt-10 mb-10 text-4xl font-bold">Post a new job!</h2>
        <div className=" mt-2 mr-1 pt-2">
          <input
            className="color-primary w-full border bg-transparent p-4 text-lg font-medium outline-none "
            placeholder="Job title"
            required
            onChange={(e) => setTitle(e.target.value)}
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
          />
        </div>
        <div className=" mt-2 mr-1 pt-2">
          <input
            className="color-primary w-full border bg-transparent p-4 text-lg font-medium outline-none "
            placeholder="Salary"
            required
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div className=" mt-2 mr-1 pt-2">
          <input
            className="color-primary w-full border bg-transparent p-4 text-lg font-medium outline-none "
            placeholder="Location"
            required
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <button className="float-right mt-0 rounded-full border px-8  py-2 font-bold">
            Post job
          </button>
        </div>
      </div>
    </form>
  );
};

export default New;
