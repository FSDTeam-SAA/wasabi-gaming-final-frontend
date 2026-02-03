'use client';

import React, { useState } from "react"

import { CircleCheckBig, Clock } from 'lucide-react'
import { Play } from 'lucide-react';
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AiAssessment } from "./ai-assessment-data-type";
import { useRouter } from "next/navigation";

export interface AssessmentCardProps {
  // key:string
  // title: string
  // description: string
  // icon: React.ReactNode
  // duration?: string
  // score?: { current: number; total: number }
  // status: 'AVAILABLE' | 'COMPLETED' | 'PENDING'
  // onAction?: () => void
  //  disabled?: boolean
   data: AiAssessment
}



export function AssessmentCard({
  data,
  // key,
  // title,
  // description,
  // icon,
  // duration,
  // score,
  // status,
  // onAction,
  // disabled,
}: AssessmentCardProps) {
  const statusConfig = {
    AVAILABLE: { badge: 'AVAILABLE', badgeClass: 'bg-[#FEF9C2] text-[#894B00] border border-[#FFDF20] ' },
    COMPLETED: { badge: 'COMPLETED', badgeClass: 'bg-[#DCFCE7] text-[#016630] border border-[#7BF1A8]' },
    PENDING: { badge: 'PENDING', badgeClass: 'bg-blue-100 text-blue-800' },

     
  }
  

   const { data: session } = useSession();
    const token = (session as { accessToken?: string })?.accessToken;
    const router = useRouter();
    const [content, setContent] = useState<any>({})
  const config = statusConfig[data?.status]


  console.log("ee", data)

  const assessmentId = data?._id || "";



    const { mutate: createWrittenCase } = useMutation({
  mutationKey: ['create-written-case', assessmentId],
  mutationFn: async (assessmentId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/writtencasestudy/creat/${assessmentId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!res.ok) {
      throw new Error('Failed to create written case study')
    }

    return res.json()
  },
  onSuccess: (data) => {
    toast.success(data?.message || 'Assessment started successfully')
    // router.push(`/dashboard/ai-assessment-centre/${data.data._id}`)
  },
  onError: () => {
    toast.error('Something went wrong')
  },
})

   const handleStartAssessment = (id: string) => {
    
    router.push(`/dashboard/ai-assessment-centre/${id}`)
  }


  return (
    <div className="bg-white rounded-[20px] border-[2px] border-[#E5E7EB] bg-card p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4 flex-1">
          {/* <div className="bg-gradient-to-br from-[#F3E8FF] to-[#E9D4FF] p-3 rounded-[20px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
                {icon}
              </div> */}
          <div className="flex-1">
            <h3 className="font-semibold text-base text-[#1E1E1E] mb-1">{data?.title}</h3>
            <p className="text-sm text-[#4A5565] font-normal">{data?.discription}</p>
          </div>
        </div>
        {status !== 'PENDING' && (
          <span className={`flex items-center gap-2 text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ml-2 ${config.badgeClass}`}>
            {status === "COMPLETED" && <CircleCheckBig className="w-3 h-3"/>} {config.badge}
          </span>
        )}
        
      </div>

      <div className="space-y-4">
        {data?.duration && (
          <div className="flex items-center gap-2 text-sm text-[#4A5565] font-normal">
            <Clock size={16} />
            {data?.duration}
          </div>
        )}

        {/* {data?.score && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-sm text-[#4A5565] font-normal">Your Score</span>
              <span className="font-semibold text-[#1E1E1E] text-sm">
                {data?.score?.current}/{data?.score.total}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${(data?.score.current / data?.score.total) * 100}%` }}
              />
            </div>
          </div>
        )} */}

        <button
          onClick={() => handleStartAssessment(data?._id)}
          // className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          className={`${data?.duration ? "bg-[#FFFF00] text-[#1E1E1E]": "bg-white border border-black/10"} w-full flex items-center justify-center gap-2 rounded-[14px] text-sm font-semibold py-2`}
        >
          {data?.duration && <Play size={18} />}
          {data?.duration ? 'Start Test' : 'View Details'}
        </button>



      </div>
    </div>
  )
}
