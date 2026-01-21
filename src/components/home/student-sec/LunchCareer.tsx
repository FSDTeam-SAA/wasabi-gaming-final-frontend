import { useState } from "react";
import { IMAGES } from "@/assets";
import JoinCommunityModal from "@/components/shared/modal/joinCommunityModal/JoinCommunityModal";

function LaunchCareer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinSuccess = (userData: any) => {
    console.log("User joined community from LaunchCareer:", userData);
    // You can add any specific logic for LaunchCareer here
  };

  const galleryImages = [
    IMAGES.Afreen || IMAGES.lunchCareer, // top-left
    IMAGES.Andrew || IMAGES.lunchCareer, // top-right
    IMAGES.Georgia || IMAGES.lunchCareer, // bottom-left
    IMAGES.Shaun || IMAGES.lunchCareer, // bottom-right
  ];

  return (
    <div className="w-full">
      {/* Join Community Modal */}
      <JoinCommunityModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleJoinSuccess}
        title="Join Our Career Community"
        description="Connect with professionals and get career guidance in our WhatsApp community."
        whatsAppLink="https://wa.me/1234567890"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-evenly gap-6 sm:gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex-1 max-w-full lg:max-w-2xl text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Everything You Need
              <br />
              To Launch Your Career
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-800 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              ALN brings interactive tools, and supportive community on that, so
              you can plan for your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#FFED00] text-gray-900 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto"
              >
                Start Now!
              </button>
              {/* <button 
                
                className="border-2 border-[#FFED00] text-gray-900 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-200 hover:bg-[#FFED00] w-full sm:w-auto"
              >
                Join Community
              </button> */}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 max-w-full sm:max-w-md lg:max-w-lg xl:max-w-xl mt-8 lg:mt-0">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
              <img
                src={IMAGES.lunchCareer.src}
                alt="Students collaborating"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaunchCareer;
