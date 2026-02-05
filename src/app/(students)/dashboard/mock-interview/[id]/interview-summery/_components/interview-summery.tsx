"use client";
import { useInterviewSessionStore } from "@/zustand/useInterviewSessionId";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";

const InterviewSummery = () => {
  const { interviewSessionId } = useInterviewSessionStore();
  const { data: session } = useSession();
  const token = session?.accessToken || "";

  const {} = useQuery({
    queryKey: ["interview-summery"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mock-interview-session/average-score/${interviewSessionId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return res.json();
    },
    enabled: !!token && !!interviewSessionId,
  });

  return <div>InterviewSummery</div>;
};

export default InterviewSummery;
