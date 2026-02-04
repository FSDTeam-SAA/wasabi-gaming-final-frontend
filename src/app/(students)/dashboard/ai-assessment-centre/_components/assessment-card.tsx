'use client';

import React from "react";
import { CircleCheckBig, Clock, Play } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AiAssessment } from "./ai-assessment-data-type";
import { useRouter } from "next/navigation";

/* ----------------------------------
   SERVICE CONFIG (API + ROUTE)
-----------------------------------*/
const assessmentServiceConfig = {
    WRITTEN_CASE: {
    api: (id: string) => `/writtencasestudy/creat/${id}`,
    route: (id: string) =>
      `/dashboard/ai-assessment-centre/${id}`,
  },
  // WRITTEN_CASE: {
  //   api: (id: string) => `/writtencasestudy/creat/${id}`,
  //   route: (id: string) =>
  //     `/dashboard/ai-assessment-centre/written-case/${id}`,
  // },

  PRESENTATION: {
    api: (id: string) => `/presentationtask/create/${id}`,
    route: (id: string) =>
      `/dashboard/ai-assessment-centre/presentation/${id}`,
  },

  EMAIL_EXERCISE: {
    api: (id: string) => `/intrayemail/create/${id}`,
    route: (id: string) =>
      `/dashboard/ai-assessment-centre/email-exercise/${id}`,
  },

  DUTY_OF_CARE: {
    api: (id: string) => `/careanalysis/create/${id}`,
    route: (id: string) =>
      `/dashboard/ai-assessment-centre/case-study/${id}`,
  },
} as const;

interface AssessmentCardProps {
  data: AiAssessment;
}

export function AssessmentCard({ data }: AssessmentCardProps) {
  const router = useRouter();
  const session = useSession();
  const token = session?.data?.accessToken

  console.log(token)

  const statusConfig = {
    AVAILABLE: {
      badge: "AVAILABLE",
      badgeClass: "bg-[#FEF9C2] text-[#894B00] border border-[#FFDF20]",
    },
    COMPLETED: {
      badge: "COMPLETED",
      badgeClass: "bg-[#DCFCE7] text-[#016630] border border-[#7BF1A8]",
    },
    PENDING: {
      badge: "PENDING",
      badgeClass: "bg-blue-100 text-blue-800",
    },
  };

  const config = statusConfig[data.status];

  /* ----------------------------------
     SINGLE GENERIC MUTATION
  -----------------------------------*/
  const { mutate: startAssessment, isPending } = useMutation({
    mutationKey: ["start-assessment"],
    mutationFn: async ({
      assessmentId,
      type,
    }: {
      assessmentId: string;
      type: keyof typeof assessmentServiceConfig;
      // type : "WRITTEN_CASE"
    }) => {
      const service = assessmentServiceConfig[type];

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${service.api(
          assessmentId
        )}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to start assessment");
      }

      return res.json();
    },

    onSuccess: (data, variables) => {
      toast.success(data?.message || "Assessment started successfully");

      const service = assessmentServiceConfig[variables.type];
      router.push(service.route(variables.assessmentId));
    },

    onError: () => {
      toast.error("Something went wrong");
    },
  });

  // const handleStartAssessment = () => {
  //   startAssessment({
  //     assessmentId: data._id,
  //     type: data.type,
  //   });
  // };

  const handleStartAssessment = () => {
  if (!data?._id) {
    toast.error("Invalid assessment");
    return;
  }

  if (!data?.type) {
    toast.error("Assessment type missing");
    return;
  }

  if (!token) {
    toast.error("Please login again");
    return;
  }

  startAssessment({
    assessmentId: data._id,
    type: data.type,
  });
};


  return (
    <div className="bg-white rounded-[20px] border-[2px] border-[#E5E7EB] p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-base text-[#1E1E1E] mb-1">
            {data.title}
          </h3>
          <p className="text-sm text-[#4A5565]">
            {data.discription}
          </p>
        </div>

        <span
          className={`flex items-center gap-2 text-xs font-medium px-2 py-1 rounded-full ${config.badgeClass}`}
        >
          {data.status === "COMPLETED" && (
            <CircleCheckBig className="w-3 h-3" />
          )}
          {config.badge}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-[#4A5565] mb-4">
        <Clock size={16} />
        {data.duration} minutes
      </div>

      <button
        onClick={handleStartAssessment}
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 rounded-[14px] text-sm font-semibold py-2 bg-[#FFFF00] text-[#1E1E1E] hover:opacity-90 disabled:opacity-50"
      >
        <Play size={18} />
        {isPending ? "Starting..." : "Start Test"}
      </button>
    </div>
  );
}




// 'use client';

// import React, { useState } from "react"

// import { CircleCheckBig, Clock } from 'lucide-react'
// import { Play } from 'lucide-react';
// import { useSession } from "next-auth/react";
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { AiAssessment } from "./ai-assessment-data-type";
// import { useRouter } from "next/navigation";

// export interface AssessmentCardProps {
//   // key:string
//   // title: string
//   // description: string
//   // icon: React.ReactNode
//   // duration?: string
//   // score?: { current: number; total: number }
//   // status: 'AVAILABLE' | 'COMPLETED' | 'PENDING'
//   // onAction?: () => void
//   //  disabled?: boolean
//    data: AiAssessment
// }



// export function AssessmentCard({
//   data,
//   // key,
//   // title,
//   // description,
//   // icon,
//   // duration,
//   // score,
//   // status,
//   // onAction,
//   // disabled,
// }: AssessmentCardProps) {
//   const statusConfig = {
//     AVAILABLE: { badge: 'AVAILABLE', badgeClass: 'bg-[#FEF9C2] text-[#894B00] border border-[#FFDF20] ' },
//     COMPLETED: { badge: 'COMPLETED', badgeClass: 'bg-[#DCFCE7] text-[#016630] border border-[#7BF1A8]' },
//     PENDING: { badge: 'PENDING', badgeClass: 'bg-blue-100 text-blue-800' },

     
//   }
  

//    const { data: session } = useSession();
//     const token = (session as { accessToken?: string })?.accessToken;
//     const router = useRouter();
//     const [content, setContent] = useState<any>({})
//   const config = statusConfig[data?.status]


//   console.log("ee", data)

//   const assessmentId = data?._id || "";



//     const { mutate: createWrittenCase } = useMutation({
//   mutationKey: ['create-written-case', assessmentId],
//   mutationFn: async (assessmentId: string) => {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/writtencasestudy/creat/${assessmentId}`,
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     )

