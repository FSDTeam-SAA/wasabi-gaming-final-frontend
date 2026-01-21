"use client";
import React from "react";
import ChooseCvStyle from "./choose-cv-style";
import Sections from "./sections";
import PersonalInfo from "./personal-info";
import { useFormState } from "./state/useFormState";
import LegalWorkExperience from "./legal-work-experience";

const CvMakingForm = () => {
  const { isActive } = useFormState();

  console.log("isActive: ", isActive);

  return (
    <div className="space-y-6">
      <ChooseCvStyle />

      <div className="flex items-start gap-5">
        <div className="lg:w-[30%]">
          <Sections />
        </div>

        <div className="flex flex-1">
          {isActive === "Personal Information" && <PersonalInfo />}
          {isActive === "Legal Work Experience" && <LegalWorkExperience />}
          {isActive === "Summary" && <div>Summary Component</div>}
          {isActive === "Non Legal Work Experience" && (
            <div>Non Legal Work Experience Component</div>
          )}
          {isActive === "Education Level" && (
            <div>Education Level Component</div>
          )}
          {isActive === "Leadership Experience" && (
            <div>Leadership Experience Component</div>
          )}
          {isActive === "Achievements" && <div>Achievements Component</div>}
        </div>
      </div>
    </div>
  );
};

export default CvMakingForm;
