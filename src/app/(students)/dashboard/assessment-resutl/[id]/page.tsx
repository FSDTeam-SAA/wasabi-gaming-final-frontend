


// 'use client'

// import { useParams, useRouter } from 'next/navigation'

// import { CheckCircle2, Check, AlertCircle, Lightbulb, FileText, ArrowRight, BookOpen, FileCheck } from 'lucide-react'
// import { WrittenAiAssessmentApiResponse } from '../../_components/written-assessment-data-type'
// import { useQuery } from '@tanstack/react-query'

// export default function ResultsPage() {
//   const params = useParams()
//   const router = useRouter()

//   const assessmentId = params.id as string

//   console.log(assessmentId)



//     // written case study get api
//     const { data, isLoading, isError } =
//     useQuery<WrittenAiAssessmentApiResponse>({
//       queryKey: ["written-case-study", assessmentId],
//       queryFn: async () => {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/writtencasestudy/${assessmentId}`
//         );

//         if (!res.ok) {
//           throw new Error("Failed to fetch invitations");
//         }

//         return res.json();
//       },
//     });

// //     console.log(data)

//     const writtentData = data?.data

//   return (
//     <div className="min-h-screen flex flex-col bg-background">
//       {/* <Navbar /> */}

//       <main className="flex-1">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           {/* Header */}
//           <div className="flex items-start justify-between mb-8">
//             <div className="space-y-2">
//               <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1E1E1E] flex items-center gap-2">
//                 Assessment Centre Suite Result   🎉
//               </h1>
//               <p className="text-[#4A5565] font-normal font-sm md:text-base">
//                 Great job! Here's how you performed in this Written Case Study session.
//               </p>
//             </div>
//             <button
//               onClick={() => router.push('/dashboard/ai-assessment-centre')}
//               className="bg-[#FFFF00] rounded-[16px] px-4 py-2 border-[2px] border-[#131313] text-[#131313] font-bold hover:bg-muted transition-colors"
//             >
//               Case Study
//             </button>
//           </div>

//           {/* Score Box */}
//           <div className="bg-[#18181B] rounded-[12px] p-6 mb-8 flex items-start justify-between gap-4 border-l-4 border-[#FFFF00]">


//             <div className="flex items-center gap-4 mb-3">
//               <div className="bg-[#FFFF00] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
//                 <FileText className="text-[#0A0A0A]" />
//               </div>
//               <div>
//                 <p className="text-sm font-semibold text-[#FFFF00] mb-1">Assessment Subject</p>
//                 <h2 className="text-base font-medium text-white">Brief Email About A Recent Client Case Study</h2>
//               </div>
//             </div>

//             <div className="bg-[#27272A] border border-[#3F3F46] rounded-[12px] py-2 px-4 text-right flex">
//               <p className="text-xl md:text-2xl font-bold text-white">{writtentData?.totalScore} </p>
//               <sub className="text-sm text-white"> /100</sub>
//             </div>
//           </div>

//           {/* Metrics Grid */}
//           <div className=" mb-8 bg-white p-6 border border-[#F4F4F5] rounded-[12px]">

//             <div className="flex items-center gap-4 mb-3">
//               <div className="bg-[#FFFF00] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
//                 <FileText className="text-[#0A0A0A]" />
//               </div>
//               <div>
//                 <p className="text-base md:text-lg font-bold text-[#18181B] mb-[2px]">Written assessment</p>
//                 <h2 className="text-sm font-medium text-[#71717A]">Artoon Project Management Degree Apprenticeship</h2>
//               </div>
//             </div>

