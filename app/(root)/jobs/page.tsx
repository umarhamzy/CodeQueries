import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Jobs | CodeQueries",
};

const page = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Job Listings</h1>
    </div>
  );
};

export default page;
