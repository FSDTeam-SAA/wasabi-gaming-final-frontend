import React from "react";
import ChooseCvStyle from "./choose-cv-style";
import Sections from "./sections";
import PersonalInfo from "./personal-info";

const CvMakingForm = () => {
  return (
    <div className="space-y-6">
      <ChooseCvStyle />

      <div className="flex items-start gap-5">
        <div className="lg:w-[30%]">
          <Sections />
        </div>

        <div className="flex flex-1">
          <PersonalInfo />
        </div>
      </div>
    </div>
  );
};

export default CvMakingForm;
