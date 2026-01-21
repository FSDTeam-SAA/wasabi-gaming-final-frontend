import { PocketKnife } from "lucide-react";
import React from "react";

const ChooseCvStyle = () => {
  return (
    <div className="p-4 border border-gray-300 rounded-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Choose Your Style</h1>
          <p className="text-gray-600">
            Select a resume template that matches your personality.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-gradient-to-r from-[#9313fa] via-[#7326fb] to-[#424efc] text-white px-5 py-3 rounded-3xl">
          <PocketKnife className="w-4 h-4" /> AI Enhance Resume
        </button>
      </div>
    </div>
  );
};

export default ChooseCvStyle;
