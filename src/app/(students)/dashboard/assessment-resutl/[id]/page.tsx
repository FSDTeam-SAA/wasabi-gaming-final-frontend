

"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

type InTrayEmailResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    _id: string;
    aiassigmentId: {
      _id: string;
      logo: string;
      title: string;
      discription: string;
      duration: number;
      status: string;
      applicationUser: string[];
      createdAt: string;
      updatedAt: string;
      __v: number;
      type: string;
    };
    discribtion: string;
    question: string;
    applicant: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      profileImage: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;

    commercialAwarness: string;
    contextUnderstanding: string;
    judgment: string;
    prioritization: string;
    riskAssessment: string;
    yourResponse: string;
  };
};

function formatDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Reusable field (used in both real & skeleton)
function Field({
  label,
  value,
  isLoading = false,
}: {
  label: string;
  value: React.ReactNode;
  isLoading?: boolean;
}) {
  return (
    <div className="rounded-[12px] border-2 border-[#0000001A] bg-white p-3">
      <p className="text-xs font-semibold text-yellow-500">{label}</p>
      {isLoading ? (
        <div className="mt-1 h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
      ) : (
        <div className="mt-1 text-sm font-medium text-black break-words">{value}</div>
      )}
    </div>
  );
}

function SkeletonField() {
  return <Field label="—" value={null} isLoading />;
}

export default function InTrayEmailSingleComponentPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["intrayemail", id],
    enabled: Boolean(id) && Boolean(API_BASE),
    queryFn: async (): Promise<InTrayEmailResponse> => {
      const res = await fetch(`${API_BASE}/intrayemail/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error((json as any)?.message || `Request failed (${res.status})`);
      }

      return json as InTrayEmailResponse;
    },
  });

  if (!API_BASE) {
    return (
      <div className="p-6">
        <div className="rounded-xl border p-4">
          <p className="font-semibold text-red-600">Missing NEXT_PUBLIC_API_BASE_URL</p>
          <p className="text-sm text-gray-600 mt-1">
            Add it in <code>.env</code> and restart server.
          </p>
        </div>
      </div>
    );
  }

  if (!id) {
    return (
      <div className="p-6">
        <div className="rounded-xl border p-4">
          <p className="font-semibold">No ID found in route params</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-xl border p-4">
          <p className="font-semibold text-red-600">Failed to load</p>
          <p className="text-sm text-gray-700 mt-1">{(error as Error)?.message || "Unknown error"}</p>
          <button
            onClick={() => refetch()}
            className="mt-3 px-4 py-2 rounded-[12px] bg-black text-white text-sm hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const payload = data?.data;
  const isSkeleton = isLoading || !payload;

  const a = payload?.aiassigmentId;
  const applicant = payload?.applicant;

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Yellow Header Bar */}
      <div className="mb-6 bg-[#FFFF00] max-w-6xl mx-auto rounded-[12px] p-4">
        {isSkeleton ? (
          <>
            <div className="h-8 w-3/5 bg-yellow-200 rounded animate-pulse" />
            <div className="mt-2 h-4 w-4/5 bg-yellow-200 rounded animate-pulse" />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-black">{a?.title || "IN-TRAY EMAIL EXERCISE"}</h1>
            <p className="text-sm font-semibold text-black mt-1">{a?.discription}</p>
          </>
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Main Header Card */}
        <div className="flex items-start justify-between gap-4 mb-6 rounded-[12px] border-2 border-[#0000001A] bg-white p-4">
          <div className="flex-1">
            {isSkeleton ? (
              <>
                <div className="h-7 w-64 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-1" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-black">{a?.title || "In-Tray Email"}</h2>
                <p className="text-sm text-black font-medium mt-1">{a?.discription}</p>
               
              </>
            )}
          </div>
        </div>

        {/* Assignment Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {isSkeleton ? (
            <>
              <SkeletonField />
              <SkeletonField />
              <SkeletonField />
              <SkeletonField />
              <SkeletonField />
            </>
          ) : (
            <>
              <Field label="Assignment Status" value={a?.status || "—"} />
              <Field label="Type" value={a?.type || "—"} />
              <Field label="Duration (mins)" value={a?.duration ?? "—"} />
              <Field label="Assignment Created" value={formatDate(a?.createdAt)} />
              <Field label="Assignment Updated" value={formatDate(a?.updatedAt)} />
             
            </>
          )}
        </div>

        {/* Applicant Card */}
        <div className="rounded-xl border-2 border-[#FFFF00] bg-yellow-50 p-4 mb-6">
          <h2 className="text-lg font-bold text-black mb-3">Applicant</h2>
          <div className="flex items-center gap-4">
            {isSkeleton ? (
              <>
                <div className="h-14 w-14 rounded-full bg-gray-300 animate-pulse border-2 border-[#0000001A]" />
                <div className="flex-1">
                  <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="h-3 w-40 bg-gray-200 rounded animate-pulse" />
                </div>
              </>
            ) : (
              <>
                {applicant?.profileImage ? (
                  <img
                    src={applicant.profileImage}
                    alt="Profile"
                    className="h-14 w-14 rounded-full object-cover border-2 border-[#0000001A]"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-gray-300 border-2 border-[#0000001A]" />
                )}
                <div className="min-w-0">
                  <p className="font-bold text-black">
                    {applicant?.firstName} {applicant?.lastName}
                  </p>
                  <p className="text-sm text-black break-words font-medium">{applicant?.email}</p>
                
                </div>
              </>
            )}
          </div>
        </div>

        {/* Brief + Email Question */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border-2 border-[#0000001A] bg-white p-4">
            {isSkeleton ? (
              <>
                <div className="h-8 w-24 bg-yellow-200 rounded animate-pulse mb-3" />
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
              </>
            ) : (
              <>
                <div className="bg-[#FFFF00] text-black font-bold py-2 px-3 rounded mb-3 inline-block">
                  BRIEF
                </div>
                <h2 className="text-lg font-bold text-black mb-2">Exercise Description</h2>
                <p className="text-sm text-black whitespace-pre-wrap font-medium">
                  {payload.discribtion || "—"}
                </p>
              </>
            )}
          </div>

          <div className="rounded-xl border-2 border-[#0000001A] bg-white p-4">
            {isSkeleton ? (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
                  <div>
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-1" />
                    <div className="h-3 w-56 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFFF00] text-black font-bold flex items-center justify-center text-sm">
                    J
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-sm">James Taylor</h3>
                    <p className="text-xs text-gray-600">Account Executive Portfolio</p>
                  </div>
                </div>
                <h2 className="text-lg font-bold text-black mb-2">Client Email / Question</h2>
                <p className="text-sm text-black whitespace-pre-wrap font-medium">
                  {payload.question || "—"}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Assessment Scores */}
        <div className="rounded-xl border-2 border-[#0000001A] bg-white p-4 mb-6">
          {isSkeleton ? (
            <>
              <div className="h-8 w-36 bg-yellow-200 rounded animate-pulse mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <SkeletonField />
                <SkeletonField />
                <SkeletonField />
                <SkeletonField />
                <SkeletonField />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold text-black mb-3 bg-[#FFFF00] inline-block px-3 py-1 rounded">
                ASSESSMENT
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
                <Field label="Commercial Awareness" value={payload.commercialAwarness || "—"} />
                <Field label="Context Understanding" value={payload.contextUnderstanding || "—"} />
                <Field label="Judgment" value={payload.judgment || "—"} />
                <Field label="Prioritization" value={payload.prioritization || "—"} />
                <Field label="Risk Assessment" value={payload.riskAssessment || "—"} />
              </div>
            </>
          )}
        </div>

        {/* Your Response */}
        <div className="rounded-xl border-2 border-[#0000001A] bg-white p-4 mb-6">
          {isSkeleton ? (
            <>
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-3" />
              <div className="border-2 border-[#0000001A] rounded-[12px] p-4 min-h-[140px] bg-gray-50 animate-pulse" />
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <SkeletonField />
                <SkeletonField />
                <SkeletonField />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold text-black mb-3">Your Response</h2>
              <div className="border-2 border-[#0000001A] rounded-[12px] p-4 min-h-32 bg-white mb-4">
                <p className="text-sm text-black whitespace-pre-wrap font-medium">
                  {payload.yourResponse || "—"}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Created At" value={formatDate(payload.createdAt)} />
                <Field label="Updated At" value={formatDate(payload.updatedAt)} />
                <Field label="Version" value={payload.__v ?? "—"} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}