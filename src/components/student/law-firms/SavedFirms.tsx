import React from 'react';
import LawFirmCard, { LawFirm } from "./LawFirmCard";
import { ICONS } from "@/assets";

const SavedFirms = () => {
    // Mock data for saved firms
    const savedFirms: LawFirm[] = [
        {
            _id: "1",
            name: "Broadfields Law",
            tagline: "Excellence in Corporate Law",
            location: "London, UK",
            size: "260+",
            tags: ["Corporate Law", "M&A", "Tax", "Litigation"],
            logo: ICONS.farmLogo,
            gradient: "from-green-50 to-green-100",
            featured: false,
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
            featured: false,
        },
        {
            _id: "3",
            name: "Weil, Gotshal & Manges",
            tagline: "Premier Global Law Firm",
            location: "New York, London",
            size: "1000+",
            tags: ["Restructuring", "Private Equity", "M&A", "Litigation"],
            logo: ICONS.farmLogo,
            gradient: "from-purple-50 to-pink-50",
            featured: false,
        },
        {
            _id: "4",
            nae: "DLA Piper",
            tagline: "Global Business Law Firm",
            location: "Worldwide",
            size: "4200+",
            tags: ["Corporate", "Finance", "Tax", "Litigation", "M&A"],
            logo: ICONS.farmLogo,
            gradient: "from-blue-50 to-indigo-50",
            featured: false,
        },
    ];

    return (
        <div>
            <h2 className="mb-4 md:mb-6 text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                Saved Law Firms
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {savedFirms.map((firm) => (
                    <div key={firm._id} className="h-full">
                        <LawFirmCard firm={firm} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SavedFirms;
