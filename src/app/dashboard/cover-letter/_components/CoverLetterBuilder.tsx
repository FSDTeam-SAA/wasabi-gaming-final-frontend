'use client'

import React from "react"

import { useState } from 'react'
import {  SquareMenu, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { CoverLetterForm } from "./CoverLetterForm"
import { CoverLetterTips } from "./CoverLetterTips"

export function CoverLetterBuilder() {
  const [jobDescription, setJobDescription] = useState('')
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCvFile(file)
    }
  }

  const handleGenerateLetter = async () => {
    if (!jobDescription || !cvFile) {
      alert('Please upload your CV and job description')
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('jobDescription', jobDescription)
      formData.append('cv', cvFile)

      const response = await fetch('/api/generate-letter', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.letter) {
        setGeneratedLetter(data.letter)
        setShowForm(true)
      }
    } catch (error) {
      console.error('Error generating letter:', error)
      alert('Failed to generate cover letter')
    } finally {
      setIsLoading(false)
    }
  }

  if (showForm && generatedLetter) {
    return (
      <CoverLetterForm
        letter={generatedLetter}
        onBack={() => {
          setShowForm(false)
          setGeneratedLetter('')
        }}
      />
    )
  }

  return (
    <>
      <div className="mb-12 ">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#1E1E1E] mb-3 text-balance">
          Cover letter Builder
        </h1>
        <p className="text-base text-[#4A5565] font-normal">
          Create a professional cover letter that stands out to employers.
        </p>
      </div>

      <Card className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 mb-8 p-6 md:p-8">
        <div className="flex items-start gap-3 mb-8">
          <div className="bg-[#FFFF00] !h-[70px] !w-[70px] rounded-[24px] flex items-center justify-center shrink-0">
            <SquareMenu className="!w-7 !h-7 text-[#000000]" />
          </div>
          <div>
            <h2 className="text-xl md:text-[24px] font-semibold text-[#1E1E1E]">
              Build Your Cover Letter
            </h2>
            <p className="text-sm text-[#4A5565] mt-2">
              Upload your CV and job description details.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Job Description */}
          <div className="space-y-3">
            <label className="block text-base  font-normal text-[#364153]">
              Upload your job description
            </label>
            <Textarea
              placeholder="Input your job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full rounded-[24px] bg-[#F3F3F5] border-0 text-gray-900 placeholder:text-gray-500 p-4 text-base min-h-32 resize-none"
            />
          </div>

          {/* CV Upload */}
          <div className="space-y-3">
            <label className="bblock text-base  font-normal text-[#364153]">
              Upload CV
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleCvUpload}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                id="cv-upload"
              />
              <label
                htmlFor="cv-upload"
                className="flex items-center gap-3 w-full rounded-[24px] bg-[#F3F3F5] border-2 border-dashed border-gray-300 p-4 cursor-pointer hover:bg-gray-200 transition-colors"
              >
                <Upload className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">
                  {cvFile ? cvFile.name : 'Upload your CV'}
                </span>
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerateLetter}
            disabled={isLoading || !jobDescription || !cvFile}
            className="px-6 bg-[#FFFF00] hover:bg-y[#FFFF00]/90 text-[#1E1E1E] font-semibold rounded-[24px] text-base h-12 transition-colors"
          >
            {isLoading ? 'Generating...' : 'Build cover letter with AI'}
          </Button>
        </div>
      </Card>

      {/* Tips Section */}
      <CoverLetterTips />
    </>
  )
}
