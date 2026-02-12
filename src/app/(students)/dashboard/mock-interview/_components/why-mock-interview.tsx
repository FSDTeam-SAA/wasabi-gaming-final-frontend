import { Brain, CheckCircle2 } from "lucide-react";
import React from "react";

const WhyMockInterview = () => {
  const benefits = [
    "Discover your natural cognitive strengths and abilities",
    "Get personalised career recommendations based on your results",
    "Stand out to employers with verified test scores on your profile",
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-start w-full gap-4 p-5 border-2 shadow-sm border-purple-300/50 bg-purple-50 rounded-2xl md:flex-row">
        {/* Brain Icon Container */}
        <div className="bg-[#a855f7] p-4 rounded-xl flex-shrink-0 shadow-lg shadow-purple-200">
          <Brain className="w-4 h-4 text-white" strokeWidth={1.5} />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[20px] font-bold tracking-tight text-gray-900">
            Why Take A Mock Interview?
          </h2>

          <ul className="space-y-2">
            {benefits.map((text, index) => (
              <li key={index} className="flex items-start gap-2 group">
                <CheckCircle2
                  className="w-4 h-4 text-[#a855f7] flex-shrink-0 mt-0.5 transition-transform group-hover:scale-110"
                  strokeWidth={2}
                />
                <span className="text-[16px] font-medium leading-tight text-gray-600">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WhyMockInterview;
