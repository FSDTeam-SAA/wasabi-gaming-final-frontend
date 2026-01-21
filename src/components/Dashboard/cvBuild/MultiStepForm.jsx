// MultiStepForm.jsx
import React, { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import Summary from "./Summary";
import Education from "./Education";
import Experience from "./Experience";

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState("personal");

  const [formData, setFormData] = useState({
    personalName: "",
    personalEmail: "",
    summary: "",
    education: "",
    experience: ""
  });

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderStep = () => {
    switch (activeStep) {
      case "personal":
        return <PersonalInfo formData={formData} updateField={updateField} />;

      case "summary":
        return <Summary formData={formData} updateField={updateField} />;

      case "education":
        return <Education formData={formData} updateField={updateField} />;

      case "experience":
        return <Experience formData={formData} updateField={updateField} />;

      default:
        return null;
    }
  };

  return (
    <div className="flex w-full gap-6 p-6">
      {/* Sidebar */}
      <div className="w-1/4 p-4 bg-white shadow rounded-xl">
        <button onClick={() => setActiveStep("personal")} className="block w-full py-2">Personal Info</button>
        <button onClick={() => setActiveStep("summary")} className="block w-full py-2">Summary</button>
        <button onClick={() => setActiveStep("education")} className="block w-full py-2">Education</button>
        <button onClick={() => setActiveStep("experience")} className="block w-full py-2">Experience</button>
      </div>

      {/* Form Content */}
      <div className="w-3/4">{renderStep()}</div>
    </div>
  );
};

export default MultiStepForm;
