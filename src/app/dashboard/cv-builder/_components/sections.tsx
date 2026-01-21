"use client";
import { create } from "zustand";
import {
  Award,
  BookText,
  Circle,
  CircleCheckBig,
  GraduationCap,
  Package,
  Trophy,
  User,
  Vault,
} from "lucide-react";
import React from "react";

type SectionLabel =
  | "Personal Information"
  | "Summary"
  | "Legal Work Experience"
  | "Non Legal Work Experience"
  | "Education Level"
  | "Leadership Experience"
  | "Achievements";

interface IFormState {
  isActive: SectionLabel;
  setIsActive: (value: SectionLabel) => void;
}

const initialState: Omit<IFormState, "setIsActive"> = {
  isActive: "Personal Information",
};

export const useFormState = create<IFormState>((set) => ({
  ...initialState,
  setIsActive: (isActive) => set({ isActive }),
}));

const items: Array<{
  circle: typeof Circle;
  icon:
    | typeof User
    | typeof BookText
    | typeof Package
    | typeof Vault
    | typeof GraduationCap
    | typeof Award
    | typeof Trophy;
  label: SectionLabel;
}> = [
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

const Sections = () => {
  const { isActive, setIsActive } = useFormState();

  return (
    <div className="p-4 border border-gray-200 rounded-xl">
      <h1 className="text-lg font-semibold">Sections</h1>

      <div className="flex flex-col items-start justify-start gap-5 mt-5 ">
        {items.map((item, index) => (
          <button
            key={index}
            className={`flex items-center w-full gap-4 px-5 py-3 border border-gray-100 text-black/80 rounded-3xl ${
              isActive === item.label && "bg-[#fcf9c2]"
            }`}
            onClick={() => setIsActive(item.label)}
          >
            {isActive === item.label ? (
              <CircleCheckBig className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
            <item.icon className="w-5 h-5" /> {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sections;
