import Job from "./Job";

const Jobs = ({ jobs }) => {
  if (!jobs) return null;

  const jobsElements = jobs.map((job, index) => <Job key={index} job={job} />);

  return <main>{jobsElements}</main>;
};

export default Jobs;