//     if (!res.ok) {
//       throw new Error('Failed to create written case study')
//     }

//     return res.json()
//   },
//   onSuccess: (data) => {
//     toast.success(data?.message || 'Assessment started successfully')
//     // router.push(`/dashboard/ai-assessment-centre/${data.data._id}`)
//   },
//   onError: () => {
//     toast.error('Something went wrong')
//   },
// })

//    const handleStartAssessment = (id: string) => {
//     createWrittenCase()
//     router.push(`/dashboard/ai-assessment-centre/${id}`)
//   }


//   return (
//     <div className="bg-white rounded-[20px] border-[2px] border-[#E5E7EB] bg-card p-6 hover:shadow-lg transition-shadow">
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex items-center gap-4 flex-1">
//           {/* <div className="bg-gradient-to-br from-[#F3E8FF] to-[#E9D4FF] p-3 rounded-[20px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
//                 {icon}
//               </div> */}
//           <div className="flex-1">
//             <h3 className="font-semibold text-base text-[#1E1E1E] mb-1">{data?.title}</h3>
//             <p className="text-sm text-[#4A5565] font-normal">{data?.discription}</p>
//           </div>
//         </div>
//         {status !== 'PENDING' && (
//           <span className={`flex items-center gap-2 text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ml-2 ${config.badgeClass}`}>
//             {status === "COMPLETED" && <CircleCheckBig className="w-3 h-3"/>} {config.badge}
//           </span>
//         )}
        
//       </div>

//       <div className="space-y-4">
//         {data?.duration && (
//           <div className="flex items-center gap-2 text-sm text-[#4A5565] font-normal">
//             <Clock size={16} />
//             {data?.duration}
//           </div>
//         )}

//         {/* {data?.score && (
//           <div className="space-y-2">
//             <div className="flex justify-between items-center text-sm">
//               <span className="text-sm text-[#4A5565] font-normal">Your Score</span>
//               <span className="font-semibold text-[#1E1E1E] text-sm">
//                 {data?.score?.current}/{data?.score.total}
//               </span>
//             </div>
//             <div className="w-full bg-muted rounded-full h-2">
//               <div
//                 className="bg-primary h-2 rounded-full"
//                 style={{ width: `${(data?.score.current / data?.score.total) * 100}%` }}
//               />
//             </div>
//           </div>
//         )} */}

//         <button
//           onClick={() => handleStartAssessment(data?._id)}
//           // className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
//           className={`${data?.duration ? "bg-[#FFFF00] text-[#1E1E1E]": "bg-white border border-black/10"} w-full flex items-center justify-center gap-2 rounded-[14px] text-sm font-semibold py-2`}
//         >
//           {data?.duration && <Play size={18} />}
//           {data?.duration ? 'Start Test' : 'View Details'}
//         </button>



//       </div>
//     </div>
//   )
// }
