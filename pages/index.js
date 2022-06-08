import prisma from "lib/prisma";
import { getJobs } from "lib/data";
import Jobs from "components/Jobs";

const Home = ({ jobs }) => {
  return (
    <div className="mt-10">
      <div className="m-4 p-4 text-center">
        <h2 className="mb-10 text-4xl font-bold">Find a job!</h2>
        <Jobs jobs={jobs} />
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  let jobs = await getJobs(prisma);
  jobs = JSON.parse(JSON.stringify(jobs));

  return {
    props: {
      jobs,
    },
  };
}
