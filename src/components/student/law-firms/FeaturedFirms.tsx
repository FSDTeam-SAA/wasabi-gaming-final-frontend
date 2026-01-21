import React from 'react';
import LawFirmCard, { LawFirm } from "./LawFirmCard";
import { ICONS } from "@/assets"; // Adjusted path to alias if possible, or relative

const firms: LawFirm[] = [
    {
        _id: "1",
        name: "Broadfields Law",
        tagline: "Excellence in Corporate Law",
        location: "London, UK",
        size: "250+",
        tags: ["Corporate Law", "M&A", "Tax", "Litigation"],
        logo: ICONS.farmLogo,
        gradient: "from-green-50 to-green-100",
        featured: true,
    },
    {
        _id: "2",
        name: "Ashurst",
        tagline: "Global Legal Excellence",
        location: "Multiple Locations",
        size: "1800+",
        tags: ["International Law", "Banking", "Finance", "Tax", "Litigation"],
        logo: ICONS.farmLogo,
        gradient: "from-orange-50 to-red-50",
        featured: true,
    },
    {
        _id: "3",
        name: "DLA Piper",
        tagline: "Global Business Law Firm",
        location: "Worldwide",
        size: "4200+",
        tags: ["Corporate", "Finance", "Tax", "Litigation", "M&A"],
        logo: ICONS.farmLogo,
        gradient: "from-blue-50 to-indigo-50",
        featured: true,
    },
];

const FeaturedFirms = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {firms.map((firm, i) => (
                <div key={i} className="h-full">
                    <LawFirmCard firm={firm} />
                </div>
            ))}
        </div>
    );
};

export default FeaturedFirms;
