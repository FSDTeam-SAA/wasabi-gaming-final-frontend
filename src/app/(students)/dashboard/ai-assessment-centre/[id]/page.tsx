'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

import { AlertCircle, Clock, BookOpen } from 'lucide-react'
// import Navbar from "../_components/navbar"
// import Footer from "../_components/footer"

const assessmentContent = {
  'case-study': {
    title: 'Written Assessment',
    module: 'Assessment Module 01',
    caseName: 'Ventara Automotive',
    roleContext: 'You are an analyst at a consulting firm. Your manager has requested a brief email about a recent client case.',
    caseDescription: `Our client, Ventara, is experiencing delays in the launch of their new electric vehicle. The main issues include supply chain disruptions and technical challenges with the battery system. This could affect their position in the market and profitability.`,
    instructions: [
      'Summarize the main issues',
      'Explain potential impact on client relationship',
      'Suggest two next steps',
    ],
    requirements: [
      'Use at least 300 words',
      'Use a professional tone',
      'Structure clearly',
    ],
    duration: 45,
  },
  'presentation': {
    title: 'Written Presentation',
    module: 'Assessment Module 02',
    caseName: 'Market Analysis Report',
    roleContext: 'Prepare a presentation on current market trends.',
    caseDescription: 'Analyze the competitive landscape and provide strategic recommendations.',
    instructions: ['Research the topic', 'Create structured outline', 'Present findings'],
    requirements: ['250+ words', 'Professional structure', 'Evidence-based'],
    duration: 60,
  },
  'email-exercise': {
    title: 'In-Tray Email Exercise',
    module: 'Assessment Module 03',
    caseName: 'Email Management Test',
    roleContext: 'Handle multiple priority emails in your inbox.',
    caseDescription: 'Sort and respond to emails based on urgency and importance.',
    instructions: ['Prioritize emails', 'Draft responses', 'Manage time'],
    requirements: ['Clear prioritization', 'Professional tone', 'Time management'],
    duration: 40,
  },
  'law-summary': {
    title: 'Case Law Summary',
    module: 'Assessment Module 04',
    caseName: 'Legal Case Analysis',
    roleContext: 'Summarize the key points from a legal case.',
    caseDescription: 'Analyze the judgment and extract key legal principles.',
    instructions: ['Identify key issues', 'Summarize judgment', 'Note implications'],
    requirements: ['Concise summary', 'Legal accuracy', '300+ words'],
    duration: 50,
  },
}

export default function AssessmentPage() {
  const params = useParams()
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(45 * 60)
  const [response, setResponse] = useState('')
  const [showRequirements, setShowRequirements] = useState(true)
  const [wordCount, setWordCount] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const assessmentId = params.id as string
  const content = assessmentContent[assessmentId as keyof typeof assessmentContent] || assessmentContent['case-study']

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setResponse(text)
    setWordCount(text.trim().split(/\s+/).filter((word) => word.length > 0).length)
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      router.push(`/dashboard/ai-assessment-centre/results/${assessmentId}`)
    }, 1500)
  }

  const handleCancel = () => {
    router.push('/')
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isTimeWarning = timeLeft < 300

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* <Navbar /> */}

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{content.module}</p>
              <h1 className="text-3xl font-bold text-foreground">{content.title}</h1>
            </div>
            <div className={`rounded-lg border-2 px-4 py-2 flex items-center gap-2 ${isTimeWarning ? 'border-red-500 bg-red-50' : 'border-primary bg-primary/10'}`}>
              <Clock className={`w-5 h-5 ${isTimeWarning ? 'text-red-600' : 'text-foreground'}`} />
              <span className={`font-bold ${isTimeWarning ? 'text-red-600' : 'text-foreground'}`}>
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Case Brief */}
            <div className="lg:col-span-1 space-y-6">
              {/* Case Briefing */}
              <div className="bg-black rounded-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">Case Briefing</h3>
                </div>
              </div>

              {/* Role Context */}
              <div className="bg-yellow-100 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">Role Context</h4>
                <p className="text-sm text-foreground">{content.roleContext}</p>
              </div>

              {/* Case Description */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">{content.caseName}</h3>
                <p className="text-muted-foreground border-b border-border pb-4">
                  {content.caseDescription}
                </p>

                {/* Instructions */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <p className="font-semibold text-foreground text-sm">
                    In your email to your manager:
                  </p>
                  <ul className="space-y-2">
                    {content.instructions.map((instruction, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-primary font-bold flex-shrink-0">▶</span>
                        <span className="text-foreground">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Response Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Response Header */}
              <div className="bg-yellow-100 rounded-lg p-4 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Your Response</h3>
                  <p className="text-sm text-muted-foreground">Internal Email Draft</p>
                </div>
                <span className="text-sm font-semibold text-muted-foreground">
                  {wordCount}/300 words
                </span>
              </div>

              {/* Text Editor */}
              <textarea
                value={response}
                onChange={handleResponseChange}
                placeholder="Dear [Manager],

Start typing your email here..."
                className="w-full h-80 p-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground resize-none"
              />

              {/* Requirements Section */}
              <div className="bg-yellow-100 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-foreground" />
                  <h4 className="font-semibold text-foreground">Requirements</h4>
                </div>
                <div className="flex flex-wrap gap-4">
                  {content.requirements.map((req, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="requirements"
                        defaultChecked={idx === 0}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-foreground">{req}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-muted rounded-full h-1 w-full">
                <div
                  className="bg-primary h-1 rounded-full transition-all"
                  style={{ width: `${Math.min((wordCount / 300) * 100, 100)}%` }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end pt-4">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 border-2 border-foreground text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel Assessment
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitted}
                  className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {submitted ? 'Submitting...' : 'Submit Response'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  )
}
