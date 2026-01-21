import React from "react";
import { BsCheck2Circle } from "react-icons/bs";
const TipsPanel = () => {
  return (
    <div className="p-5 mt-8 border border-[#FFFF00] rounded-xl  py-4 bg-gradient-to-b from-[#FEFCE8] to-[#FFFFFF] text-base text-[#364153] poppins">
      <h3 className="mb-3 font-bold text-[#1E1E1E] text-xl">✨ Resume Tips</h3>
      <ul className="space-y-2 text-base text-[#364153] poppins">
        <li className="flex items-start gap-2">
          <BsCheck2Circle className="w-5 h-5 text-xl text-green-600" />
          Use action verbs to describe your achievements (e.g., "Developed",
          "Improved")
        </li>
        <li className="flex items-start gap-2">
          <BsCheck2Circle className="w-5 h-5 text-xl text-green-600" />
          Use action verbs to describe your achievements (e.g., "Developed",
          "Improved")
        </li>
        <li className="flex items-start gap-2">
          <BsCheck2Circle className="w-5 h-5 text-xl text-green-600" />
          Use action verbs to describe your achievements (e.g., "Developed",
          "Improved")
        </li>
      </ul>
    </div>
  );
};

export default TipsPanel;
