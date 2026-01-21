import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FiAward } from "react-icons/fi";
const AchievementsStep = ({ data = [], updateFormData, onNext, onPrev }) => {
  const [skills, setSkills] = useState(data);
  const [inputValue, setInputValue] = useState("");

  // Sync to parent
  const syncToParent = (newSkills) => {
    updateFormData("Skills", newSkills);
    setSkills(newSkills);
  };

  const addSkill = () => {
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      const newSkills = [...skills, inputValue.trim()];
      syncToParent(newSkills);
      setInputValue("");
    }
  };

  const removeSkill = (skillToRemove) => {
    const newSkills = skills.filter((s) => s !== skillToRemove);
    syncToParent(newSkills);
  };

  const addRecommended = (skill) => {
    if (!skills.includes(skill)) {
      syncToParent([...skills, skill]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSave = () => {
    if (skills.length > 0) {
      onNext(); // Treat Save as Next
    }
  };

  // Recommended skills (you can customize)
  const recommended = [
    "Leadership",
    "Problem Solving",
    "Docker",
    "React",
    "Teamwork",
    "Communication",
  ];

  return (
    <div className="space-y-8 poppins">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full yellow">
          <FiAward className="w-5 h-5" />
        </div>
        <div className="flex flex-col items-start justify-start">
          {" "}
          <h2 className="text-xl font-semibold main-color">
            Achievements
          </h2>{" "}
          <p className="text-sm text-[#4A5565] inter">
            Add your technical and soft skills
          </p>
        </div>
      </div>

      {/* Skills Label */}
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Skills
      </label>

      {/* Added Skills Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full bor main-color border border-[#dbdb08]"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-1 main-color hover:text-yellow-100"
            >
              <FaTrash size={12} />
            </button>
          </span>
        ))}
      </div>

      {/* Add Skill Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="add a skill..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
        />
        <button
          type="button"
          onClick={addSkill}
          className="px-4 font-medium text-black transition rounded-lg yellow"
        >
          <FaPlus size={16} />
        </button>
      </div>

      {/* Recommended Skills */}
      <div className="p-4 mt-6 border border-blue-200 bg-blue-50 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-sm font-medium main-color inter">
            Recommended skills
          </p>
        </div>
        <p className="mb-3 text-xs text-blue-700">
          Based on your psychometric results and target roles
        </p>
        <div className="flex flex-wrap gap-2">
          {recommended
            .filter((s) => !skills.includes(s))
            .map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => addRecommended(skill)}
                className="px-3 py-1 text-xs font-medium text-blue-700 transition bg-white border border-blue-300 rounded-full hover:bg-blue-100"
              >
                + {skill}
              </button>
            ))}
        </div>
      </div>

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
          onClick={handleSave}
          disabled={skills.length === 0}
          className="px-6 py-2 text-sm font-medium text-black bg-[#FFFF00] rounded-lg hover:bg-[#ffff0e] disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AchievementsStep;
