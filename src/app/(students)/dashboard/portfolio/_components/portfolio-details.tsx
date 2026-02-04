"use client";

import React from "react";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

const PortfolioDetails = ({ id }: { id: string }) => {
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/event/${id}`
      );
      if (!res.ok) throw new Error("Failed to load event");
      return res.json();
    },
  });

  const event = apiResponse?.data;
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg font-medium">
          Event not found or failed to load.
        </p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-[#FCFCFC]">
      <div className="relative h-[420px] sm:h-[580px] w-full overflow-hidden bg-black">
        {event.thumbnail ? (
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            className="object-cover opacity-85"
            quality={100}
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-slate-800" />
        )}

        {/* Back Button */}
        <Link href="/dashboard/portfolio" className="absolute top-4 left-4 z-20">
          <Button
            variant="secondary"
            size="sm"
            className="h-7 text-[10px] px-2 bg-white/20 hover:bg-white/30 text-white border-none rounded-sm backdrop-blur-md"
          >
            <ArrowLeft className="mr-1 h-3 w-3" /> Back
          </Button>
        </Link>
      </div>

      {/* ================= CONTENT SECTION ================= */}
      <div className="relative z-10 -mt-24 pb-16">
        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="container mx-auto max-w-4xl bg-white border border-[#D9D9D9] rounded-xl shadow-[0px_1px_4px_0px_#00000026] p-8 pt-10 text-[#333]">
            <div className="space-y-6">
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                {event.title}
              </h2>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-b pb-6">
                <div>
                  <span className="font-bold">Date:</span>{" "}
                  {new Date(event.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>

                <div>
                  <span className="font-bold">Time:</span> {event.time}
                </div>

                <div>
                  <span className="font-bold">Type:</span>{" "}
                  <span className="capitalize px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {event.eventType}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div
                className="prose prose-slate max-w-none text-gray-800
                  [&>p]:mb-4 [&>p]:leading-relaxed
                  [&_a]:text-blue-600 [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioDetails;