//             <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm font-semibold text-[#18181B]">Words Completed</span>
//                   <span className="text-sm font-bold text-[#18181B]">{writtentData?.wordsCompleted || 0}</span>
//                 </div>
//                 <div className="w-full bg-[#E4E4E7] rounded-full h-3">
//                   <div
//                     className="bg-[#EAB308] h-3 rounded-full transition-all"
//                     style={{ width: `${writtentData?.wordsCompleted}%` }}
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm font-semibold text-[#18181B]">Completion Rate</span>
//                   <span className="text-sm font-bold text-[#18181B]">{writtentData?.completionRate || 0}</span>
//                 </div>
//                 <div className="w-full bg-[#E4E4E7] rounded-full h-3">
//                   <div
//                     className="bg-[#EAB308] h-3 rounded-full transition-all"
//                     style={{ width: `${writtentData?.completionRate}%` }}
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm font-semibold text-[#18181B]">Writing Speed</span>
//                   <span className="text-sm font-bold text-[#18181B]">{writtentData?.writingSpeed || 0}</span>
//                 </div>
//                 <div className="w-full bg-[#E4E4E7] rounded-full h-3">
//                   <div
//                     className="bg-[#EAB308] h-3 rounded-full transition-all"
//                     style={{ width: `${writtentData?.writingSpeed}%` }}
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm font-semibold text-[#18181B]">Overall Grade</span>
//                   <span className="text-sm font-bold text-[#18181B]">{writtentData?.overallGrade || ""}</span>
//                 </div>
//                 <div className="w-full bg-[#E4E4E7] rounded-full h-3">
//                   <div
//                     className="bg-[#EAB308] h-3 rounded-full transition-all"
//                     style={{ width: `${writtentData?.overallGrade}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* AI Feedback & Recommendations */}
//           <div className="bg-[#FEFCE8] rounded-[12px] p-6 mb-8 space-y-4">
//             <div className="flex items-center gap-2">
//               <Lightbulb className="w-5 h-5 text-foreground" />
//               <h3 className="text-base font-bold text-[#18181B]">AI Feedback & Recommendations</h3>
//             </div>

//             <ul className="space-y-3">
//               {writtentData?.feedback?.map((item, idx) => (
//                 <li key={idx} className="flex items-start gap-3">
//                   <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                   <span className="text-[#27272A] font-normal text-sm">{item}</span>
//                 </li>
//               ))}
//             </ul>

//             <ul className="space-y-3">
//               {writtentData?.recommendations?.map((item, idx) => (
//                 <li key={idx} className="flex items-start gap-3">
//                   <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                   <span className="text-[#27272A] font-normal text-sm">{item}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Success Tips */}
//           <div className="bg-[#FAFAFA] border border-[#E4E4E7] rounded-[12px] p-6 mb-8 space-y-4">
//             <div className="flex items-center gap-4 mb-3">
//               <div className="bg-[#FFFF00] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
//                 <Lightbulb className="text-[#0A0A0A]" />
//               </div>
//               <div>
//                 <p className="text-base font-bold text-[#18181B]">Written Case Study Success Tips Success Tips</p>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {writtentData?.successTips?.map((tip, idx) => (
//                 <div key={idx} className="space-y-2">
//                   <div className="flex items-center gap-2">
//                     <Check  className="w-5 h-5 text-[#FFFF00] flex-shrink-0" />
//                     <h4 className="font-bold text-[#18181B] text-sm">{tip}</h4>
//                   </div>
//                   {/* <p className="text-sm text-muted-foreground ml-7">{tip.description}</p> */}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* CTA Section */}
//           <div className="bg-gradient-to-r from-[#FFFF00] to-[#828200] rounded-[16px] p-6 md:p-8 lg:p-12 text-center space-y-4">
//            <div className="bg-[#FFFF00] p-2 rounded-[8px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
//                 <FileCheck  className="text-[#0A0A0A]" />
//               </div>
//             <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Ready to Participate again?</h2>
//             <p className="text-[#FFFFE6] font-normal text-sm md:text-base max-w-2xl mx-auto">
//               Watch your recorded responses, get detailed feedback on each question and see full analysis
//               of your body language and communication
//             </p>
//             <button
//               onClick={() => router.push('/dashboard/ai-assessment-centre')}
//               className="inline-flex items-center gap-2 bg-[#FFFF00] hover:bg-[#FFFF00]/80 text-sm text-black font-semibold px-3 md:px-5 lg:px-6 py-3 rounded-[12px] "
//             >
//               Start Assessment Centre Suite
//               <ArrowRight size={18} />
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

















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