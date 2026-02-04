


"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

/** ✅ Types (from your API sample) */
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
  return d.toLocaleString();
}

function Field({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border-2 border-[#FACC154D] bg-white p-3">
      <p className="text-xs font-semibold text-yellow-500">{label}</p>
      <div className="mt-1 text-sm font-medium text-black break-words">{value}</div>
    </div>
  );
}

export default function InTrayEmailSingleComponentPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id as string;

  // ✅ set your base url here or use env:
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  // ✅ token source example (change as you need)
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["intrayemail", id],
    enabled: Boolean(id) && Boolean(API_BASE), // won't run if missing
    queryFn: async (): Promise<InTrayEmailResponse> => {
      const res = await fetch(`${API_BASE}/intrayemail/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ token in headers
          // if your backend uses a different header, use:
          // token: token,
        },
        cache: "no-store",
      });

      const json = (await res.json()) as InTrayEmailResponse;

      if (!res.ok) {
        throw new Error((json as any)?.message || `Request failed (${res.status})`);
      }

      return json;
    },
  });

  if (!API_BASE) {
    return (
      <div className="p-6">
        <div className="rounded-xl border p-4">
          <p className="font-semibold text-red-600">
            Missing NEXT_PUBLIC_API_BASE_URL
          </p>
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
          <p className="text-sm text-gray-600 mt-1">
            Your route should be: <code>/intrayemail/[id]</code>
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="rounded-xl border p-4 animate-pulse">
          <div className="h-5 w-64 bg-gray-200 rounded mb-3" />
          <div className="h-4 w-full bg-gray-200 rounded mb-2" />
          <div className="h-4 w-5/6 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-4/6 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <div className="rounded-xl border p-4">
          <p className="font-semibold text-red-600">Failed to load</p>
          <p className="text-sm text-gray-700 mt-1">
            {(error as Error)?.message || "Unknown error"}
          </p>

          <button
            onClick={() => refetch()}
            className="mt-3 px-4 py-2 rounded-lg bg-black text-white text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const payload = data?.data;
  if (!payload) {
    return (
      <div className="p-6">
        <div className="rounded-xl border p-4">
          <p className="font-semibold">No data found</p>
        </div>
      </div>
    );
  }

  const a = payload.aiassigmentId;
  const applicant = payload.applicant;

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Yellow Header Bar */}
      <div className="mb-6 bg-[#FFFF00] rounded-lg p-4 ">
        <h1 className="text-2xl font-bold text-black">{a?.title || "IN-TRAY EMAIL EXERCISE"}</h1>
        <p className="text-sm font-semibold text-black mt-1">{a?.discription}</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6 rounded-lg border-2 border-[#FACC154D] bg-white p-4">
          <div>
            <h2 className="text-xl font-bold text-black">{a?.title || "In-Tray Email"}</h2>
            <p className="text-sm text-black font-medium mt-1">{a?.discription}</p>
            <p className="text-xs font-semibold text-yellow-500 mt-2">
              ID: <span className="font-mono text-black">{payload._id}</span>
              {isFetching ? " • Updating..." : ""}
            </p>
          </div>

        </div>

        {/* Assignment Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Field label="Assignment Status" value={a?.status || "—"} />
          <Field label="Type" value={a?.type || "—"} />
          <Field label="Duration (mins)" value={a?.duration ?? "—"} />
          <Field label="Assignment Created" value={formatDate(a?.createdAt)} />
          <Field label="Assignment Updated" value={formatDate(a?.updatedAt)} />
          <Field
            label="Application Users"
            value={(a?.applicationUser || []).length ? a.applicationUser.join(", ") : "—"}
          />
        </div>

        {/* Applicant */}
        <div className="rounded-xl border-2 border-[#FACC154D] bg-yellow-50 p-4 mb-6">
          <h2 className="text-lg font-bold text-black mb-3">Applicant</h2>
          <div className="flex items-center gap-4">
            {applicant?.profileImage ? (
              <img
                src={applicant.profileImage || "/placeholder.svg"}
                alt="Profile"
                className="h-14 w-14 rounded-full object-cover border-2 border-[#FACC154D]"
              />
            ) : (
              <div className="h-14 w-14 rounded-full bg-gray-300 border-2 border-[#FACC154D]" />
            )}

            <div className="min-w-0">
              <p className="font-bold text-black">
                {applicant?.firstName} {applicant?.lastName}
              </p>
              <p className="text-sm text-black break-words font-medium">{applicant?.email}</p>
              <p className="text-xs font-semibold text-yellow-500 mt-1">
                Applicant ID: <span className="font-mono text-black">{applicant?._id}</span>
              </p>
            </div>
          </div>
        </div>

      {/* Question + Description */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl border-2 border-[#FACC154D] bg-white p-4">
          <div className="bg-yellow-400 text-black font-bold py-2 px-3 rounded mb-3 inline-block">BRIEF</div>
          <h2 className="text-lg font-bold text-black mb-2">Exercise Description</h2>
          <p className="text-sm text-black whitespace-pre-wrap font-medium">
            {payload.discribtion}
          </p>
        </div>

        <div className="rounded-xl border-2 border-[#FACC154D] bg-white p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center text-sm">J</div>
            <div>
              <h3 className="font-bold text-black text-sm">James Taylor</h3>
              <p className="text-xs text-gray-600">Account Executive Portfolio</p>
            </div>
          </div>
          <h2 className="text-lg font-bold text-black mb-2">Client Email / Question</h2>
          <p className="text-sm text-black whitespace-pre-wrap font-medium">
            {payload.question}
          </p>
        </div>
      </div>

      {/* Scores */}
      <div className="rounded-xl border-2 border-[#FACC154D] bg-white p-4 mb-6">
        <h2 className="text-lg font-bold text-black mb-3 bg-yellow-400 inline-block px-3 py-1 rounded">ASSESSMENT</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
          <Field label="Commercial Awareness" value={payload.commercialAwarness} />
          <Field label="Context Understanding" value={payload.contextUnderstanding} />
          <Field label="Judgment" value={payload.judgment} />
          <Field label="Prioritization" value={payload.prioritization} />
          <Field label="Risk Assessment" value={payload.riskAssessment} />
        </div>
      </div>

      {/* Response */}
      <div className="rounded-xl border-2 border-[#FACC154D] bg-white p-4 mb-6">
        <h2 className="text-lg font-bold text-black mb-3">Your Response</h2>
        <div className="border-2 border-[#FACC154D] rounded-lg p-4 min-h-32 bg-white mb-4">
          <p className="text-sm text-black whitespace-pre-wrap font-medium">
            {payload.yourResponse || "—"}
          </p>
        </div>

      

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Created At" value={formatDate(payload.createdAt)} />
          <Field label="Updated At" value={formatDate(payload.updatedAt)} />
          <Field label="Version" value={payload.__v ?? "—"} />
        </div>
      </div>
    </div>
    </div>
  );
}
