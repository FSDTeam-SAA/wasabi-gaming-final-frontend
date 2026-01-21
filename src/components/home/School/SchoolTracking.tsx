import { ICONS } from "../../../assets";
import Icon from "../../shared/icon/Icon";
import Title from "../../shared/title/Title";

const breifItems = [
  {
    icons: ICONS.clockIcon,
    title: "Application Timeline",
    desciption:
      "Track every application from submission to offer with real-time status updates",
  },
  {
    icons: ICONS.rightIcon,
    title: "Milestone Completion",
    desciption:
      "Monitor student progress through key career development milestones",
  },
  {
    icons: ICONS.warningIcon,
    title: "Early Intervention Alerts",
    desciption:
      "Get notified when students need additional support or guidance",
  },
  {
    icons: ICONS.progressIcon,
    title: "Performance Metrics",
    desciption:
      "Analyze student performance data and identify improvement areas",
  },
  {
    icons: ICONS.usersIcon,
    title: "Cohort Comparison",
    desciption:
      "Compare student outcomes across different cohorts and programs",
  },
  {
    icons: ICONS.messionIcon,
    title: "Goal Achievement",
    desciption:
      "Track progress toward individual and institutional career goals",
  },
];

const SchoolTracking = () => {

  return (
    <div className="px-4 md:px-8 lg:px-12 py-5 md:py-8 lg:py-20 bg-[#FFFEF0]">
      <Title heading={"Real Time Student Data Tracking"} description={"Monitor every aspect of student career development with comprehensive real-time tracking"} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
        {breifItems.map((item) => (
          <div key={item.icons.src} className="border-2 border-[#E5E5E5] p-8 rounded-3xl">
            {/* <div className="bg-primary size-16 rounded-3xl mb-6">
              <img
                className="p-4 size-16"
                src={item.icons}
                alt="monitorIcon"
              />
            </div> */}
            <Icon icon={item.icons.src} size={64} radious="rounded-3xl" mb="mb-6" p={16} />

            <h1 className="font-normal text-xl mb-3">
              {item.title}
            </h1>
            <p className="text-[#666666]">
              {item.desciption}
            </p>
          </div>
        ))}
      </div>
      <div className="text-center pt-12">

        <button className="btn yellow text-sm font-semibold py-2 px-8 rounded-2xl">View All Features</button>
      </div>
    </div>
  );
};

export default SchoolTracking;
