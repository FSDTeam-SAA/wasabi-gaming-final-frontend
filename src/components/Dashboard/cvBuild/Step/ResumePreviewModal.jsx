import React from "react";

const ResumePreviewModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm poppins">
      <div className="w-full max-w-5xl mx-4 overflow-hidden bg-white shadow-2xl rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b bg-gray-50">
          <h2 className="text-sm font-medium text-gray-700">
            CV Preview – Modern Style
          </h2>
          <button
            onClick={onClose}
            className="text-lg font-semibold text-gray-400 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Resume Content */}
        <div className="flex justify-center p-10 bg-gray-100">
          <div className="w-full max-w-3xl p-8 bg-white rounded-md shadow-md">
            {/* Name & Contact */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
              <p className="text-sm font-medium text-gray-700">
                Software Engineer
              </p>
              <p className="mt-1 text-sm text-gray-600">
                johndoe@gmail.com • +1 234 567 8900 • San Francisco, CA
              </p>
              <div className="h-[2px] bg-yellow-400 mt-3 w-20"></div>
            </div>

            {/* Professional Summary */}
            <section className="mb-6">
              <h3 className="mb-1 font-semibold text-gray-800">
                Professional Summary
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                Experienced software engineer with 5+ years of expertise in
                full-stack development. Passionate about building scalable
                applications and leading high-performing teams.
              </p>
            </section>

            {/* Work Experience */}

            <section className="mb-6">
              <h3 className="mb-2 font-semibold text-gray-800">
                {" "}
                Work Experience
              </h3>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Senior Developer
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    Led development of cloud-based applications. <br />
                    Mentored junior developers and improved team productivity by
                    30%.
                  </p>
                </div>
                <p className="text-sm text-right text-gray-500">
                  2015 – present
                </p>
              </div>
            </section>
            {/* Education */}
            <section className="mb-6">
              <h3 className="mb-2 font-semibold text-gray-800">Education</h3>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Bachelor of Science in Computer Science
                  </p>
                  <p className="text-sm text-gray-600">
                    University of Technology
                  </p>
                </div>
                <p className="text-sm text-right text-gray-500">2015 – 2019</p>
              </div>
            </section>

            {/* Skills */}
            <section>
              <h3 className="mb-2 font-semibold text-gray-800">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript",
                  "React",
                  "Python",
                  "TypeScript",
                  "Node.js",
                  "SQL",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs text-gray-700 border border-yellow-300 rounded-full bg-yellow-50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewModal;
