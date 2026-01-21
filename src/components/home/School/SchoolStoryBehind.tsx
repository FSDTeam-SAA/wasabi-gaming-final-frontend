import { IMAGES } from "../../../assets";
import Title from "../../shared/title/Title";

const brands = [
  {
    name: "BBC",
    icon: IMAGES.bbc,
  },
  {
    name: "Channel 4",
    icon: IMAGES.four,
  },
  {
    name: "Google",
    icon: IMAGES.google,
  },
  {
    name: "Education First",
    icon: IMAGES.ef,
  },
];

const SchoolStoryBehind = () => {

  return (
    <div className="py-5 md:py-8 lg:py-20 md:max-w-4xl mx-auto px-4 lg:px-0">
      <Title
        heading="Story Behind The Aspiring Legal Network"
        description="Meet Nathania Olajide, the CEO"
      />

      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="h-[560px] w-full md:w-1/2 overflow-hidden flex items-center justify-center yellow rounded-3xl">
          <img
            src={IMAGES.storyBehind.src}
            alt="img"
            className="w-full h-[560px] object-cover p-1 rounded-3xl object-center"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-[#1E1E1E] text-2xl">Nathania Olajide</h1>
          <h4 className="description text-lg mt-2">Founder & CEO</h4>

          <div className="space-y-4 mt-4">
            <p className="description">
              "I founded Apprentago with a simple mission: to ensure every
              student has the support and tools they need to launch a successful
              career."
            </p>
            <p className="description">
              "Having worked in education for over 15 years, I witnessed
              firsthand the challenges schools face in tracking student
              outcomes. Our platform bridges that gap with innovative technology
              and data-driven insights."
            </p>
            <p className="description">
              "Today, we're proud to support hundreds of institutions and
              thousands of students on their journey to career success."
            </p>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-[#E5E5E5] py-12 space-y-8 mt-12">
        <h1 className="description text-xl text-center">
          Trusted by leading organisations
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {brands?.map((brand) => (
            <div
              key={brand.name}
              className="px-10 py-4 bg-[#FFFEF0] space-y-1 text-center border-2 border-[#E5E5E5] rounded-2xl"
            >
              <h1 className="text-[#1E1E1E]">{brand.name}</h1>
              <img
                className="max-w-[70px] max-h-[32px] mx-auto"
                src={brand.icon.src}
                alt="icon"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchoolStoryBehind;
