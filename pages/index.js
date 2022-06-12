import prisma from "lib/prisma";
import { getJobs, getUser } from "lib/data";
import Jobs from "components/Jobs";

import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Home = ({ jobs, user }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <Link href={`api/auth/signin`}>
        <button className="mt-5 rounded-full border border-black bg-black px-8 py-2 font-bold text-white ">
          Sign up now
        </button>
      </Link>
    );
  }

  if ((session && !session.user.name) || !user.name) {
    router.push("/setup");
  }

  return (
    <div>
      {session && (
        <>
          <p className="mb-10 text-2xl font-normal">
            Welcome, {user.name}
            {user.company && (
              <span className="ml-3 bg-black p-2 text-sm uppercase text-white">
                Company
              </span>
            )}
          </p>
          {user.company ? (
            <div className="mb-5 flex justify-center">
              <Link href={`/new`}>
                <button className="mt-5 rounded-full border border-black bg-black px-8 py-2 font-bold text-white ">
                  click here to post a new job
                </button>
              </Link>
              <Link href={`/dashboard`}>
                <button className="ml-5 mt-5 rounded-full border border-black bg-black px-8 py-2 font-bold text-white ">
                  see all the jobs you posted
                </button>
              </Link>
            </div>
          ) : (
            <div className="mb-5 flex justify-center">
              <Link href={`/dashboard`}>
                <button className="ml-5 mt-5 rounded-full border border-black bg-black px-8 py-2 font-bold text-white ">
                  see all the jobs you applied to
                </button>
              </Link>
            </div>
          )}
        </>
      )}
      <Jobs jobs={jobs} />
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  let jobs = await getJobs(prisma);
  jobs = JSON.parse(JSON.stringify(jobs));

  if (!session) {
    return {
      props: { jobs },
    };
  }

  let user = await getUser(prisma, session.user.id);
  user = JSON.parse(JSON.stringify(user));

  return {
    props: {
      jobs,
      user,
    },
  };
}
