'use client';

import React from "react"

import { CircleCheckBig, Clock } from 'lucide-react'
import { Play } from 'lucide-react';

export interface AssessmentCardProps {
  title: string
  description: string
  icon: React.ReactNode
  duration?: string
  score?: { current: number; total: number }
  status: 'available' | 'completed' | 'in-progress'
  onAction?: () => void
}



export function AssessmentCard({
  title,
  description,
  icon,
  duration,
  score,
  status,
  onAction,
}: AssessmentCardProps) {
  const statusConfig = {
    available: { badge: 'Available', badgeClass: 'bg-[#FEF9C2] text-[#894B00] border border-[#FFDF20] ' },
    completed: { badge: 'Completed', badgeClass: 'bg-[#DCFCE7] text-[#016630] border border-[#7BF1A8]' },
    'in-progress': { badge: 'In Progress', badgeClass: 'bg-blue-100 text-blue-800' },
  }

  const config = statusConfig[status]

  console.log(duration)

  return (
    <div className="bg-white rounded-[20px] border-[2px] border-[#E5E7EB] bg-card p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="bg-gradient-to-br from-[#F3E8FF] to-[#E9D4FF] p-3 rounded-[20px] flex-shrink-0 mt-1 inline-flex items-center justify-center">
                {icon}
              </div>
          <div className="flex-1">
            <h3 className="font-semibold text-base text-[#1E1E1E] mb-1">{title}</h3>
            <p className="text-sm text-[#4A5565] font-normal">{description}</p>
          </div>
        </div>
        {status !== 'in-progress' && (
          <span className={`flex items-center gap-2 text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ml-2 ${config.badgeClass}`}>
            {status === "completed" && <CircleCheckBig className="w-3 h-3"/>} {config.badge}
          </span>
        )}
      </div>

      <div className="space-y-4">
        {duration && (
          <div className="flex items-center gap-2 text-sm text-[#4A5565] font-normal">
            <Clock size={16} />
            {duration}
          </div>
        )}

        {score && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-sm text-[#4A5565] font-normal">Your Score</span>
              <span className="font-semibold text-[#1E1E1E] text-sm">
                {score.current}/{score.total}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${(score.current / score.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={onAction}
          // className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          className={`${duration ? "bg-[#FFFF00] text-[#1E1E1E]": "bg-white border border-black/10"} w-full flex items-center justify-center gap-2 rounded-[14px] text-sm font-semibold py-2`}
        >
          {duration && <Play size={18} />}
          {duration ? 'Start Test' : 'View Details'}
        </button>
      </div>
    </div>
  )
}
