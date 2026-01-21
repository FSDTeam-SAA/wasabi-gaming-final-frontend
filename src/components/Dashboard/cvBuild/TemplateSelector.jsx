// TemplateSelector.jsx
import React, { useState, useEffect } from "react";

const TemplateSelector = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  // Templates data
  const templates = [
    {
      id: "modern",
      title: "Modern",
      subtitle: "Clean and contemporary",
      colors: { accent: "yellow", primary: "gray-300", section: "yellow-50" },
      active: true,
    },
    {
      id: "classic",
      title: "Classic",
      subtitle: "Traditional and professional",
      colors: { accent: "gray-800", primary: "gray-400", section: "white" },
      active: false,
    },
    {
      id: "creative",
      title: "Creative",
      subtitle: "Bold and distinctive",
      colors: { accent: "gray-900", primary: "gray-500", section: "black" },
      active: false,
    },
  ];

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("selectedTemplate");
    if (saved) {
      setSelectedTemplate(saved);
    }
  }, []);

  // Save to localStorage when selection changes
  useEffect(() => {
    localStorage.setItem("selectedTemplate", selectedTemplate);
  }, [selectedTemplate]);

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleMouseEnter = (templateId) => {
    setHoveredTemplate(templateId);
  };

  const handleMouseLeave = () => {
    setHoveredTemplate(null);
  };

  const isActive = (templateId) => selectedTemplate === templateId;
  const isHovered = (templateId) => hoveredTemplate === templateId;
  const showCheckmark = (templateId) =>
    isActive(templateId) || isHovered(templateId);

  return (
    <div className="p-8 py-10 bg-white shadow-sm rounded-2xl border border-[#0000001A]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="mb-3 text-lg font-semibold main-color">
            Choose Your Style
          </h2>
          <p className="mb-6 text-[#4A5565] poppins font-normal text-base mt-2 ">
            Select a resume template that matches your personality
          </p>
        </div>
        {/* <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-shadow rounded-full shadow-sm bg-gradient-to-r from-[#9810FA] to-[#155DFC] hover:shadow poppins">
          <span className="text-lg">✨</span> AI Enhance Resume
        </button> */}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const isActiveTemplate = isActive(template.id);
          const isHovering = isHovered(template.id);
          const showCheck = showCheckmark(template.id);

          return (
            <div
              key={template.id}
              className={`relative  cursor-pointer rounded-xl  ${
                isActiveTemplate
                  ? "border-2 border-[#FFFF00] shadow-md"
                  : isHovering
                  ? "border-2 border-gray-200 shadow-md"
                  : "border-2 border-gray-200 shadow-sm"
              }`}
              onClick={() => handleTemplateSelect(template.id)}
              onMouseEnter={() => handleMouseEnter(template.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Template Card */}
              <div
                className={`rounded-t-xl transition-all mt-5  bg-white p-4 border-b-2 border-[#E5E7EB] `}
              >
                <div
                  className={`space-y-3 relative ${
                    template.id === "creative" ? "pb-8" : ""
                  }`}
                >
                  {/* Header bars */}
                  <div
                    className={`w-16 h-1 ${
                      template.colors.accent === "yellow"
                        ? "bg-[#FFFF00]"
                        : "bg-gray-800"
                    } rounded-full`}
                  ></div>
                  <div
                    className={`w-20 h-1 bg-${template.colors.primary} rounded-full`}
                  ></div>
                  <div
                    className={`w-24 h-1 bg-${template.colors.primary} rounded-full`}
                  ></div>

                  {/* Main section */}
                  <div
                    className={`h-80 mt-4 rounded-xl ${
                      template.colors.section === "yellow-50"
                        ? "bg-yellow-50"
                        : template.colors.section === "white"
                        ? "bg-white"
                        : "bg-black"
                    }`}
                  >
                    {/* Creative template - yellow dot */}
                    {template.id === "creative" && (
                      <div className="absolute w-3 h-3 -translate-x-1/2 bg-[#FFFF00] rounded-full shadow-lg top-2 left-1/2"></div>
                    )}
                  </div>

                  {/* Creative template - bottom yellow bar */}
                  {template.id === "creative" && (
                    <div className="absolute w-16 h-1 bg-[#FFFF00] rounded-full bottom-4 left-4"></div>
                  )}

                  {/* Checkmark - shows on hover/active */}
                  {showCheck && (
                    <div className="absolute flex items-center justify-center w-5 h-5 bg-[#FFFF00] rounded-full shadow-lg top-3 right-3">
                      <span className="text-xs font-bold text-black">✓</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Template Label */}
              <div className="px-6 py-2 mt-3">
                <p
                  className={`font-bold poppins ${
                    isActiveTemplate ? "text-[#1E1E1E]" : "text-gray-700"
                  }`}
                >
                  {template.title}
                </p>
                <p className="text-xs text-[#4A5565] poppins">
                  {template.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;
