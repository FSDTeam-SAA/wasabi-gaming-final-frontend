import React from "react";

const FormSection = ({
  currentStep,
  steps,
  formData,
  updateFormData,
  handleNext,
  handlePrev,
  downloadPDF,
}) => {
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 border rounded-md"
              value={formData.personal.firstName}
              onChange={(e) =>
                updateFormData("personal", "firstName", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 border rounded-md"
              value={formData.personal.lastName}
              onChange={(e) =>
                updateFormData("personal", "lastName", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Professional Title"
              className="w-full p-3 border rounded-md"
              value={formData.personal.title}
              onChange={(e) =>
                updateFormData("personal", "title", e.target.value)
              }
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-md"
              value={formData.personal.email}
              onChange={(e) =>
                updateFormData("personal", "email", e.target.value)
              }
            />

            <input
              type="tel"
              placeholder="Phone"
              className="w-full p-3 border rounded-md"
              value={formData.personal.phone}
              onChange={(e) =>
                updateFormData("personal", "phone", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Location"
              className="w-full p-3 border rounded-md"
              value={formData.personal.location}
              onChange={(e) =>
                updateFormData("personal", "location", e.target.value)
              }
            />
          </div>
        );

      case 1:
        return (
          <textarea
            rows={5}
            placeholder="Your summary..."
            className="w-full p-3 border rounded-md"
            value={formData.summary}
            onChange={(e) => updateFormData(null, "summary", e.target.value)}
          />
        );

      case 2:
      case 3:
      case 4:
        const sectionKey =
          currentStep === 2
            ? "workExperience"
            : currentStep === 3
            ? "nonLegalExperience"
            : "leadership";

        const handleExperienceUpdate = (key, value) => {
          const newData = { ...formData[sectionKey][0], [key]: value };
          updateFormData(sectionKey, 0, newData);
        };

        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Job Title"
              className="w-full p-3 border rounded-md"
              value={formData[sectionKey]?.[0]?.title || ""}
              onChange={(e) => handleExperienceUpdate("title", e.target.value)}
            />

            <input
              type="text"
              placeholder="Company"
              className="w-full p-3 border rounded-md"
              value={formData[sectionKey]?.[0]?.company || ""}
              onChange={(e) => handleExperienceUpdate("company", e.target.value)}
            />

            <textarea
              rows={4}
              placeholder="Key responsibilities..."
              className="w-full p-3 border rounded-md"
              value={formData[sectionKey]?.[0]?.desc || ""}
              onChange={(e) => handleExperienceUpdate("desc", e.target.value)}
            />
          </div>
        );

      case 5:
        return (
          <div>
            <textarea
              rows={5}
              placeholder="Your achievements..."
              className="w-full p-3 border rounded-md"
              value={formData.achievements[0] || ""}
              onChange={(e) =>
                updateFormData("achievements", 0, e.target.value)
              }
            />
          </div>
        );

      default:
        return <div>Preview not available</div>;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center mb-6 text-xl font-bold text-gray-900">
        <span className="flex items-center justify-center w-8 h-8 mr-3 text-sm text-white bg-yellow-500 rounded-full">
          {currentStep + 1}
        </span>
        {steps[currentStep]?.title}
      </h2>

      <div className="mb-6">{renderStepContent()}</div>

      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="px-5 py-2 text-gray-700 bg-gray-300 rounded-md"
        >
          Previous
        </button>

        {currentStep === steps.length - 1 ? (
          <button
            onClick={downloadPDF}
            className="px-6 py-2 font-medium text-white bg-yellow-500 rounded-md"
          >
            Download PDF
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 font-medium text-white bg-yellow-500 rounded-md"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default FormSection;
