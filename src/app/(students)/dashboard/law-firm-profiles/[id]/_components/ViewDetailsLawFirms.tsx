import React from 'react';

function ViewDetailsLawFirms() {
  // Dummy data
  const firmData = {
    _id: "6937e00d25d4dcb2360e570b",
    aboutFirm: "Broadfields Law is a leading corporate law firm with over 30 years of experience. We specialize in complex mergers and acquisitions, corporate restructuring, and commercial law. Our team of expert lawyers delivers innovative solutions to our clients' most challenging legal issues.",
    expertise: "Intellectual Property, Commercial Litigation, Arbitration",
    internshipTraining: "Interns receive hands-on training with senior lawyers and exposure to international cases.",
    description: "We are recognized for our strong litigation team and successful track record in IP matters.",
    logo: "https://res.cloudinary.com/dlpdumtua/image/upload/v1765269516/Note/1765269514237-sign_up.png.png",
    createBy: "6936716565309e6c62711faa",
    status: "approved",
    applyNumber: [],
    location: "Phnom Penh, Cambodia",
    contactEmail: "broadfields@broadfields.law",
    phone: "+855 23 456 7891",
    website: "www.broadfieldscambodia.com",
    establishedYear: 2012,
    employees: "200+ employees",
    createdAt: "2025-12-09T08:38:37.324Z",
    updatedAt: "2025-12-09T08:38:37.324Z",
    firmName: "Broadfields Law",
    subtitle: "Expertise in all Corporate Law",
    foundedNGO: "Founded NGO",
    practiceAreas: [
      { icon: "briefcase", name: "Practice Areas", detail: "Corporate Law" },
      { icon: "business", name: "M&A" },
      { icon: "gavel", name: "Commercial" },
      { icon: "chart", name: "Banking & Finance" }
    ],
    keyHighlights: [
      "Founded 8 years",
      "Ranked Top 50 Law Firm",
      "Exceptional Practice",
      "Awards Winning Firm",
      "Innovative Technology"
    ],
    recentAwards: {
      title: "Recent Annual Revenue",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially.",
      url: "http://www.lbcpgroup.com"
    },
    recentWork: {
      title: "Recent Work",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially.",
      url: "http://www.lbcpgroup.com"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-8">
        <div className="max-w-7xl mx-auto px-6 pt-6">
          {/* Back Button */}
          <button className="flex items-center text-gray-600 mb-6 hover:text-gray-800 text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Law Firms
          </button>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm p-8 relative">
            {/* Featured Positions Badge */}
            <div className="absolute top-6 right-6">
              <span className="bg-yellow-300 text-black text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                Featured Position
              </span>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-5 w-20 h-20 flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
            </div>

            {/* Title and Info */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{firmData.firmName}</h1>
              <p className="text-sm text-gray-600 mb-4">{firmData.subtitle}</p>
              
              {/* Stats Row */}
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-6">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Location, UK
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                  </svg>
                  {firmData.employees}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                  </svg>
                  {firmData.foundedNGO}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                  </svg>
                  8 open positions
                </span>
              </div>

              {/* Tags */}
              <div className="flex items-center justify-center gap-3 text-sm mb-6">
                <span className="text-gray-600">Corporate law</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-600">M&A</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-600">Commercial</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-600">Banking & Finance</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-3 gap-8 border-t border-gray-100 pt-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">broadfields@broadfields.law</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Website</p>
                  <p className="text-sm font-medium text-teal-600">Lawgroupbroadfieldscam.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">+44 20 123 4567</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
              <button className="flex-1 bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition-colors">
                Overview
              </button>
              <button className="flex-1 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors">
                Open Positions (3)
              </button>
              <button className="flex-1 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors">
                Cultures & Benefits
              </button>
              <button className="w-12 h-12 border-2 border-gray-200 hover:border-gray-300 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">About Broadfields Law</h2>
              <p className="text-gray-700 leading-relaxed mb-8">{firmData.aboutFirm}</p>
              
              <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                {/* Left Column */}
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Practice Areas</p>
                      <p className="text-sm text-gray-600">Corporate Law</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">M&A</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Commercial</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Banking & Finance</p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Key Highlights</p>
                      <p className="text-sm text-gray-600">Founded 8 years</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Ranked Top 50 Law Firm</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Awards Winning Firm</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Innovative Technology</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Annual Revenue */}
            <div className="border-t border-gray-100 pt-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{firmData.recentAwards.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{firmData.recentAwards.description}</p>
                  <a href={firmData.recentAwards.url} className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                    URL Link: {firmData.recentAwards.url}
                  </a>
                </div>
              </div>
            </div>

            {/* Recent Work */}
            <div className="border-t border-gray-100 pt-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-1 12H5V8h14v10z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{firmData.recentWork.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{firmData.recentWork.description}</p>
                  <a href={firmData.recentWork.url} className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                    URL Link: {firmData.recentWork.url}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Your Career Strengths */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Your Career Strengths</h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    Based on your preferences you match, you and a analysis profiling and problem solving test as much to you appreciated the not smart
                  </p>
                  <button className="w-full bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition-colors">
                    Try my Vise Fit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-teal-500 hover:bg-teal-600 rounded-full shadow-lg flex items-center justify-center text-white transition-all hover:scale-110">
        <span className="text-xl font-bold">T</span>
      </button>

      {/* Bottom View Only Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-gray-700 to-gray-800 text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
          <p className="text-sm font-medium">You can only view and comment on this file.</p>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailsLawFirms;