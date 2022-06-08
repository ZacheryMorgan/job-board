import Job from "components/Job";
import Link from "next/link";
import prisma from "lib/prisma";
import { getCompany, getCompanyJobs } from "lib/data";

const Company = ({ company, companyJobs }) => {
  const companyJobsElements = companyJobs.map((job, index) => (
    <Job key={index} job={job} />
  ));

  return (
    <div className="mt-10">
      <div className="m-4 p-4 text-center">
        <Link href={`/`}>
          <a href="" className="mb-10 text-sm font-bold underline">
            back
          </a>
        </Link>
      </div>
      <div className="m-4 p-4 text-center">
        <h2 className="mb-10 text-4xl font-bold">Profile of {company.name}</h2>
      </div>

      <div className="mb-4 mt-20">
        <div className="-mt-6 pl-16 pr-16">
          <p className="text-center text-xl font-bold">Company jobs</p>
          {companyJobsElements}
        </div>
      </div>
    </div>
  );
};

export default Company;

export async function getServerSideProps(context) {
  let company = await getCompany(prisma, context.params.id);
  let companyJobs = await getCompanyJobs(prisma, context.params.id);
  company = JSON.parse(JSON.stringify(company));
  companyJobs = JSON.parse(JSON.stringify(companyJobs));

  return {
    props: {
      company,
      companyJobs,
    },
  };
}
