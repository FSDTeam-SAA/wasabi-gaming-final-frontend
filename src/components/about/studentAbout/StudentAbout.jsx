import React from "react";

import SchoolFounder from "../school/SchoolFounder";
import SchoolOurValues from "../school/SchoolOurValues";
import StudentAboutHeader from "./StudentAboutHeader";
import StudentAboutMission from "./StudentAboutMission";
import TeamSection from "../school/SchoolTeam";
import ValuesSection from "./ValuesSection";

const StudentAbout = () => {
  return (
    <div className="py-20 bg-[#FAFAFA]">
      <StudentAboutHeader />
      <StudentAboutMission />
      <SchoolFounder />
      <TeamSection></TeamSection>
      {/* <SchoolTT /> */}

      <ValuesSection></ValuesSection>
    </div>
  );
};

export default StudentAbout;
