"use client";

import React, { useMemo } from "react";
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

interface AllFirmsGridProps {
  searchTerm: string;
  selectedTag: string;
}

const AllFirmsGrid: React.FC<AllFirmsGridProps> = ({ searchTerm, selectedTag }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allLawFirms"],
    queryFn: async (): Promise<LawFirmApiResponse> => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lawfirm`);
      return res.json();
    },
  });

  const allFirms = data?.data || [];

  const filteredFirms = useMemo(() => {
    return allFirms.filter((firm) => {
      const expertise = firm.exertise || "";
      const about = firm.aboutFirm || "";

      const matchesSearch =
        expertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
        about.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTag =
        selectedTag === "All" || expertise.toLowerCase().includes(selectedTag.toLowerCase());

      return matchesSearch && matchesTag;
    });
  }, [allFirms, searchTerm, selectedTag]);

  if (isLoading) return <p>Loading law firms...</p>;
  if (isError) return <p>Error loading law firms!</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {filteredFirms.length > 0 ? (
        filteredFirms.map((firm) => (
          <div key={firm._id} className="h-full">
            <LawFirmCard firm={firm} />
          </div>
        ))
      ) : (
        <p className="text-gray-500 col-span-full text-center mt-4">No law firms found.</p>
      )}
    </div>
  );
};

export default AllFirmsGrid;
