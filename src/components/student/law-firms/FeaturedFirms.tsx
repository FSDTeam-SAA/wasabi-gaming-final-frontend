"use client";

import React from "react";
import LawFirmCard, { LawFirm } from "./LawFirmCard";
import { useQuery } from "@tanstack/react-query";

interface LawFirmApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  data: LawFirm[];
}

const FeaturedFirms = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["featuredLawFirms"],
    queryFn: async (): Promise<LawFirmApiResponse> => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lawfirms`);
      return res.json();
    },
  });

  if (isLoading) return <p>Loading featured firms...</p>;
  if (isError) return <p>Error loading featured firms!</p>;

  // Take first 4 firms
  const featuredFirms = data?.data?.slice(0, 4) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {featuredFirms.length > 0 ? (
        featuredFirms.map((firm) => (
          <div key={firm._id} className="h-full">
            <LawFirmCard firm={firm} />
          </div>
        ))
      ) : (
        <p className="text-gray-500 col-span-full text-center mt-4">
          No featured firms available.
        </p>
      )}
    </div>
  );
};

export default FeaturedFirms;
