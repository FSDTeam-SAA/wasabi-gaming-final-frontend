"use client";

import React from "react";
import {
    CheckCircle,
    ChevronRight,
    MessageCircle,
    FileText,
    Calendar,
    ArrowRight,
    Sparkles,
} from "lucide-react";
import { LuBrain } from "react-icons/lu";
import { CiCircleCheck } from "react-icons/ci";
import { FiAward } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";

import iconImage from "@/assets/images/Icon.png";
import { cn } from "@/utils/cn";

const recentActivity = [
    { icon: CheckCircle, text: "Applied to TechCo Inc.", time: "2 hours ago" },
    {
        icon: FileText,
        text: "Completed Resume Reviewing Tool",
        time: "1 day ago",
    },
    { icon: Calendar, text: "Updated Resume", time: "3 days ago" },
];

const statsData = [
    {
        id: 1,
        title: "CV Completion",
        value: "85%",
        width: "85%",
    },
    {
        id: 2,
        title: "Applications Sent",
        value: "12",
        width: "60%",
    },
    {
        id: 3,
        title: "Interview Rate",
        value: "25%",
        width: "25%",
    },
    {
        id: 4, // Added ID for uniqueness if needed, though map index is fine
        title: "Profile Strength",
        value: "Good",
        width: "70%",
    },
];

const quickActions = [
    {
        id: 1,
        title: "Build Your CV",
        subtitle: "85% Complete",
        icon: <FileText className="w-5 h-5 text-black" />,
        bg: "bg-[#FEF9C2]",
        hoverBg: "hover:bg-yellow-100",
        iconHoverBg: "group-hover:bg-yellow-300",
        link: "/dashboard/cv-builder",
    },
    {
        id: 2,
        title: "Take Psychometric Test",
        subtitle: "Discover your strengths",
        icon: <LuBrain className="w-5 h-5 text-[#9810FA]" />,
        bg: "bg-purple-200",
        hoverBg: "hover:bg-purple-100",
        iconHoverBg: "group-hover:bg-purple-300",
        link: "/dashboard/cover-letter", // Note: link mismatch in original? kept as is but should verify
    },
    {
        id: 3,
        title: "Track Applications",
        subtitle: "12 active applications",
        icon: <MessageCircle className="w-5 h-5 text-[#155DFC]" />,
        bg: "bg-blue-200 border border-[#0000001A]",
        hoverBg: "hover:bg-blue-100",
        iconHoverBg: "group-hover:bg-blue-300",
        link: "/dashboard/student/application-tracker",
    },
];

export default function CareerDashboard() {
    const router = useRouter();

    const handleNavigate = (link: string) => {
        if (link) router.push(link);
    };

    return (
        <div className="min-h-screen p-4 bg-white neuton">
            {/* Hero Banner */}
            <div
                className="relative p-8 mb-8 overflow-hidden rounded-3xl md:p-12"
                style={{
                    background: "linear-gradient(135deg, #FFFF00 0%, #E6E600 100%)",
                }}
            >
                <div className="flex items-start gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-gray-800" />
                    <span className="text-base font-semibold text-gray-800">
                        Welcome back!
                    </span>
                </div>

                <h1 className="mb-3 text-3xl font-bold main-color md:text-5xl inter">
                    Ready to Advance Your
                    <br />
                    Career?
                </h1>

                <p className=" mb-6 text-2xl text-[#525252] ">
                    Track your progress, build your resume, and discover opportunities
                    tailored to your insights.
                </p>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => router.push('/dashboard/cv-builder')}
                        className="bg-white main-color px-6 py-2.5 rounded-full text-base flex items-center gap-2 hover:bg-gray-50 transition-colors inter"
                    >
                        <FileText className="w-5 h-5 text-black" />
                        Complete Your Resume
                    </button>
                    <button
                        onClick={() => router.push('/dashboard/student/application-tracker')}
                        className="bg-transparent border-2 border-gray-900 text-gray-900 px-6 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-900 hover:text-white transition-colors main-color inter"
                    >
                        View Applications
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="px-6 py-12 mx-auto ">
                {/* Progress Cards */}
                <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-3">
                    {statsData.slice(0, 3).map((item) => (
                        <div
                            key={item.id}
                            // onClick={() => handleNavigate(item.link || "")} // No link in original data for stats
                            className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base text-gray-600 inter ">
                                    {item.title}
                                </h3>

                                {/*  Same icon image for all */}
                                <div className="p-2 ">
                                    <Image src={iconImage} alt="icon" className="w-5 h-5" />
                                </div>
                            </div>

                            <div className="mb-2 text-3xl font-bold text-gray-900">
                                {item.value}
                            </div>

                            <div className="w-full h-3 bg-gray-200 rounded-full">
                                <div
                                    className="h-3 transition-all duration-500 rounded-full yellow"
                                    style={{ width: item.width }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 neuton">
                    {/* Quick Actions */}
                    <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
                        <h2 className="mb-6 text-xl font-bold main-color">
                            Quick Actions
                        </h2>

                        <div className="space-y-3">
                            {quickActions.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavigate(item.link)}
                                    className={`flex items-center justify-between w-full p-4 transition-colors border border-[#0000001A]  rounded-xl group ${item.hoverBg}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`p-2 transition-colors rounded-lg ${item.bg} ${item.iconHoverBg}`}
                                        >
                                            {item.icon}
                                        </div>

                                        <h1 className="flex flex-col items-start text-lg font-semibold main-color">
                                            {item.title}
                                            {item.subtitle && (
                                                <span className="text-[#4A5565] font-normal text-base">
                                                    {item.subtitle}
                                                </span>
                                            )}
                                        </h1>
                                    </div>

                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
                        <h2 className="mb-6 text-xl font-bold main-color">
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => {
                                const IconComponent = activity.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-start justify-between border-b border-b-[#F3F4F6] p-4 "
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-gray-50">
                                                <IconComponent className="w-5 h-5 text-gray-600" />
                                            </div>
                                            <div>
                                                <div className="text-base font-bold main-color inter">
                                                    {activity.text}
                                                </div>
                                                <div className="text-xs text-[#6A7282] mt-0.5 inter">
                                                    {activity.time}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-xl text-green-400">
                                            <CiCircleCheck />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Career Strengths Section */}
                <div className="p-6 mt-6 bg-[#EFF6FF] shadow-sm border border-[#BEDBFF]  rounded-2xl">
                    <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full">
                            <FiAward className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="mb-2 text-lg font-semibold main-color inter">
                                Your Career Strength
                            </h3>
                            <p className="mb-4 text-base text-[#4A5565]">
                                Based on your answers/personality/interests you would at
                                analysing/thinking and problem solving. We believe it has job
                                opportunities that match your strength.
                            </p>
                            <button
                                className="px-6 py-2.5 rounded-full font-normal text-base transition-colors main-color"
                                style={{ backgroundColor: "#FFFF00" }}
                            >
                                View Recommended Jobs
                            </button>
                        </div>
                    </div>
                </div>

                {/* Success Quote */}
                <div className="max-w-5xl p-8 mx-auto mt-12 text-center border border-[#FFFF00] bg-yellow-50 rounded-3xl inter">
                    <p className="max-w-3xl mx-auto text-lg italic text-[#1E1E1E]">
                        “Success is the sum of small efforts repeated day in and day out.”
                    </p>
                </div>
            </div>
        </div>
    );
}
