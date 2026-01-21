import React from "react";
import { HiOutlineDocumentText } from "react-icons/hi2";
const SummaryStep = ({ data, setFormData, onNext, onBack }) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full yellow">
          <HiOutlineDocumentText className="w-5 h-5" />
        </div>
        <div className="flex flex-col items-start justify-start">
          {" "}
          <h2 className="text-xl font-semibold main-color">
            Professional Summary
          </h2>{" "}
          <p className="text-sm text-[#4A5565] inter">
            Brief overview of your career
          </p>
        </div>
      </div>
      <textarea
        placeholder="Write a brief professional summary..."
        value={data}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            summary: e.target.value,
          }))
        }
        className="w-full h-40 p-3 mt-4 border rounded-xl bg-gray-50"
      />

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-8 py-3 font-semibold text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 font-semibold text-black rounded-full yellow"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SummaryStep;
