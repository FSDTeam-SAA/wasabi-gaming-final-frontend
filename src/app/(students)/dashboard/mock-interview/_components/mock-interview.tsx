"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Clock4, Play } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import MockSkeleton from "./mock-skeleton";
import Link from "next/link";

interface Interview {
  _id: string;
  title: string;
  role: string;
  duration: string;
  description: string;
  instruction: string[];
  interviewer_crushed: number;
  score: string;
  category: string;
  status: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  data: {
    data: Interview[];
    meta: {
      total: number;
      page: number;
      limit: number;
    };
  };
}

const getInterviewImage = (title: string): string => {
  switch (title) {
    case "Motivational Interview":
      return "/mock-interview/motivational_interview.png";
    case "Situational Interview":
      return "/mock-interview/situational_interview.png";
    case "Technical Interview":
      return "/mock-interview/technical_interview.png";
    case "Behavioural Interview":
      return "/mock-interview/behavioural_interview.png";
    default:
      return "/mock-interview/default_interview.png";
  }
};

const MockInterview = () => {
  const { data: session } = useSession();
  const token = session?.accessToken || "";

  const { data, isLoading } = useQuery<ApiResponse>({
    queryKey: ["mock-interview"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mock-interview`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <MockSkeleton key={index} />
        ))}
      </div>
    );
  }

  const interviews = data?.data?.data || [];

  if (interviews.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-4 border-2 border-gray-300/50 rounded-xl">
          <div className="py-8 text-center">
            <p className="text-gray-700">No interviews available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {interviews.map((interview: Interview) => (
        <div
          key={interview._id}
          className="p-4 border-2 border-gray-300/50 rounded-xl"
        >
          <div className="flex items-center gap-4">
            <Image
              src={getInterviewImage(interview.title)}
              alt={interview.title}
              width={48}
              height={48}
              className="object-cover w-12 h-12"
            />

            <div className="w-full">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">{interview.title}</h1>
                <button
                  className={`px-5 py-[2px] text-sm rounded-3xl ${interview.status === "available" ? "bg-[#fcf9c2] border border-[#894b01] text-[#894b01]" : ""} ${interview.status === "completed" ? "bg-green-100 border border-green-700 text-green-700" : ""}`}
                >
                  {interview.status}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-700">
                {interview.description}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <div>
              <h4 className="flex items-center gap-2 text-sm text-gray-500">
                <Clock4 className="w-4 h-4" /> {interview.duration}
              </h4>
            </div>

            <div className="mt-2">
              <Link href={`/dashboard/mock-interview/${interview._id}`}>
                <Button className="flex items-center w-full gap-3 text-lg font-semibold rounded-xl">
                  <span>
                    <Play className="w-4 h-4" />
                  </span>{" "}
                  <span>Start Test</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MockInterview;
