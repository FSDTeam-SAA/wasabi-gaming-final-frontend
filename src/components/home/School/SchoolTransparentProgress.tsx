import { ICONS } from "../../../assets";
import Icon from "../../shared/icon/Icon";

const SchoolTransparentProgress = () => {
  const progressData = {
    applicationsSent: 85,
    interviewsScheduled: 62,
    offersReceived: 43,
    active: 142,
    placed: 98,
    successRate: 89
  };

  return (
    <div className="px-4 md:px-8 lg:px-12 py-5 md:py-8 lg:py-20 bg-[#FFFEF0] md:flex">
      <div className="space-y-6 w-full md:w-1/2">
        <h1 className="text-4xl">Transparent Student Progress</h1>
        <p className="text-lg description">
          Get complete visibility into every student's career development
          journey. Track applications, interviews, placements, and outcomes all
          in one unified dashboard.
        </p>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Icon
              icon={ICONS.assessmentComple}
              size={35}
              radious="rounded-full"
              mb="mb-0"
              p={6}
            />
            <p className="text-lg">Real-time progress tracking</p>
          </div>
          <div className="flex items-center gap-3">
            <Icon
              icon={ICONS.assessmentComple}
              size={35}
              radious="rounded-full"
              mb="mb-0"
              p={6}
            />
            <p className="text-lg">Customisable dashboards</p>
          </div>
          <div className="flex items-center gap-3">
            <Icon
              icon={ICONS.assessmentComple}
              size={35}
              radious="rounded-full"
              mb="mb-0"
              p={6}
            />
            <p className="text-lg">Automated reporting</p>
          </div>
          <div className="flex items-center gap-3">
            <Icon
              icon={ICONS.assessmentComple}
              size={35}
              radious="rounded-full"
              mb="mb-0"
              p={6}
            />
            <p className="text-lg">Data-driven insights</p>
          </div>
        </div>
        <button className="btn yellow py-2 px-4 font-semibold rounded-2xl">
          Learn More
        </button>
      </div>
      <div className="p-8 pb-44 rounded-3xl bg-white shadow-lg border-2 border-[#E5E5E5] space-y-6 flex-1 w-full mt-6 md:mt-0">
      {/* Header */}
      <div className="text-xl">Student Overview</div>

      {/* Progress Bar: Applications Sent */}
      <div className="space-y-2">
        <div className="text-sm flex justify-between">
          <span>Applications Sent</span>
          <span>{progressData.applicationsSent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="yellow h-4 rounded-full"
            style={{ width: `${progressData.applicationsSent}%` }}
          ></div>
        </div>
      </div>

      {/* Progress Bar: Interviews Scheduled */}
      <div className="space-y-2">
        <div className="text-sm flex justify-between">
          <span>Interviews Scheduled</span>
          <span>{progressData.interviewsScheduled}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-[#E5E500] h-4 rounded-full"
            style={{ width: `${progressData.interviewsScheduled}%` }}
          ></div>
        </div>
      </div>

      {/* Progress Bar: Offers Received */}
      <div className="space-y-2">
        <div className="text-sm flex justify-between">
          <span>Offers Received</span>
          <span>{progressData.offersReceived}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="yellow h-4 rounded-full"
            style={{ width: `${progressData.offersReceived}%` }}
          ></div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-evenly text-sm border-t-2 border-[#E5E5E5] pt-5">
        <div className="space-y-2">
          <div className="text-2xl text-center">{progressData.active}</div>
          <span className="text-[#666666]">Active</span>
        </div>
        <div>
          <div className="text-2xl text-center">{progressData.placed}</div>
          <span className="text-[#666666]">Placed</span>
        </div>
        <div>
          <div className="text-2xl text-center">{progressData.successRate}%</div>
          <span className="text-[#666666]">Success Rate</span>
        </div>
        {/* <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
            {progressData.successRate}%
          </div>
          <span>Success Rate</span>
        </div> */}
      </div>
    </div>
    </div>
  );
};

export default SchoolTransparentProgress;
