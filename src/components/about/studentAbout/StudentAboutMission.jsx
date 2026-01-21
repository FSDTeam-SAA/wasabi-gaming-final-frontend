import React from "react";
import { ICONS } from "../../../assets";
import Icon from "../../shared/icon/Icon";

const schoolInfos = [
  {
    icon: ICONS.star,
    number: "100%",
    title: "Satisfaction rate",
  },
  {
    icon: ICONS.features,
    number: "10+",
    title: "Optimised Interactive Tools",
  },
  {
    icon: ICONS.euro,
    number: "10+",
    title: "Law Firm & School Partners",
  },
  {
    icon: ICONS.usersBold,
    number: "10K+",
    title: "Aspiring Legal Professionals",
  },
];

const StudentAboutMission = () => {
  return (
    <div className="mt-16">
      <div className="max-w-[950px] mx-auto flex flex-col items-center rounded-2xl py-10 px-5 md:px-16 space-y-2 shadow-xl">
        <Icon icon={ICONS.messionIcon} radious="rounded-full " size={52} />
        <h1 className="text-3xl font-bold">Our mission</h1>
        <p className="text-[#5A5A5A] text-lg lg:text-xl text-center pt-14 inter">
          ALN brings together aspiring lawyers, current apprentices, and legal
          professionals united by a shared goal: to make the path into law
          clearer, more inclusive, and more achievable for everyone. With our
          events, mentoring, and AI-powered platform, we’ve created an
          innovative space where you can refine your applications, prepare for
          interviews, and gain the confidence to succeed. From AI mock
          interviews to our assessment centre suite, we help you build the
          skills that set you apart.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-10 px-16 mt-10 md:grid-cols-2 lg:grid-cols-4 neuton">
        {schoolInfos.map((info) => (
          <div className="flex flex-col items-center py-8 bg-white">
            <Icon icon={info.icon} radious="rounded-full" size={64} p={10} />
            <h4 className="text-center text-4xl font-bold text-[#1E1E1E] mt-8">
              {info.number}
            </h4>
            <p className="pt-2 text-base inter">{info.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAboutMission;
