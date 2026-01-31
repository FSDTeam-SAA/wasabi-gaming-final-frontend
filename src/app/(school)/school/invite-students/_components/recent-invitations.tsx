'use client';

import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { GetAllRecentInviteApiResponse } from "./recent-invitations-data-type";

function timeAgo(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) {
    return `${diffMinutes} minute ago`;
  }

  if (diffHours < 24) {
    return `${diffHours} hour ago`;
  }

  return `${diffDays} day ago`;
}


/* -------------------------------
   Loading Skeleton
-------------------------------- */
function InvitationSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-100"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="h-3 w-20 bg-gray-100 rounded" />
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------
   Error State
-------------------------------- */
function ErrorState({ message }: { message?: string }) {
  return (
    <div className="p-6 border border-red-200 bg-red-50 rounded-xl text-center">
      <p className="text-sm font-semibold text-red-600">
        Failed to load invitations
      </p>
      <p className="text-xs text-red-500 mt-1">
        {message || "Something went wrong. Please try again."}
      </p>
    </div>
  );
}

/* -------------------------------
   Main Component
-------------------------------- */
export function RecentInvitations() {
  const { data: session } = useSession();
  const token = (session as { accessToken?: string })?.accessToken;

  const { data, isLoading, isError, error } =
    useQuery<GetAllRecentInviteApiResponse>({
      queryKey: ["recent-invitations"],
      enabled: !!token, // wait until token exists
      queryFn: async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/invite-students`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch invitations");
        }

        return res.json();
      },
    });

  return (
    <div className="container mx-auto w-full space-y-8 font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-normal text-[#1E1E1E]">Recent Invitations</h3>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {isLoading && <InvitationSkeleton />}

        {isError && (
          <ErrorState message={(error as Error)?.message} />
        )}

        {!isLoading && !isError && data?.data?.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-6">
            No invitations found.
          </p>
        )}

        {!isLoading &&
          !isError &&
          data?.data?.map((invitation) => (
            <div
              key={invitation._id}
              className="flex items-center justify-between p-5 bg-white rounded-xl border border-[#E5E5E5] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-[#FFFF00] rounded-full flex items-center justify-center font-normal text-base text-[#1E1E1E]">
                  {invitation.name.charAt(0)}
                </div>

                <div className="flex-1">
                  <p className="font-normal text-base text-[#1E1E1E]">
                    {invitation.name}
                  </p>
                  <p className="font-normal text-base text-[#1E1E1E]">
                    {invitation.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 shrink-0">
                <p className="text-sm text-[#666666] font-normal">
                  {timeAgo(invitation.createdAt)}
                </p>


                <span
                  className={cn(
                    "text-sm font-normal px-4 py-2 rounded-full",
                    invitation.status === "accepted"
                      ? "bg-[#FFFF00] text-[#1E1E1E]"
                      : "bg-[#F5F5F5] text-[#666666]"
                  )}
                >
                  {invitation.status}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}




