'use client';

import { useState } from "react";
import { PiCaretUpDownFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import BannerCardSec from "./BannerCardSec";
import { ICONS } from "@/assets";
import JoinCommunityModal from "@/components/shared/modal/joinCommunityModal/JoinCommunityModal";

export const BlinkingStar = ({ src, className, style }: { src: string; className?: string; style?: React.CSSProperties }) => (
    <img
        src={src}
        alt="star"
        className={className}
        style={{ ...style, animation: "blink 1.5s infinite ease-in-out" }}
    />
);

const StudentHeroSec = () => {
    const [selectedType, setSelectedType] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const types = [
        "AI CV Builder",
        "Cover Letter Studio",
        "Mock Interview",
        "Assessment Centre",
    ];
    const locations = ["London", "Manchester", "Birmingham", "Leeds", "Glasgow"];

    // Map selected type to actual route
    const typeToRoute: Record<string, string> = {
        "AI CV Builder": "/dashboard/cv-builder",
        "Cover Letter Studio": "/dashboard/cover-letter",
        "Mock Interview": "/dashboard/mock-interview",
        "Assessment Centre": "/dashboard/ai-assessment-centre",
    };

    const handleSearch = () => {
        if (!selectedType) {
            // Optional: show a message or just do nothing
            return;
        }

        const route = typeToRoute[selectedType];
        if (route) {
            router.push(route);
        }
    };

    const handleJoinSuccess = (userData: any) => {
        console.log("User joined community:", userData);
    };

    return (
        <div className="min-h-screen py-4 md:pt-10 md:pb-16 relative overflow-hidden">
            {/* Join Community Modal */}
            <JoinCommunityModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleJoinSuccess}
                whatsAppLink="https://wa.me/1234567890"
            />

            {/* Blinking Stars */}
            <BlinkingStar src={ICONS.streamline} className="hidden sm:block" style={{ position: "absolute", top: "10%", left: "27%" }} />
            <BlinkingStar src={ICONS.streamlineWhite} className="hidden lg:block" style={{ position: "absolute", top: "12px", left: "220px" }} />
            <BlinkingStar src={ICONS.streamline} className="hidden md:block" style={{ position: "absolute", top: "5%", right: "10%" }} />
            <BlinkingStar src={ICONS.streamline} className="hidden lg:block" style={{ position: "absolute", top: "250px", left: "160px" }} />
            <BlinkingStar src={ICONS.streamlineWhite} className="hidden md:block" style={{ position: "absolute", top: "20%", right: "20%" }} />
            <BlinkingStar src={ICONS.streamlineWhite} className="hidden lg:block" style={{ position: "absolute", top: "400px", left: "10%" }} />
            <BlinkingStar src={ICONS.streamline} className="hidden md:block" style={{ position: "absolute", top: "500px", right: "10%" }} />

            {/* Main Content */}
            <div className="pt-4 p-4 relative z-10">
                <div className="flex flex-col justify-center items-center md:space-y-6 space-y-4 lg:space-y-8 z-30">
                    <h1 className="banner-color highlight-color source text-lg md:text-[34px] xl:text-[52px] 2xl:text-[52px] uppercase font-bold text-center z-30 leading-tight md:leading-normal">
                        Pursue your legal dreams
                        <br className="hidden sm:block" />
                        with confidence
                    </h1>
                    <p className="text-[#464646] text-xs sm:text-sm md:text-base lg:text-xl font-normal uppercase z-30 text-center max-w-2xl lg:max-w-4xl px-2">
                        Join the Aspiring Legal Network - Get the support, tools, and
                        guidance you need to start your journey in law.
                    </p>

                    {/* Search Section */}
                    <div className="flex items-center justify-center p-2 sm:p-4 container mx-auto w-full sm:w-11/12 md:w-3/4 z-30">
                        <div className="w-full bg-white rounded-xl shadow-sm px-3 sm:px-4 py-2 sm:py-3">
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                                <div className="relative flex-1">
                                    <button
                                        onClick={() => {
                                            setIsTypeOpen(!isTypeOpen);
                                            setIsLocationOpen(false);
                                        }}
                                        className="w-full px-3 py-2 sm:py-2 bg-white text-left base-color neuton text-sm sm:text-base flex items-center justify-between focus:outline-none"
                                    >
                                        <span className={selectedType ? "text-gray-700" : "base-color"}>
                                            {selectedType || "Select Type"}
                                        </span>
                                        <PiCaretUpDownFill className="text-sm sm:text-base" />
                                    </button>
                                    {isTypeOpen && (
                                        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg">
                                            {types.map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => {
                                                        setSelectedType(type);
                                                        setIsTypeOpen(false);
                                                    }}
                                                    className="w-full px-3 py-2 text-xs sm:text-sm text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="hidden sm:block w-px h-6 sm:h-8 bg-gray-200"></div>

                                <div className="relative flex-1">
                                    <button
                                        onClick={() => {
                                            setIsLocationOpen(!isLocationOpen);
                                            setIsTypeOpen(false);
                                        }}
                                        className="w-full px-3 py-2 sm:py-2 bg-white text-left base-color neuton text-sm sm:text-base flex items-center justify-between focus:outline-none"
                                    >
                                        <span className={selectedLocation ? "text-gray-700" : "base-color"}>
                                            {selectedLocation || "Select Location"}
                                        </span>
                                        <PiCaretUpDownFill className="text-sm sm:text-base" />
                                    </button>
                                    {isLocationOpen && (
                                        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg">
                                            {locations.map((location) => (
                                                <button
                                                    key={location}
                                                    onClick={() => {
                                                        setSelectedLocation(location);
                                                        setIsLocationOpen(false);
                                                    }}
                                                    className="w-full px-3 py-2 text-xs sm:text-sm text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                                                >
                                                    {location}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handleSearch}
                                    className="px-3 sm:px-4 lg:px-6 py-2 bg-[#ffff00] text-black font-bold neuton text-sm sm:text-base rounded-lg transition-colors border border-[#D9D937] mt-2 sm:mt-0"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-7 items-center">
                        <button className="bg-[#ffff00] text-black font-bold border-2 border-[#D9D937] py-2 px-6 sm:px-8 lg:px-16 rounded-full neuton text-sm sm:text-base w-full sm:w-auto">
                            Start Now
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="hover:bg-[#ffff00]/90 text-black font-bold border-2 border-[#D9D937] py-2 px-6 sm:px-8 lg:px-16 rounded-full neuton text-sm sm:text-base w-full sm:w-auto"
                        >
                            Join community
                        </button>
                    </div>
                </div>
            </div>

            {/* Cards Section */}
            <div className="mt-10 sm:mt-16 lg:mt-20 relative z-10">
                <div className="flex flex-col justify-center items-center space-y-4 sm:space-y-6 px-4">
                    <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-black text-center">
                        Everything You Need to Launch Your Career
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg xl:text-xl text-center max-w-3xl">
                        The Aspiring Legal Network equips you with smart tools to build,
                        prepare, and excel in your career.
                    </p>
                    <BannerCardSec />
                </div>
            </div>

            {/* Animation */}
            <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
        </div>
    );
};

export default StudentHeroSec;
