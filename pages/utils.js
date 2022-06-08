const Utils = () => {
  return (
    <div>
      <button
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
