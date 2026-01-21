import { ICONS, IMAGES } from "../../../assets";

const SchoolHero = () => {
  return (
    <div className="w-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden">
      <div className="relative flex flex-col md:flex-row items-center justify-between px-4 md:px-8 lg:px-12 py-6 gap-5 md:py-8 lg:py-10">
        {/* Left Section - Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
          {/* Badge */}
          <div className="badge bg-[#FFFF00] mb-4 px-4 rounded-full">
            ✨ Transform Student Success
          </div>
          {/* Heading */}
          <h1 className="text-3xl lg:text-5xl text-base-content mb-4">
            <div className="mb-2">Helping schools</div> track students{" "}
            <span className="bg-primary rounded-2xl px-2">careers</span>
          </h1>
          {/* Subtext */}
          <p className="text-sm md:text-base lg:text-lg text-base-content/70 mb-6 max-w-md mx-auto md:mx-0">
            Monitor, support, and report on student career development with
            powerful insights and real-time tracking capabilities.
          </p>
          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <button className="btn bg-primary text-black font-semibold py-2 px-4 md:py-3 md:px-6 rounded-2xl transition-colors duration-300">
              Get Started
            </button>
            <button className="btn border-2 border-[#E5E5E5] normal-case py-2 px-4 md:py-3 md:px-6 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
              >
                <path
                  d="M0.667969 2.00072C0.667899 1.76612 0.729732 1.53565 0.847225 1.33258C0.964717 1.12952 1.13371 0.961047 1.33714 0.844185C1.54056 0.727322 1.77122 0.666203 2.00583 0.667C2.24043 0.667796 2.47067 0.73048 2.6733 0.848721L10.6713 5.51405C10.8731 5.63117 11.0407 5.79922 11.1573 6.00139C11.2738 6.20356 11.3353 6.43278 11.3355 6.66615C11.3357 6.89951 11.2746 7.12883 11.1584 7.33121C11.0422 7.53358 10.8749 7.70192 10.6733 7.81939L2.6733 12.4861C2.47067 12.6043 2.24043 12.667 2.00583 12.6678C1.77122 12.6686 1.54056 12.6075 1.33714 12.4906C1.13371 12.3737 0.964717 12.2053 0.847225 12.0022C0.729732 11.7991 0.667899 11.5687 0.667969 11.3341V2.00072Z"
                  stroke="#1E1E1E"
                  strokeWidth="1.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Watch Demo
            </button>
          </div>

          <div className="md:flex items-center gap-6">
            <div className="relative flex items-center justify-center md:justify-start">
              {[1, 2, 3, 4].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center w-12 h-12 bg-primary border-4 border-white rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.15)]"
                  style={{ marginLeft: i !== 0 ? "-10px" : "0" }}
                >
                  <img src={ICONS.starIcon.src} alt="star icon" className="w-5 h-5" />
                </div>
              ))}
            </div>
            <h5 >Trusted by schools nationwide</h5>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src={IMAGES.schoolBanner.src}
            alt="School banner"
            className="object-contain w-full max-w-[300px] md:max-w-[400px] lg:max-w-[700px] p-2 bg-primary rounded-3xl h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default SchoolHero;
