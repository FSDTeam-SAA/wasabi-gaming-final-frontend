"use client";
import { useParams } from "next/navigation";
import React from "react";

const MockInterviewDetails = () => {
  const { id } = useParams();


  return <div>MockInterviewDetails</div>;
};

export default MockInterviewDetails;
