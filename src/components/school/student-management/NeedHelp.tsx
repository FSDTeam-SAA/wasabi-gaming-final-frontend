'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { BookOpen, Headphones } from 'lucide-react'
import Link from 'next/link'

export default function NeedHelpSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="bg-[#FFFF00] py-20  px-6 rounded-b-3xl text-center space-y-6 font-poppins relative overflow-hidden shadow-sm">
      <div className="absolute top-0 left-0 w-full h-1 bg-black/5" />

      <h3 className="text-3xl md:text-5xl font-normal text-[#1E1E1E] max-w-2xl mx-auto ">
        Need help managing students?
      </h3>
      <p className="text-black/70 md:text-xl font-medium max-w-xl mx-auto">
        Our team is here to support you with onboarding, training, and best
        practices for a seamless educational experience.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 pt-4">
        <Link href={'/contact-us'}>
          <Button className="bg-black hover:bg-black/90 text-yellow-400 px-10 h-14 rounded-full font-bold transition-all shadow-lg text-lg flex items-center gap-3">
            <Headphones className="w-5 h-5" />
            Contact Support
          </Button>
        </Link>
        <Button
          variant="outline"
          className="border-2 border-black bg-transparent text-black px-12 h-14 rounded-full font-bold hover:bg-black hover:text-white transition-all text-lg flex items-center gap-3"
          onClick={() => setIsModalOpen(true)}
        >
          <BookOpen className="w-5 h-5" />
          View Guide
        </Button>
      </div>

      {/* Modal for displaying the guide */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl w-full max-h-[85vh] overflow-y-auto font-poppins p-8 rounded-3xl bg-white">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-3xl font-bold text-center">
              Website Guide (Instruction Manual)
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-10 text-left">
            <section>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-yellow-400 rounded-full flex items-center justify-center text-sm shrink-0">
                  1
                </span>
                Website Overview
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                The AI-driven career development platform is designed to empower
                students and schools with tools that enhance employability and
                professional growth through the use of advanced, AI-integrated
                solutions.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-yellow-400 rounded-full flex items-center justify-center text-sm shrink-0">
                  2
                </span>
                Website Purpose
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                The purpose of this project is to provide a comprehensive
                AI-based career preparation platform that supports both students
                and educational institutions in bridgeing the gap between
                education and career.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-yellow-400 rounded-full flex items-center justify-center text-sm shrink-0">
                  3
                </span>
                Target Users
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                The platform caters primarily to two types of users — Students
                and School Administrators. Each has dedicated features tailored
                to their needs.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <span className="w-8 h-8 bg-black text-yellow-400 rounded-full flex items-center justify-center text-sm shrink-0">
                  4
                </span>
                Functionality Guide
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                Students can use the AI CV Builder to create and refine resumes,
                generate personalized cover letters, and take psychometric tests
                that assess skills and traits relevant to their career goals.
              </p>
            </section>

            <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200 text-center">
              <p className="text-yellow-800 font-bold mb-2">
                Need More Details?
              </p>
              <p className="text-yellow-700 text-sm">
                Download the full PDF version from the Resources section in your
                dashboard.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
