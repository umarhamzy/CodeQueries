import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>Hello World {params.id}</h1>
    </div>
  );
};

export default page;
