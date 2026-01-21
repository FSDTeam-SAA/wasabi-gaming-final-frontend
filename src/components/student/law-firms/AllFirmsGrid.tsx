import React from 'react';
import LawFirmCard, { LawFirm } from "./LawFirmCard";
import { ICONS } from "@/assets";

const allFirms: LawFirm[] = [
    // Repeat 9 cards with different data
    ...Array(9)
        .fill(null)
        .map((_, i) => ({
            name: [
                "Woodfields LLP",
                "Ashurst",
                "Shoosmiths",
                "Weil Gotshal",
                "Hogan Lovells",
                "RPC",
                "Mills & Reeve",
                "Freshfields",
                "DLA Piper",
            ][i] || "Generic Firm",
            tagline:
                "Leading in " +
                (
                    [
                        "Corporate",
                        "M&A",
                        "Litigation",
                        "IP",
                        "Tax",
                        "Finance",
                        "Real Estate",
                        "Banking",
                        "International",
                    ][i] || "Law"),
            location: "London, UK",
            size: "200+",
            tags: ["Corporate", "Finance", "Tax", "Litigation", "M&A"],
            logo: ICONS.farmLogo,
            gradient: "from-purple-50 to-pink-50",
            _id: (i + 1).toString(),
        })),
];

const AllFirmsGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {allFirms.map((firm, i) => (
                <div key={i} className="h-full">
                    <LawFirmCard firm={firm} />
                </div>
            ))}
        </div>
    );
};

export default AllFirmsGrid;
