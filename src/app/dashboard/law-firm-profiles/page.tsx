"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import HeaderBanner from "@/components/student/law-firms/HeaderBanner";
import SearchFilterBar from "@/components/student/law-firms/SearchFilterBar";
import StatsSection from "@/components/student/law-firms/StatsSection";
import FeaturedFirms from "@/components/student/law-firms/FeaturedFirms";
import AllFirmsGrid from "@/components/student/law-firms/AllFirmsGrid";
import SavedFirms from "@/components/student/law-firms/SavedFirms";
import WhyUseCard from "@/components/student/law-firms/WhyUseCard";

const LawFirmDirectoryPage = () => {
    const [showSaved, setShowSaved] = useState(false);
    const [savedCount, setSavedCount] = useState(4); // Mock count

    const handleSavedClick = () => {
        setShowSaved(!showSaved);
    };

    const handleBackToDirectory = () => {
        setShowSaved(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FEFCE8] via-white to-[#EFF6FF] p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="space-y-8 md:space-y-12">
                {/* Back Button for Saved View */}
                {showSaved && (
                    <Button
                        variant="outline"
                        onClick={handleBackToDirectory}
                        className="mb-4 h-10 px-4 rounded-xl gap-2 hover:bg-white"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Law Firms Directory
                    </Button>
                )}

                {/* Header Banner - Only show in main directory view */}
                {!showSaved && <HeaderBanner />}

                {/* Search + Filters */}
                <SearchFilterBar
                    onSavedClick={handleSavedClick}
                    savedCount={savedCount}
                    showSaved={showSaved}
                />

                {/* Conditional Rendering based on view */}
                {showSaved ? (
                    // Saved Firms View
                    <SavedFirms />
                ) : (
                    // Main Directory View
                    <div className="space-y-12">
                        {/* Featured Firms */}
                        <section>
                            <h3 className="mb-4 md:mb-6 flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFFF00]"
                                >
                                    <path
                                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-yellow-400 fill-yellow-400"
                                    />
                                </svg>
                                Featured Law Firms
                            </h3>
                            <FeaturedFirms />
                        </section>

                        {/* All Firms */}
                        <section>
                            <h3 className="mb-4 md:mb-6 text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                                All Law Firms
                            </h3>
                            <AllFirmsGrid />
                        </section>

                        {/* Stats */}
                        <StatsSection />

                        {/* Why Use Card */}
                        <WhyUseCard />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LawFirmDirectoryPage;
