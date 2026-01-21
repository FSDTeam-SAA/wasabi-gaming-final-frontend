import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Users, Heart, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface LawFirm {
    _id: string;
    name: string;
    tagline: string;
    location: string;
    size: string;
    logo: string;
    tags: string[];
    gradient: string;
    featured?: boolean;
}

const LawFirmCard = ({ firm }: { firm: LawFirm }) => {
    const visibleTags = firm.tags.slice(0, 2);
    const extraCount = firm.tags.length - visibleTags.length;

    return (
        <Card className="rounded-3xl overflow-hidden border-gray-200 shadow-sm w-full max-w-full mx-auto flex flex-col h-full hover:shadow-md transition-shadow">
            {/* ---------- Header – Gradient + Logo ---------- */}
            <div
                className={`bg-gradient-to-r ${firm.gradient || "from-blue-50 to-blue-100"} p-4 md:p-6 flex justify-center items-center relative h-24 md:h-32`}
            >
                {/* Logo – responsive size */}
                <div
                    className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center p-2 md:p-4 bg-white shadow-md z-10"
                    style={{
                        background: "linear-gradient(135deg, #00C950 0%, #009966 100%)",
                    }}
                >
                    {/* Fallback or real image */}
                    {firm.logo ? (
                        <img
                            src={firm.logo}
                            alt={`${firm.name} logo`}
                            className="max-w-full max-h-full object-contain"
                        />
                    ) : (
                        <div className="text-white font-bold text-xl">{firm.name[0]}</div>
                    )}

                </div>

                {/* Featured badge – top-right */}
                {firm.featured && (
                    <span
                        className="absolute top-2 right-2 md:top-4 md:right-4 rounded-full font-medium bg-[#ffff00] text-black text-xs md:text-sm px-3 py-1"
                    >
                        Featured
                    </span>
                )}
            </div>

            {/* ---------- Body ---------- */}
            <div className="p-4 md:p-6 flex-1 flex flex-col">
                {/* Name & Tagline */}
                <h3 className="text-lg md:text-xl font-medium text-gray-900">{firm.name}</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">{firm.tagline}</p>

                {/* Location & Size */}
                <div className="mt-3 md:mt-4 flex items-center gap-4 text-xs md:text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{firm.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{firm.size}</span>
                    </div>
                </div>

                {/* Tags – max 2 + "+n more" */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {visibleTags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="rounded-full font-normal text-gray-600 border-gray-300">
                            {tag}
                        </Badge>
                    ))}
                    {extraCount > 0 && (
                        <Badge variant="outline" className="rounded-full font-normal text-gray-600 border-gray-300">
                            +{extraCount} more
                        </Badge>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="mt-auto pt-6 flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
                    </button>
                    <Link href={`/dashboard/law-firm-profiles/${firm._id}`} className="flex-1">
                        <Button
                            className="w-full bg-[#ffff00] hover:bg-[#e6e600] text-black font-medium border-none rounded-xl h-10 md:h-11"
                        >
                            View Profile <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
};

export default LawFirmCard;
