import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Utils = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) return null;
  // if (session.user.id !== "cl46768pc03353sv53ikrybts") {
  //   router.push("/");
  //   return (
  //     <h1 className="mt-32 text-center text-3xl font-bold">
  //       You are not the owner of this website, go away
  //     </h1>
  //   );
  // }
  return (
    <div className="mx-auto mb-5 mt-32 flex w-1/2 flex-col">
      <button
        className="mt-5 rounded-full border border-black bg-black px-8 py-2 font-bold text-white "
        onClick={async () => {
          await fetch("/api/utils", {
            body: JSON.stringify({
              task: "clean_database",
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          });
        }}
      >
        Wipe database
      </button>
      <button
        className="mt-5 rounded-full border border-black bg-black px-8 py-2 font-bold text-white "
        onClick={async () => {
          await fetch("/api/utils", {
            body: JSON.stringify({
              task: "generate_users_and_jobs",
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          });
        }}
      >
        Generate users & jobs
      </button>
      <button
        className="mt-5 rounded-full border border-black bg-black px-8 py-2 font-bold text-white "
        onClick={async () => {
          await fetch("/api/utils", {
            body: JSON.stringify({
              task: "generate_one_job",
            }),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          });
        }}
      >
        Generate 1 new job
      </button>
    </div>
  );
};

export default Utils;
