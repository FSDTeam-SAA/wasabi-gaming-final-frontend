import {
  Award,
  BookText,
  Circle,
  GraduationCap,
  Package,
  Trophy,
  User,
  Vault,
} from "lucide-react";
import React from "react";

const Sections = () => {
  const items = [
    {
      circle: Circle,
      icon: User,
      label: "Personal Information",
    },
    {
      circle: Circle,
      icon: BookText,
      label: "Summary",
    },
    {
      circle: Circle,
      icon: Package,
      label: "Legal Work Experience",
    },
    {
      circle: Circle,
      icon: Vault,
      label: "Non Legal Work Experience",
    },
    {
      circle: Circle,
      icon: GraduationCap,
      label: "Education Level",
    },
    {
      circle: Circle,
      icon: Award,
      label: "Leadership Experience",
    },
    {
      circle: Circle,
      icon: Trophy,
      label: "Achievements",
    },
  ];

  return (
    <div className="p-4 border border-gray-300 rounded-xl">
      <h1 className="text-lg font-semibold">Sections</h1>

      <div className="flex flex-col items-start justify-start gap-5 mt-5 ">
        {items.map((item, index) => (
          <button key={index} className="flex items-center w-full gap-4 px-5 py-3 border border-gray-200 text-black/80 rounded-3xl bg-[#fcf9c2]">
            <Circle className="w-5 h-5" /> <item.icon className="w-5 h-5" /> {item?.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sections;
