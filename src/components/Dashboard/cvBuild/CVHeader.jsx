import React from "react";

const CVHeader = ({ completion }) => {
  return (
    <div className="w-full p-4 py-6 mb-6 rounded-2xl border-2 border-[#FFFF00] bg-white">
      <div className="flex flex-col justify-between px-2">
        {/* Left Text */}
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="flex justify-between text-base font-semibold main-color">
              CV Completion
              {/* Percentage */}
            </p>
            <p className="text-[#4A5565] poppins font-normal text-sm mt-1 mb-2">
              You're almost there! Keep going.
            </p>
          </div>
          <span className="text-3xl font-semibold text-right main-color">
            {completion}%
          </span>
        </div>

        {/* Progress Section */}
        <div className="flex items-center w-full gap-4 ">
          {/* Yellow Progress Bar */}
          <div className="flex-1 h-2 overflow-hidden bg-[#FFFF0033] rounded-full">
            <div
              className="h-full transition-all duration-500 ease-out bg-[#FFFF00]"
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVHeader;
