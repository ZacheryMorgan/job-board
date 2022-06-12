import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Setup = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [isCompany, setIsCompany] = useState(false);
  const isLoading = status === "loading";

  if (isLoading) return null;

  if (!session || !session.user) {
    router.push("/");
    return null;
  }

  if (!isLoading && session && session.user.name) {
    router.push("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/setup", {
      body: JSON.stringify({
        name,
        isCompany,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    session.user.name = name;
    session.user.company = isCompany;
    router.push("/");
  };

  return (
    <form className="mt-10 ml-20" onSubmit={handleSubmit}>
      <div className="mb-5 flex-1">
        <div className="mb-5 flex-1">Add your name</div>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-1 text-black"
        />
      </div>

      <div className="mb-5 flex-1">
        <div className="mb-5 flex-1">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Check this box if you're a company and you want to post jobs
        </div>
        <input
          type="checkbox"
          name="isCompany"
          checked={isCompany}
          onChange={(e) => setIsCompany(!isCompany)}
          className="border p-1"
        />
      </div>

      <button className="color-accent-contrast bg-color-accent hover:bg-color-accent-hover mt-0 mr-8 rounded-full border px-8 py-2 font-bold">
        Save
      </button>
    </form>
  );
};

export default Setup;
