import React from "react";
import { ICONS, IMAGES } from "@/assets";

interface TeamMember {
    name: string;
    role: string;
    image: any;
    bgColor: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Nathania Olajide",
        role: "Founder",
        image: IMAGES.owner,
        bgColor: "bg-[#FBFBD5]",
    },
    {
        name: "Afreen Ali",
        role: "Development Assistant",
        image: IMAGES.Afreen || ICONS.userOne,
        bgColor: "bg-[#EFCCE7]",
    },
    {
        name: "Shaun Roberts",
        role: "Research Assistant",
        image: IMAGES.Shaun || ICONS.userOne,
        bgColor: "bg-[#EECDCE]",
    },
    {
        name: "Georgia Edwards",
        role: "Outreach Assistant",
        image: IMAGES.Georgia || ICONS.userOne,
        bgColor: "bg-[#F5EAB4]",
    },
    {
        name: "Andrew Shahu",
        role: "Community Lead",
        image: IMAGES.Andrew || ICONS.userOne,
        bgColor: "bg-[#E3DAF8]",
    },
];

const TeamSection = () => {
    return (
        <div className="px-6 py-12 text-center mt-9 font-['Neuton']">
            <h2 className="text-4xl font-bold mb-12">Meet Our Team</h2>

            {/* Top member (Founder) */}
            <div className="flex justify-center mb-12">
                <div className={`flex flex-col items-center group ${teamMembers[0].bgColor} p-8 rounded-2xl shadow-lg w-64 hover:scale-105 transition-transform duration-300`}>
                    <img
                        src={typeof teamMembers[0].image === 'string' ? teamMembers[0].image : teamMembers[0].image.src}
                        alt={teamMembers[0].name}
                        className="object-cover w-40 h-40 mb-6 rounded-full border-4 border-white shadow-md"
                    />
                    <h3 className="text-2xl font-bold">{teamMembers[0].name}</h3>
                    <p className="text-lg font-semibold text-[#FF9604] mt-2">
                        {teamMembers[0].role}
                    </p>
                </div>
            </div>

            {/* Grid for other members */}
            <div className="flex flex-wrap justify-center gap-8 mb-12 mx-auto max-w-6xl">
                {teamMembers.slice(1).map((member, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center ${member.bgColor} p-6 rounded-2xl shadow-md w-60 hover:-translate-y-2 transition-transform duration-300`}
                    >
                        <div className="relative w-36 h-36 mb-6">
                            <img
                                src={typeof member.image === 'string' ? member.image : member.image.src}
                                alt={member.name}
                                className="w-full h-full object-cover rounded-full object-top shadow-sm border-2 border-white"
                            />
                        </div>
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-[#555555] font-medium mt-1">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamSection;
