import React from "react";
import { ICONS, IMAGES } from "../../../assets";
const teamMembers = [
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
    cerColor: "bg-[#E49ED7]",
  },
  {
    name: "Shaun Roberts",
    role: "Research Assistant",
    image: IMAGES.Shaun || ICONS.userOne,
    bgColor: "bg-[#EECDCE]",
    cerColor: "bg-[#E37B7C]",
  },
  {
    name: "Georgia Edwards",
    role: "Outreach Assistant",
    image: IMAGES.Georgia || ICONS.userOne,
    bgColor: "bg-[#F5EAB4]",
    cerColor: "bg-[#F0DB6E]",
  },
  {
    name: "Andrew Shahu",
    role: "Community Lead",
    image: IMAGES.Andrew || ICONS.userOne,
    bgColor: "bg-[#E3DAF8]",
    cerColor: "bg-[#CDBBF7]",
  },
];
const TeamSection = () => {
  return (
    <div className="px-6 py-12 text-center mt-9 neuton">
      {/* Title */}
      <h2 className="text-4xl font-bold mb-9">Meet Our Team</h2>
      {/* Top member (Founder) */}
      <div className="flex justify-center mt-4 mb-8">
        <div
          className={`flex flex-col items-center ${teamMembers[0].bgColor} py-4 px-6 rounded-xl shadow-md w-56`}
        >
          <img
            src={teamMembers[0].image}
            alt={teamMembers[0].name}
            className="object-cover w-32 h-32 mb-4 rounded-full"
          />
          <h3 className="text-2xl font-bold">{teamMembers[0].name}</h3>
          <p className="text-base font-semibold text-[#FF9604]">
            {teamMembers[0].role}
          </p>
        </div>
      </div>
      {/* Middle row with 3 members */}
      <div className="flex flex-wrap justify-center gap-8 mb-8 mx-auto max-w-4xl">
        {teamMembers.slice(1, 4).map((member, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${member.bgColor} p-6 rounded-xl shadow-md w-56`}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 mb-4 object-cover rounded-full object-top"
            />
            <h3 className="text-2xl font-bold">{member.name}</h3>
            <p className="text-[#555555]">{member.role}</p>
          </div>
        ))}
      </div>
      {/* Bottom member */}
      <div className="flex justify-center">
        <div
          className={`flex flex-col items-center ${teamMembers[4].bgColor} p-6 rounded-xl shadow-md w-56`}
        >
          <img
            src={teamMembers[4].image}
            alt={teamMembers[4].name}
            className="w-32 h-32 mb-4 object-cover rounded-full object-top"
          />
          <h3 className="text-2xl font-bold">{teamMembers[4].name}</h3>
          <p className="text-[#555555]">{teamMembers[4].role}</p>
        </div>
      </div>
    </div>
  );
};
export default TeamSection;