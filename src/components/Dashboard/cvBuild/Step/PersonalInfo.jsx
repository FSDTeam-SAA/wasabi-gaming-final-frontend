// src/Step/PersonalInfo.jsx
import React from "react";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
const PersonalInfo = ({ data, updateFormData, onNext, onPreview }) => {
  const handleChange = (field, value) => {
    updateFormData("personal", { ...data, [field]: value });
  };

  return (
    <div className="space-y-6 poppins">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full yellow">
          <FiUser className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-start justify-start">
          {" "}
          <h2 className="text-2xl font-semibold main-color">
            Personal Information
          </h2>{" "}
          <p className="text-sm text-[#4A5565] inter">
            Your basic contact details
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="First Name"
          value={data.firstName || ""}
          onChange={(e) => handleChange("firstName", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={data.lastName || ""}
          onChange={(e) => handleChange("lastName", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <input
        type="text"
        placeholder="Professional Title"
        value={data.title || ""}
        onChange={(e) => handleChange("title", e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="relative">
          <HiMail className="absolute text-gray-500 left-3 top-3" />
          <input
            type="email"
            placeholder="Email Address"
            value={data.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
        </div>
        <div className="relative">
          <HiPhone className="absolute text-gray-500 left-3 top-3" />
          <input
            type="text"
            placeholder="Phone Number"
            value={data.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
          />
        </div>
      </div>

      <div className="relative">
        <HiLocationMarker className="absolute text-gray-500 left-3 top-3" />
        <input
          type="text"
          placeholder="Location"
          value={data.location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
          className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div className="flex items-center justify-between mt-8">
        <div /> {/* Spacer */}
        <button
          onClick={onNext}
          className="px-6 py-2 text-sm font-medium text-black bg-[#FFFF00] rounded-lg hover:bg-[#ffff0e]"
        >
          Next
        </button>
      </div>

      {/* Show Preview Button */}
      {onPreview && (
        <div className="mt-4">
          <button
            onClick={onPreview}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#FFFF00] text-black font-medium rounded-xl hover:bg-[#ffff0e]"
          >
            <span className="text-lg">Eye Icon</span> Preview Resume
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
