"use client";
import React, { useState } from 'react';

function UploadYourCV() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      console.log("File selected:", e.target.files[0].name);
    }
  };

  const handleUseBuildResume = () => {
    console.log("Use Build Resume clicked");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Find Your Perfect Job
          </h1>
          <p className="text-gray-600 text-sm">
            Upload your CV and discover opportunities matched to your skills.
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-12">
          {/* Upload Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-yellow-400 w-16 h-16 rounded-xl flex items-center justify-center">
              <svg 
                className="w-8 h-8 text-gray-900" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
                />
              </svg>
            </div>
          </div>

          {/* Upload Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
            Upload Your CV
          </h2>

          {/* Upload Description */}
          <p className="text-gray-600 text-center text-sm mb-8">
            Upload your resume to get personalized job recommendations<br />
            based on your skills and experience.
          </p>

          {/* Buttons Section */}
          <div className="flex items-center justify-center gap-4 mb-6">
            {/* Choose File Button */}
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.xml"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" 
                  />
                </svg>
                Choose File
              </div>
            </label>

            {/* OR Text */}
            <span className="text-gray-500 font-medium">or</span>

            {/* Use Built Resume Button */}
            <button
              onClick={handleUseBuildResume}
              className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 border border-gray-300 shadow-sm hover:shadow-md"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              Use Built Resume
            </button>
          </div>

          {/* Supported Formats */}
          <p className="text-gray-500 text-xs text-center">
            Supported formats: PDF, DOC, DOCX (Max 2MB)
          </p>

          {/* Selected File Display */}
          {selectedFile && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm text-center">
                ✓ File selected: {selectedFile.name}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm mb-4">
            © 2025 Aspiring – Your Path to Professional Growth
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadYourCV;