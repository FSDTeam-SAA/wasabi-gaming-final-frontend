
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
import Image from "next/image";

export default function LawFirmDirectoryPage() {
  const [showSaved, setShowSaved] = useState(false);
  const [savedCount] = useState(4); 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  return (
  <div className="min-h-screen bg-[linear-gradient(135deg,#FEFCE8_0%,#FFFFFF_50%,#EFF6FF_100%)] p-4 sm:p-6 md:p-8 lg:p-12">

      <div className="space-y-8 md:space-y-12 container mx-auto">
        {/* Back button when in Saved view */}
        {showSaved && (
          <Button
            variant="outline"
            onClick={() => setShowSaved(false)}
            className="mb-4 h-10 px-4 rounded-xl gap-2 hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Law Firms Directory
          </Button>
        )}

        {/* Banner only in normal view */}
        {!showSaved && <HeaderBanner />}

        {/* Search + Filter Bar */}
        <SearchFilterBar
          onSavedClick={() => setShowSaved(!showSaved)}
          savedCount={savedCount}
          showSaved={showSaved}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />

        {/* Main content */}
        {showSaved ? (
          <SavedFirms />
        ) : (
          <div className="space-y-12">
             <section>
              <h4 className="mb-4 md:mb-6 flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-normal text-[#1E1E1E]">
              <Image src="/images/star.png" width={1000} height={1000} alt="star" className="w-7 h-7 object-cover" />
                Featured Law Firms
              </h4>
              <FeaturedFirms />
            </section>
            <section>
              <h4 className="mb-4 md:mb-6 text-lg sm:text-xl md:text-2xl font-normal text-[#1E1E1E]">
                All Law Firms
              </h4>
              <AllFirmsGrid searchTerm={searchTerm} selectedTag={selectedTag} />
            </section>
           

            <StatsSection />
            <WhyUseCard />
          </div>
        )}
      </div>
    </div>
  );
}