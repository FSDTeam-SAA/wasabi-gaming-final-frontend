'use client';

import React from "react"

import { ArrowRight, Clock } from 'lucide-react'

export interface AssessmentCardProps {
  title: string
  description: string
  icon: React.ReactNode
  duration?: string
  score?: { current: number; total: number }
  status: 'available' | 'completed' | 'in-progress'
  onAction?: () => void
  actionLabel?: string
}

export function AssessmentCard({
  title,
  description,
  icon,
  duration,
  score,
  status,
  onAction,
  actionLabel = status === 'completed' ? 'View Details' : 'Start Test',
}: AssessmentCardProps) {
  const statusConfig = {
    available: { badge: 'Available', badgeClass: 'bg-yellow-100 text-yellow-800' },
    completed: { badge: 'Completed', badgeClass: 'bg-green-100 text-green-800' },
    'in-progress': { badge: 'In Progress', badgeClass: 'bg-blue-100 text-blue-800' },
  }

  const config = statusConfig[status]

  return (
    <div className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="text-accent text-2xl">{icon}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        {status !== 'in-progress' && (
          <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-2 ${config.badgeClass}`}>
            {config.badge}
          </span>
        )}
      </div>

      <div className="space-y-4">
        {duration && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={16} />
            {duration}
          </div>
        )}

        {score && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-foreground">Your Score</span>
              <span className="font-semibold text-foreground">
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
          className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          {actionLabel === 'Start Test' && <ArrowRight size={18} />}
          {actionLabel}
        </button>
      </div>
    </div>
  )
}
