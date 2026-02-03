import React from "react";
import Title from "../_components/title";
import MockInterviewDetails from "./_components/mock-interview-details";

const page = () => {
  return (
    <div className="container mt-5 mb-10 space-y-6">
      <Title />

      <div className="w-full h-[1px] bg-black"></div>

      <div>
        <MockInterviewDetails />
      </div>
    </div>
  );
};

export default page;
