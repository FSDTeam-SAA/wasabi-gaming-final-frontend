import SchoolBreif from "./SchoolBreif";
import SchoolFAQ from "./SchoolFAQ";
import SchoolHero from "./SchoolHero";
import SchoolStoryBehind from "./SchoolStoryBehind";
import SchoolTracking from "./SchoolTracking";
import SchoolTransparentProgress from "./SchoolTransparentProgress";

const SchoolHome = () => {
  return (
    <div>
      <SchoolHero />
      <SchoolBreif />
      <SchoolTransparentProgress />
      <SchoolTracking />
      <SchoolStoryBehind />
      <SchoolFAQ />
    </div>
  );
};

export default SchoolHome;
