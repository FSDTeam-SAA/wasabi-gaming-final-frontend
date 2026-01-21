import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
const EducationStep = ({ data = [], updateFormData, onNext, onPrev }) => {
  const [entries, setEntries] = useState(
    data.length ? data : [{ id: Date.now() }]
  );

  // Sync to parent formData
  const syncToParent = (newEntries) => {
    updateFormData("Education", newEntries);
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
    const hasValid = entries.some(
      (e) => e.level && e.institution && e.startYear
    );
    if (hasValid) onNext();
  };

  return (
    <div className="space-y-8">
      {/* Header */}{" "}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full yellow">
          <FaGraduationCap className="w-5 h-5" />
        </div>
        <div className="flex flex-col items-start justify-start">
          {" "}
          <h2 className="text-xl font-semibold main-color">
            Education Level
          </h2>{" "}
          <p className="text-sm text-[#4A5565] inter">
            Add your professional experience
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-600"></p>
      {/* Entries */}
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="relative p-6 space-y-5 border border-gray-200 rounded-xl bg-gray-50"
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

          {/* Education Level */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Education Level
            </label>
            <input
              type="text"
              value={entry.level || ""}
              onChange={(e) => updateEntry(entry.id, "level", e.target.value)}
              placeholder="LLB in Law"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Institution */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Institution
            </label>
            <input
              type="text"
              value={entry.institution || ""}
              onChange={(e) =>
                updateEntry(entry.id, "institution", e.target.value)
              }
              placeholder="University of Technology"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Grade & Subjects */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Grade
              </label>
              <input
                type="text"
                value={entry.grade || ""}
                onChange={(e) => updateEntry(entry.id, "grade", e.target.value)}
                placeholder="2015"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Subjects
              </label>
              <input
                type="text"
                value={entry.subjects || ""}
                onChange={(e) =>
                  updateEntry(entry.id, "subjects", e.target.value)
                }
                placeholder="2018"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Start & End Year */}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                End Year
              </label>
              <input
                type="text"
                value={entry.endYear || ""}
                onChange={(e) =>
                  updateEntry(entry.id, "endYear", e.target.value)
                }
                placeholder="2018"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
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
        Add Another Form of Education
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
          disabled={
            !entries.some((e) => e.level && e.institution && e.startYear)
          }
          className="px-6 py-2 text-sm font-medium text-black bg-[#FFFF00] rounded-lg hover:bg-[#ffff0e] disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EducationStep;
