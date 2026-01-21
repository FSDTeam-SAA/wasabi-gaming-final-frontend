const SchoolFounder = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-16 py-10 space-y-6 lg:flex-row md:px-16 md:space-y-0 -scroll-mt-7">
      {/* Left side: Video */}
      <div className="relative w-full h-64 overflow-hidden bg-yellow-400 rounded-lg lg:w-1/2 md:h-auto">
        <video
          className="object-cover w-full h-full"
          controls
          src="https://www.youtube.com/watch?v=qpgTC9MDx1o"
        ></video>
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black opacity-50">
          <button className="text-3xl text-white">▶</button>
        </div>
      </div>

      {/* Right side: Text */}
      <div className="w-full p-6 bg-white shadow-lg lg:w-1/2 rounded-xl inter">
        <h2 className="mb-6 text-3xl font-bold">Our Founder</h2>
        <p className="text-[#737373] text-xl">
          Hi, I’m Nathania, founder of The Aspiring Legal Network and currently
          a solicitor apprentice. When I was in sixth form, I remember feeling
          lost. I wanted to explore a career in law but there was no clear
          advice or support to help me find work experience or understand what
          steps to take next. It was confusing, overwhelming, and honestly quite
          isolating.
        </p>
        <p className="text-[#737373] text-xl mt-4">
          That is why I decided to create this community. I wanted to build a
          space where anyone with an interest in law no matter their background
          could find practical resources, real-life insights, and a supportive
          network. My hope is that by sharing knowledge and opportunities we can
          help future legal professionals feel confident and prepared as they
          take their first steps into the legal world. If you are interested in
          law or want to learn more, please join us and be part of a community
          that is here to support you every step of the way.
        </p>
      </div>
    </div>
  );
};

export default SchoolFounder;
