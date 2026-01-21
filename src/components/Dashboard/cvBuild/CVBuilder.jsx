import React, { useState, useEffect } from "react";
import CVHeader from "./CVHeader";
import TemplateSelector from "./TemplateSelector";
import TipsPanel from "./TipsPanel";
import { MdArrowBack } from "react-icons/md";
import { FaCheck, FaEye, FaDownload } from "react-icons/fa";
import PersonalInfo from "./Step/PersonalInfo";
import SummaryStep from "./Step/SummaryStep";
import EducationStep from "./Step/EducationStep";
import NonLegalWorkExperience from "./Step/NonLegalWorkExperience";
import LegalWorkExperience from "./Step/LegalWorkExperience";
import LeadershipExperience from "./Step/LeadershipExperience";
import AchievementsStep from "./Step/Achievements";
import ResumePreviewModal from "./Step/ResumePreviewModal";
import { SubscriptionPlanModal } from "@/components/shared/modal/subscriptionPlan/SubscriptionPlanModal";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
const TOTAL_STEPS = 7;

const CVBuilder = () => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [completion, setCompletion] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showFinalActions, setShowFinalActions] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [showPreview, setShowPreview] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [formData, setFormData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      title: "",
      email: "",
      phone: "",
      location: "",
    },
    summary: "",
    Legal: [],
    NonLegal: [],
    Education: [],
    Leadership: [],
    Skills: [],
  });

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    const savedTemplate = localStorage.getItem("selectedTemplate");
    const savedCompleted = localStorage.getItem("completedSteps");
    const savedFinal = localStorage.getItem("showFinalActions");

    if (savedData) setFormData(JSON.parse(savedData));
    if (savedTemplate) setSelectedTemplate(savedTemplate);
    if (savedCompleted) setCompletedSteps(JSON.parse(savedCompleted));
    if (savedFinal === "true") setShowFinalActions(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
  }, [completedSteps]);

  useEffect(() => {
    localStorage.setItem("showFinalActions", showFinalActions);
  }, [showFinalActions]);

  const updateFormData = (section, value) => {
    setFormData((prev) => ({ ...prev, [section]: value }));
  };

  const steps = [
    { title: "Personal Information" },
    { title: "Summary" },
    { title: "Legal Work Experience" },
    { title: "Non-Legal Work Experience" },
    { title: "Education Level" },
    { title: "Leadership Experience" },
    { title: "Achievements" },
  ];

  const updateCompletion = (stepIndex) => {
    const base = 10;
    const percent = base + Math.round(((stepIndex + 1) / TOTAL_STEPS) * 90);
    setCompletion(percent);
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const handleNext = () => {
    if (currentStep === 6) {
      if (!completedSteps.includes(6)) {
        setCompletedSteps((prev) => [...prev, 6]);
      }
      setShowFinalActions(true);
      showToast("CV Saved Successfully!");
      return;
    }

    if (!completedSteps.includes(currentStep)) {
      let isValid = true;
      switch (currentStep) {
        case 2:
          isValid = formData.Legal.some(
            (e) => e.jobTitle && e.organisation && e.startYear
          );
          break;
        case 3:
          isValid = formData.NonLegal.some(
            (e) => e.jobTitle && e.organisation && e.startYear
          );
          break;
        case 4:
          isValid = formData.Education.some(
            (e) => e.level && e.institution && e.startYear
          );
          break;
        case 5:
          isValid = formData.Leadership.some(
            (e) => e.title && e.organization && e.date
          );
          break;
        default:
          isValid = true;
      }
      if (isValid) setCompletedSteps((prev) => [...prev, currentStep]);
    }

    const next = Math.min(currentStep + 1, steps.length - 1);
    setCurrentStep(next);
    updateCompletion(next);
  };

  const handlePrev = () => {
    const prev = Math.max(currentStep - 1, 0);
    setCurrentStep(prev);
    updateCompletion(prev);
  };

  const handleStepClick = (idx) => {
    setCurrentStep(idx);
    updateCompletion(idx);
  };

  const handlePreview = () => {
    setShowPreview(true);
    console.log("Preview CV:", formData);
  };

  const handleDownload = () => {
    // Show subscription modal instead of directly downloading
    setShowSubscriptionModal(true);
    console.log("Download PDF clicked - showing subscription modal");
  };

  const handlePlanSelect = (planType) => {
    console.log(`User selected plan: ${planType}`);
    // Here you can handle the plan selection logic
    // For example, redirect to payment page, set user plan, etc.

    if (planType === "premium") {
      // If user selects premium, you can proceed with download
      console.log("Proceeding with PDF download for premium user");
      // Add your actual download logic here
    }
  };

  // Initial Template Screen
  if (currentStep === -1) {
    return (
      <div className="p-4 bg-white md:p-16">
        <div className="mx-auto">
          <header className="mb-6">
            <h1 className="text-3xl font-semibold main-color poppins">
              CV Builder
            </h1>
            <p className="text-[#4A5565] poppins text-base pt-2">
              Create a professional resume that stands out to employers.
            </p>
          </header>

          <CVHeader completion={0} />

          <section className="mt-8">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
            />
          </section>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setCurrentStep(0);
                setCompletion(10);
              }}
              disabled={!selectedTemplate}
              className={`px-6 py-3 rounded-xl text-black font-semibold transition poppins
                ${
                  selectedTemplate
                    ? "bg-[#FFFF00] hover:bg-[#ffff0e]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              Next
            </button>
          </div>
          <div className="block lg:col-span-3">
            <TipsPanel />
          </div>
        </div>

        {/* Subscription Modal */}
        <SubscriptionPlanModal
          visible={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
          onSelectPlan={handlePlanSelect}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-white md:p-12">
      <div className="w-full">
        <header className="flex flex-col items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setCurrentStep(-1);
                setCompletion(0);
              }}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-yellow-600"
            >
              <MdArrowBack className="text-xl" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">CV Builder</h1>
          </div>
          <p className="hidden text-gray-600 md:block">
            Create a professional resume that stands out to employers.
          </p>
        </header>

        <CVHeader completion={completion} />

        <div className="flex flex-row justify-between w-full gap-6 p-12">
          {/* Sidebar */}
          <aside className="w-1/3 p-4 bg-white border border-[#0000001A] shadow-sm rounded-2xl relative">
            <h3 className="pl-2 mb-3 text-lg font-bold main-color inter">
              Sections
            </h3>

            <div className="space-y-2">
              {steps.map((step, idx) => {
                const isActive = idx === currentStep;
                const isCompleted = completedSteps.includes(idx);

                return (
                  <div
                    key={idx}
                    onClick={() => handleStepClick(idx)}
                    className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      isActive
                        ? "bg-yellow-50 border border-yellow-400"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-6 h-6 mr-3 text-xs font-medium rounded-full ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "yellow text-black"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {isCompleted ? (
                        <IoMdCheckmarkCircleOutline size={15} />
                      ) : (
                        idx + 1
                      )}
                    </div>
                    <span className="text-sm font-medium">{step.title}</span>
                  </div>
                );
              })}
            </div>

            {/* Final Actions - Show after Save */}
            {showFinalActions && (
              <div className="pt-4 mt-6 space-y-3 border-t">
                <button
                  onClick={handlePreview}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#FFFF00] text-black font-medium rounded-xl hover:bg-[#ffff0e] transition"
                >
                  <FaEye /> Preview Resume
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 font-medium text-gray-700 transition bg-gray-100 rounded-xl hover:bg-gray-200"
                >
                  <FaDownload /> Download PDF
                </button>
              </div>
            )}
          </aside>

          {/* Step Renderer */}
          <main className="w-2/3">
            <div className="p-6 bg-white border border-[#0000001A] shadow-sm md:p-10 rounded-2xl">
              {currentStep === 0 && (
                <PersonalInfo
                  data={formData.personal}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                />
              )}
              {currentStep === 1 && (
                <SummaryStep
                  data={formData.summary}
                  setFormData={setFormData}
                  onNext={handleNext}
                  onBack={handlePrev}
                />
              )}
              {currentStep === 2 && (
                <LegalWorkExperience
                  data={formData.Legal}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  onPrev={handlePrev}
                />
              )}
              {currentStep === 3 && (
                <NonLegalWorkExperience
                  data={formData.NonLegal}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  onPrev={handlePrev}
                />
              )}
              {currentStep === 4 && (
                <EducationStep
                  data={formData.Education}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  onPrev={handlePrev}
                />
              )}
              {currentStep === 5 && (
                <LeadershipExperience
                  data={formData.Leadership}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  onPrev={handlePrev}
                />
              )}
              {currentStep === 6 && (
                <AchievementsStep
                  data={formData.Skills}
                  updateFormData={updateFormData}
                  onNext={handleNext}
                  onPrev={handlePrev}
                />
              )}
            </div>
          </main>
        </div>

        <aside className="hidden lg:block lg:col-span-3">
          <TipsPanel />
        </aside>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed flex items-center gap-2 px-6 py-3 text-white bg-green-600 shadow-lg bottom-6 right-6 rounded-xl animate-pulse">
          <FaCheck /> {toast.message}
        </div>
      )}

      <ResumePreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
      />

      {/* Subscription Modal */}
      <SubscriptionPlanModal
        visible={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSelectPlan={handlePlanSelect}
      />
    </div>
  );
};

export default CVBuilder;
