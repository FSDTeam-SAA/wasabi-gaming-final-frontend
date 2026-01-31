import { PocketKnife } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  cvFormat: string;
  setCvFormat: (value: string) => void;
}

const ChooseCvStyle = ({ cvFormat, setCvFormat }: Props) => {
  return (
    <div className="p-4 border border-gray-200 rounded-xl">
      <div className="items-center justify-between lg:flex">
        <div>
          <h1 className="text-lg font-bold">Choose Your Style</h1>
          <p className="text-gray-600">
            Select a resume template that matches your personality.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-gradient-to-r from-[#9313fa] via-[#7326fb] to-[#424efc] text-white px-5 py-3 rounded-3xl mt-4 lg:mt-0">
          <PocketKnife className="w-4 h-4" /> AI Enhance Resume
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 mt-5 lg:grid-cols-3 lg:flex-row">
        <div
          onClick={() => setCvFormat("Modern")}
          className={`p-4  h-[500px] rounded-xl cursor-pointer ${cvFormat === "Modern" ? "border-2 border-primary shadow-lg" : "border border-gray-200"}`}
        >
          <div className="h-[420px] border-b">
            <Image
              src={`/resume/modern.png`}
              alt="img.png"
              width={1000}
              height={1000}
              className="w-full h-full"
            />
          </div>

          <div className="pt-2">
            <h1 className="font-bold">Modern</h1>
            <p className="text-sm text-gray-500">Clean and contemporary</p>
          </div>
        </div>

        <div
          onClick={() => setCvFormat("Classic")}
          className={`p-4  h-[500px] rounded-xl cursor-pointer ${cvFormat === "Classic" ? "border-2 border-primary shadow-lg" : "border border-gray-200"}`}
        >
          <div className="h-[420px] border-b">
            <Image
              src={`/resume/classic.png`}
              alt="img.png"
              width={1000}
              height={1000}
              className="w-full h-full"
            />
          </div>

          <div className="pt-2">
            <h1 className="font-bold">Classic</h1>
            <p className="text-sm text-gray-500">
              Traditional and professional
            </p>
          </div>
        </div>

        <div
          onClick={() => setCvFormat("Creative")}
          className={`p-4  h-[500px] rounded-xl cursor-pointer ${cvFormat === "Creative" ? "border-2 border-primary shadow-lg" : "border border-gray-200"}`}
        >
          <div className="h-[420px] border-b">
            <Image
              src={`/resume/creative.png`}
              alt="img.png"
              width={1000}
              height={1000}
              className="w-full h-full"
            />
          </div>

          <div className="pt-2">
            <h1 className="font-bold">Creative</h1>
            <p className="text-sm text-gray-500">Bold and distinctive</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseCvStyle;
