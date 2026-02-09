"use client";
import { useQuery } from "@tanstack/react-query";
import { CircleCheckBig, MapPin, Users } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import ShowOpenPosition from "./ShowOpenPosition";
import Image from "next/image";
import Link from "next/link";

// TypeScript interface
interface RecentInfo {
  title?: string;
  description?: string;
  url?: string;
}

interface LawFirmData {
  _id: string;
  aboutFirm?: string;
  exertise?: string;
  internshipTraining?: string;
  description?: string;
  coverImage?: string;
  createBy?: string;
  numberOfPartners?: number;
  cultureAndValue?: string[];
  status?: string;
  applyNumber?: string[];
  location?: string;
  contactEmail?: string;
  phone?: string;
  website?: string;
  establishedYear?: number;
  benefitsAndPerks?: string[];
  employees?: string;
  createdAt?: string;
  updatedAt?: string;
  firmName?: string;
  firmType?: string;
  subtitle?: string;
  foundationYear?: string;
  foundedNGO?: string;
  practiceAreas?: string;
  keyHighlights?: string;
  recentAwards?: RecentInfo;
  recentWork?: RecentInfo;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: LawFirmData;
}

function ViewDetailsLawFirms() {
  const params = useParams();
  const id =
    typeof params?.id === "string"
      ? params.id
      : Array.isArray(params?.id)
        ? params.id[0]
        : undefined;

  // Tab state
  const [activeTab, setActiveTab] = useState<
    "overview" | "positions" | "culture"
  >("overview");

  // Fetch law firm data from API
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<ApiResponse>({
    queryKey: ["law-firm-profile", id],
    queryFn: async () => {
      if (!id) throw new Error("No ID provided");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lawfirm/${id}`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch law firm data");
      }
      return res.json();
    },
    enabled: !!id,
  });

  const firmData = response?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading law firm details...</p>
        </div>
      </div>
    );
  }

  if (error || !firmData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600">Failed to load law firm details</p>
          <p className="text-sm text-gray-500 mt-2">
            {error instanceof Error ? error.message : "Please try again later"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-8">
        <div className="container mx-auto px-6 pt-6">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 mb-6 hover:text-gray-800 text-sm"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Law Firms
          </button>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm p-8 relative">
            {firmData.status === "approved" && (
              <div className="absolute top-6 right-6">
                <span className="bg-yellow-300 text-black text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  Featured Position
                </span>
              </div>
            )}

            {/* Logo */}
            <div className="flex justify-center mb-6 bg-[#ECFDF5] py-10 rounded-2xl">
              {firmData.coverImage ? (
                <img
                  src={firmData.coverImage}
                  alt={`${firmData.firmName || "Law Firm"} Logo`}
                  className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display =
                        "flex";
                    }
                  }}
                />
              ) : null}
              <div
                className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-5 w-20 h-20 flex items-center justify-center shadow-lg"
                style={{ display: firmData.coverImage ? "none" : "flex" }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
            </div>

            {/* Title and Info */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {firmData.firmName || "Law Firm"}
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                {firmData.firmType ||
                  firmData.firmType ||
                  "Professional Legal Services"}
              </p>

              {/* Stats Row */}
              <div className="flex items-center justify-start gap-6 text-sm text-gray-600 mb-6 flex-wrap">
                {firmData.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin />
                    {firmData.location}
                  </span>
                )}

                <span className="flex items-center gap-1.5">
                  <Users />
                  {firmData.numberOfPartners}+ employees
                </span>

                <span className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                  </svg>
                  Founded {firmData.foundationYear}
                </span>
              </div>

              {/* Tags */}
              {firmData.exertise && (
                <div className="flex items-center justify-center gap-3 text-sm mb-6 flex-wrap">
                  {firmData.exertise.split(",").map((item, index, arr) => (
                    <React.Fragment key={index}>
                      <span className="text-gray-600">{item.trim()}</span>
                      {index < arr.length - 1 && (
                        <span className="text-gray-400">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-6 mb-6">
              {firmData.contactEmail && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {firmData.contactEmail}
                    </p>
                  </div>
                </div>
              )}

              {firmData.website && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Website</p>
                    <a
                      href={
                        firmData.website.startsWith("http")
                          ? firmData.website
                          : `https://${firmData.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-teal-600 hover:underline truncate block"
                    >
                      {firmData.website
                        .replace(/^https?:\/\//, "")
                        .replace(/^www\./, "")}
                    </a>
                  </div>
                </div>
              )}

              {firmData.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-gray-900">
                      {firmData.phone}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Tab Buttons - NOW WORKING! */}
            <div className="flex items-center gap-4 border-t border-gray-100 pt-6 flex-wrap">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex-1 min-w-[150px] font-semibold py-3 rounded-lg transition-all ${activeTab === "overview"
                    ? "bg-yellow-300 text-black shadow-sm"
                    : "border-2 border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("positions")}
                className={`flex-1 min-w-[150px] font-semibold py-3 rounded-lg transition-all ${activeTab === "positions"
                    ? "bg-yellow-300 text-black shadow-sm"
                    : "border-2 border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
              >
                Open Positions (
                {Array.isArray(firmData.applyNumber)
                  ? firmData.applyNumber.length
                  : 0}
                )
              </button>
              <button
                onClick={() => setActiveTab("culture")}
                className={`flex-1 min-w-[150px] font-semibold py-3 rounded-lg transition-all ${activeTab === "culture"
                    ? "bg-yellow-300 text-black shadow-sm"
                    : "border-2 border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
              >
                Cultures & Benefits
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Main Content - TAB CONTENT */}
      <div className="container mx-auto py-12">
        <div className="">
          {/* Left Column - Tab Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <>
                {firmData.aboutFirm && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6 ">
                      About {firmData.firmName || "Law Firm"}
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-8">
                      {firmData.aboutFirm}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 bg-white shadow-[0px_4px_8px_0px_#00000014] rounded-2xl overflow-hidden">
                      {firmData.practiceAreas && (
                        <div className="space-y-5 p-5">
                          <h3 className="font-semibold text-gray-900 mb-4">
                            Key practiceAreas
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {firmData.practiceAreas}
                          </p>
                        </div>
                      )}

                      {firmData.keyHighlights && (
                        <div className="space-y-5 p-5">
                          <h3 className="font-semibold text-gray-900 mb-4">
                            Key Highlights
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {firmData.keyHighlights}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {firmData.exertise && !firmData.practiceAreas && (
                  <div className="border-t border-gray-100 pt-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Areas of Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {firmData.exertise.split(",").map((item, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          {item.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {firmData.internshipTraining && (
                  <div className="border-t border-gray-100 pt-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">
                          Internship & Training
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {firmData.internshipTraining}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-100 pt-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-900 mb-3">
                        {firmData.description || "Recent Awards"}
                      </h3>

                      <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        Url Link :{" "}
                        <span className="text-blue-600 text-base">
                          {firmData.website}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 ">
                  {/* Your Career Strengths Card */}
                  <div className=" max-w-6xl mx-auto  border-2 border-[#BEDBFF] rounded-2xl p-[32px] shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-[64px] h-[64px] ">
                       <Image src="/images/icon11.png" width={1000} height={1000} alt="Career Strengths" className="w-full h-full object-cover" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 ">
                        <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">
                          Your Career Strengths
                        </h3>
                        <p className="text-base text-[#4A5565] leading-relaxed mb-4">
                          Based on your psychometric test results, you excel in
                          analytical thinking and problem-solving. We've found 5
                          new job opportunities that match your profile.
                        </p>
                        <Link href="/plans">
                        <button className="bg-[#FFFF00] rounded-[24px] w-[215px] hover:bg-[#FFFF00]/90 text-[#1E1E1E] font-normal py-3 px-2 transition-colors shadow-md ">
                          Upgrade Your Plan
                        </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Motivational Quote Card */}
                  <div className="bg-[#FFFEF0] border-2 border-[#FFFF00] rounded-2xl p-6 shadow-sm w-[60%] mx-auto">
                    <div className="flex items-start ">
                      {/* Quote Icon */}
                      <div className="flex-shrink-0 ">
                       <Image src="/images/icon2.png" width={1000} height={1000} alt="Motivational Quote" className="w-7 h-7 object-cover" />
                      </div>

                      {/* Quote Text */}
                      <div className="flex-1">
                        <p className="text-[#1E1E1E] text-lg text-center font-medium italic leading-relaxed">
                          "Success is the sum of small efforts repeated day in
                          and day out."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* POSITIONS TAB */}
            {activeTab === "positions" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Open Positions
                </h2>

                <ShowOpenPosition firmName={firmData?.firmName} />
              </div>
            )}

            {/* CULTURE & BENEFITS TAB */}
            {activeTab === "culture" && (
              <div className="space-y-6">
                <div className="border border-[#0000001A] rounded-lg py-6">
                  <h2 className="text-xl font-medium mb-4 px-6">
                    Culture & Benefits
                  </h2>

                  <div className="px-6">
                    {Array.isArray(firmData?.cultureAndValue) &&
                      firmData.cultureAndValue.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {firmData.cultureAndValue.map(
                          (item: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 text-gray-700"
                            >
                              <CircleCheckBig className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                              <p className="leading-relaxed">{item}</p>
                            </div>
                          ),
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">
                        No culture and benefits information available.
                      </p>
                    )}
                  </div>
                </div>

                <div className="border border-[#0000001A] rounded-lg py-6">
                  <h2 className="text-xl font-medium mb-4 px-6">
                    Benefits & Perks
                  </h2>

                  <div className="px-6">
                    {Array.isArray(firmData?.benefitsAndPerks) &&
                      firmData.benefitsAndPerks.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {firmData.benefitsAndPerks.map(
                          (item: string, index: number) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 text-gray-700 bg-[#ECFEFF] p-3 rounded-md"
                            >
                              <CircleCheckBig className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                              <p className="leading-relaxed">{item}</p>
                            </div>
                          ),
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">
                        No culture and benefits information available.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          {/* <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Your Career Strengths</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    Based on your preferences you match, you and a analysis profiling and problem solving test as much to you appreciated the not smart
                  </p>
                  <button className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition-colors">
                    Try my Vise Fit
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        className="fixed bottom-24 right-8 w-14 h-14 bg-teal-500 hover:bg-teal-600 rounded-full shadow-lg flex items-center justify-center text-white transition-all hover:scale-110 z-20"
        aria-label="Chat"
      >
        <span className="text-xl font-bold">T</span>
      </button>

      {/* Bottom View Only Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-700 to-gray-800 text-white py-4 px-6 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
          <p className="text-sm font-medium">
            You can only view and comment on this file.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailsLawFirms;
