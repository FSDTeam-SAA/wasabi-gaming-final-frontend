"use client";

import React from "react";
import { CheckCircle2, Clock, Play } from "lucide-react";
import Link from "next/link";

const AIAssessmentCentre: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Assessment Centre
          </h1>
          <p className="text-gray-600 text-base">
            Discover your cognitive strengths and ideal career paths.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Card 1: Written Case Study */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="w-5 h-5 bg-purple-600 rounded-full"></div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                <CheckCircle2 size={12} /> Completed
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Written Case Study
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Test your ability to interpret and analyse written information.
            </p>
            <div className="flex items-center text-sm text-gray-500 mb-4 gap-2">
              <Clock size={16} />
              <span>15-20 minutes</span>
            </div>
            <div>
              <Link href="/dashboard/ai-assessment-centre/written-case-staudy">
                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2">
                  <Play size={18} /> Start Test
                </button>
              </Link>
            </div>
          </div>

          {/* Card 2: Written Presentation Task */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="w-5 h-5 bg-purple-600 rounded-full"></div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                <CheckCircle2 size={12} /> Completed
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Written Presentation Task
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Test your ability to communicate complex information effectively.
            </p>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Your Score</p>
                <p className="text-sm font-bold text-gray-900">85/100</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
            <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition">
              View Details
            </button>
          </div>

          {/* Card 3: In-Tray Email Exercise */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="w-5 h-5 bg-purple-600 rounded-full"></div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                <CheckCircle2 size={12} /> Completed
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              In-Tray Email Exercise
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Test your ability to prioritise, analyse, and respond under
              pressure.
            </p>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Your Score</p>
                <p className="text-sm font-bold text-gray-900">92/100</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>
            <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition">
              View Details
            </button>
          </div>

          {/* Card 4: Case Law Summary */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="w-5 h-5 bg-purple-600 rounded-full"></div>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                Available
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Case Law Summary
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Test your ability to interpret and summarise key legal judgments.
            </p>
            <div className="flex items-center text-sm text-gray-500 mb-4 gap-2">
              <Clock size={16} />
              <span>15-20 minutes</span>
            </div>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2">
              <Play size={18} /> Start Test
            </button>
          </div>
        </div>

        {/* Why Use Section */}
        <div className="bg-purple-100 rounded-2xl p-8 md:p-10">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-300 rounded-full flex items-center justify-center mb-6">
              <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Use Our AI Assessment Centre Suite?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
              <div className="flex gap-3">
                <CheckCircle2
                  size={24}
                  className="text-purple-600 flex-shrink-0 mt-0.5"
                />
                <p className="text-gray-700 font-medium">
                  Experience realistic law firm assessment tasks powered by AI
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2
                  size={24}
                  className="text-purple-600 flex-shrink-0 mt-0.5"
                />
                <p className="text-gray-700 font-medium">
                  Strengthen your problem-solving, analysis, and communication
                  skills
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2
                  size={24}
                  className="text-purple-600 flex-shrink-0 mt-0.5"
                />
                <p className="text-gray-700 font-medium">
                  Stand out to employers with verified test scores on your
                  profile
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssessmentCentre;
