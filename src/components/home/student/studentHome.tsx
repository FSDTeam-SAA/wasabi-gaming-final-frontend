import StudentHero from "./StudentHero";
import Sponser from "./Sponser";
import Build from "./Build";
import DashboardDemo from "./DashboardDemo";
import TestimonialCarousel from "./TestimonialCarousel";
import PricingPage from "./PricingPage";
import FAQSection from "./FAQSection";
import StudentHeroSec from "../student-sec/StudentHeroSec";
import HowItWorks from "../student-sec/HowItWorks";
import LunchCareer from "../student-sec/LunchCareer";
import Opportunities from "../student-sec/Opportunities";

const StudentHome = () => {
  return (
    <div style={{background: "linear-gradient(175deg, #FDF063 -4.84%, #FEFBDD 105.75%)"}}>
      <StudentHeroSec />
      <LunchCareer />
      <HowItWorks />
      <Opportunities />
      <Sponser />
      {/* <Build></Build> */}
      {/* <DashboardDemo></DashboardDemo> */}
      <TestimonialCarousel></TestimonialCarousel>
      {/* <PricingPage></PricingPage> */}
      <FAQSection></FAQSection>
    </div>
  );
};

export default StudentHome;
