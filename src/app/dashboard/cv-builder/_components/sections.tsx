"use client";

import React from "react";
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
import { useFormState, StepLabel } from "./state/useFormState";

interface SectionItem {
  icon: React.ComponentType<{ className?: string }>;
  label: StepLabel; // StepLabel enforce
}

const items: SectionItem[] = [
  { icon: User, label: "Personal Information" },
  { icon: Package, label: "Legal Work Experience" },
  { icon: Vault, label: "Non Legal Work Experience" },
  { icon: GraduationCap, label: "Education Level" },
  { icon: Award, label: "Leadership Experience" },
  { icon: Trophy, label: "Achievements" },
  { icon: BookText, label: "Summary" },
];

const Sections: React.FC = () => {
  const { isActive, setIsActive, completedSteps } = useFormState();

  const isStepAccessible = (index: number): boolean => {
    if (items[index].label === isActive) return true;
    if (completedSteps.includes(items[index].label)) return true;
    if (index === 0) return true;
    const prevLabel = items[index - 1].label;
    return completedSteps.includes(prevLabel);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-xl">
      <h1 className="text-lg font-semibold">Sections</h1>

      <div className="flex flex-col gap-5 mt-5">
        {items.map((item, index) => {
          const isCompleted = completedSteps.includes(item.label);
          const isActiveStep = isActive === item.label;
          const isDisabled = !isStepAccessible(index);

          const Icon = item.icon;

          return (
            <button
              key={item.label}
              disabled={isDisabled}
              onClick={() => setIsActive(item.label)}
              className={`
                flex items-center w-full gap-4 px-5 py-3 border rounded-3xl
                ${isActiveStep ? "bg-[#f9ff04]" : "border-gray-200"}
                ${isDisabled ? "opacity-40 cursor-not-allowed" : ""}
              `}
            >
              {isCompleted ? (
                <CircleCheckBig className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5" />
              )}

              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sections;
