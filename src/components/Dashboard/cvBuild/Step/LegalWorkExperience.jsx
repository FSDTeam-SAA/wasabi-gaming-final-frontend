// src/Step/LegalWorkExperience.jsx
import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { IoIosHammer } from "react-icons/io";
const LegalWorkExperience = ({
  data = [],
  updateFormData,
  onNext,
  onPrev, // <-- Add this
  onPreview, // <-- Add this
}) => {
  const [entries, setEntries] = useState(
    data.length ? data : [{ id: Date.now() }]
  );

  const syncToParent = (newEntries) => {
    updateFormData("Legal", newEntries);
    setEntries(newEntries);
  };

  const addEntry = () => syncToParent([...entries, { id: Date.now() }]);
  const removeEntry = (id) => syncToParent(entries.filter((e) => e.id !== id));

  const updateEntry = (id, field, value) => {
    const newEntries = entries.map((e) =>
      e.id === id ? { ...e, [field]: value } : e
    );
    syncToParent(newEntries);
  };

  const handleNext = () => {
    const hasValid = entries.some(
      (e) => e.jobTitle && e.organisation && e.startYear
    );
    if (hasValid) onNext();
  };

  return (
    <div className="space-y-8 poppins">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full yellow">
          <IoIosHammer className="w-5 h-5" />
        </div>
        <div className="flex flex-col items-start justify-start">
          {" "}
          <h2 className="text-xl font-semibold main-color">
            Legal Work Experience
          </h2>{" "}
          <p className="text-sm text-[#4A5565] inter">
         Add your Legal work  experience
          </p>
        </div>
      </div>

      {entries.map((entry) => (
        <div
          key={entry.id}
          className="relative p-6 space-y-5 border border-gray-200 rounded-xl"
        >
          {entries.length > 1 && (
            <button
              type="button"
              onClick={() => removeEntry(entry.id)}
              className="absolute text-red-500 top-2 right-2 hover:text-red-700"
            >
              <FaTrash size={18} />
            </button>
          )}

          {/* Job Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Job Title / Role
            </label>
            <input
              type="text"
              value={entry.jobTitle || ""}
              onChange={(e) =>
                updateEntry(entry.id, "jobTitle", e.target.value)
              }
              placeholder="LLB in Law"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Organisation */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Organisation / Firm Name
            </label>
            <input
              type="text"
              value={entry.organisation || ""}
              onChange={(e) =>
                updateEntry(entry.id, "organisation", e.target.value)
              }
              placeholder="University of Technology"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Key Responsibilities
            </label>
            <textarea
              rows={3}
              value={entry.responsibilities || ""}
              onChange={(e) =>
                updateEntry(entry.id, "responsibilities", e.target.value)
              }
              placeholder="Briefly describe your responsibilities..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Start Year
              </label>
              <input
                type="text"
                value={entry.startYear || ""}
                onChange={(e) =>
                  updateEntry(entry.id, "startYear", e.target.value)
                }
                placeholder="2015"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                End Year (Currently Working)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={entry.endYear || ""}
                  onChange={(e) =>
                    updateEntry(entry.id, "endYear", e.target.value)
                  }
                  placeholder="Currently working"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                />
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={entry.currentlyWorking || false}
                    onChange={(e) =>
                      updateEntry(
                        entry.id,
                        "currentlyWorking",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 text-yellow-500 rounded"
                  />
                  <span className="text-sm text-gray-600">
                    Currently working
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add Another */}
      <button
        type="button"
        onClick={addEntry}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-yellow-600 border border-yellow-600 rounded-lg hover:bg-yellow-50"
      >
        <FaPlus size={14} /> Add Another Legal Experience
      </button>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onPrev} // Fixed: use onPrev
          className="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={
            !entries.some((e) => e.jobTitle && e.organisation && e.startYear)
          }
          className="px-6 py-2 text-sm font-medium text-black bg-[#FFFF00] rounded-lg hover:bg-[#ffff0e] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Show Preview Button if Save is done */}
      {onPreview && (
        <div className="mt-6">
          <button
            onClick={onPreview}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#FFFF00] text-black font-medium rounded-xl hover:bg-[#ffff0e]"
          >
            <FaEye /> Preview Resume
          </button>
        </div>
      )}
    </div>
  );
};

export default LegalWorkExperience;
