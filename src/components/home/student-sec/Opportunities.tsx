import { IMAGES } from "@/assets";
import React from "react";

const achievements = [
  {
    id: 1,
    image: IMAGES.achievement1,
    title: "Think Like a Lawyer with Broadfield",
    subtitle: "BroadfieldStudents worked through legal problems and learned how lawyers analyse information and build arguments.",
  },
  {
    id: 2,
    image: IMAGES.achievement2,
    title: "Think Like a Legal Recruiter and Lawyer with Freshfields",
    subtitle: "Students learned how law firms assess candidates, what recruiters look for, and how the role of a lawyer works in practice.",
  },
  {
    id: 3,
    image: IMAGES.achievement3,
    title: "Think Like a Legal Recruiter with DWF",
    subtitle: "Students gained practical guidance on applications, assessment centres and standing out as a candidate.",
  },
  {
    id: 4,
    image: IMAGES.achievement4,
    title: "Negotiation Workshop with White & Case",
    subtitle: "Students learned how negotiations work in practice, how to prepare effectively, and how to communicate their position clearly.",
  },
];

const Opportunities = () => {
  return (
    <div className="py-16 pt-0 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-12 neuton">
          Recent achievements
        </h2>

        {/* Achievements Carousel/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 neuton">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                {/* Image */}
                <div className="aspect-w-3 aspect-h-4 overflow-hidden">
                  <img
                    src={item.image.src}
                    alt={item.title}
                    className="w-full h-96 object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Text Content */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Opportunities;