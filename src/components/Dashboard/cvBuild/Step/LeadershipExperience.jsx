import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FaHammer } from "react-icons/fa6";

const LeadershipExperience = ({
  data = [],
  updateFormData,
  onNext,
  onPrev,
}) => {
  const [entries, setEntries] = useState(
    data.length ? data : [{ id: Date.now() }]
  );

  // Sync to parent formData
  const syncToParent = (newEntries) => {
    updateFormData("Leadership", newEntries);
    setEntries(newEntries);
  };

  const addEntry = () => {
    syncToParent([...entries, { id: Date.now() }]);
  };

  const removeEntry = (id) => {
    syncToParent(entries.filter((e) => e.id !== id));
  };

  const updateEntry = (id, field, value) => {
    const newEntries = entries.map((e) =>
      e.id === id ? { ...e, [field]: value } : e
    );
    syncToParent(newEntries);
  };

  const handleNext = () => {
    const hasValid = entries.some((e) => e.title && e.organization && e.date);
    if (hasValid) onNext();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
            <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full yellow">
          <FaHammer className="w-5 h-5" />
        </div>
        <div className="flex flex-col items-start justify-start">
          {" "}
          <h2 className="text-xl font-semibold main-color">
            Leadership Experience
          </h2>{" "}
          <p className="text-sm text-[#4A5565] inter">
    Add your professional experience
          </p>
        </div>
      </div>

     

      {/* Entries */}
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="relative p-6 space-y-5 bg-white border border-gray-200 rounded-xl"
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

          {/* Field Type / Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Field Type Purpose / Example Title / Name of Achievement
            </label>
            <input
              type="text"
              value={entry.title || ""}
              onChange={(e) => updateEntry(entry.id, "title", e.target.value)}
              placeholder="Senior Developer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Organization & Date */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Organization / Issuing Body
              </label>
              <input
                type="text"
                value={entry.organization || ""}
                onChange={(e) =>
                  updateEntry(entry.id, "organization", e.target.value)
                }
                placeholder="Jan 2022"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Date / Year
              </label>
              <input
                type="text"
                value={entry.date || ""}
                onChange={(e) => updateEntry(entry.id, "date", e.target.value)}
                placeholder="Present"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Description */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description / Details
            </label>
            <textarea
              rows={3}
              value={entry.description || ""}
              onChange={(e) =>
                updateEntry(entry.id, "description", e.target.value)
              }
              placeholder="Led development of cloud-based applications. Mentored junior developers and improved team productivity by 30%."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            <FaWandMagicSparkles className="absolute text-[#4d7be7] top-[5.5rem] right-2" />
          </div>
        </div>
      ))}

      {/* Add Another */}
      <button
        type="button"
        onClick={addEntry}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 transition border border-gray-400 border-dashed rounded-lg hover:bg-gray-50"
      >
        <FaPlus size={14} />
        Add Another Position
      </button>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-10">
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-2 text-sm font-medium text-gray-600 transition bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!entries.some((e) => e.title && e.organization && e.date)}
          className="px-6 py-2 text-sm font-medium text-black bg-[#FFFF00] rounded-lg hover:bg-[#ffff0e] disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LeadershipExperience;
