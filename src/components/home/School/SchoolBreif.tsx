
import { ICONS } from "../../../assets";
import Title from "../../shared/title/Title";

const breifItems = [
  {
    icons: ICONS.monitorIcon,
    title: "Monitor Student Progress",
    desciption:
      "Track student development and career milestones in real-time with comprehensive analytics and insights.",
  },
  {
    icons: ICONS.monitorIcon,
    title: "Support and Guidance",
    desciption:
      "Provide personalized support and mentorship to guide students on their career journey effectively.",
  },
  {
    icons: ICONS.monitorIcon,
    title: "Report on Student Careers",
    desciption:
      "Generate detailed reports and analytics on student outcomes and career placement success rates.",
  },
];

const SchoolBreif = () => {

  return (
    <div className="px-4 md:px-8 lg:px-12 my-5 md:my-8 lg:my-20">
      <Title heading={"Monitor, Support and Report on Student Careers"} description={"Everything you need to track and enhance student career outcomes"} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
        {breifItems.map((item) => (
          <div key={item.icons.src} className="border-2 border-[#E5E5E5] p-8 rounded-3xl">
            <div className="bg-primary size-16 rounded-3xl mb-6">
              <img
                className="p-4 size-16"
                src={item.icons.src}
                alt="monitorIcon"
              />
            </div>
            <h1 className="font-normal text-xl mb-3">
              {item.title}
            </h1>
            <p className="text-[#666666]">
              {item.desciption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolBreif;
