import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface OpenPosition {
  _id: string;
  title: string;
  location: string;
  companyName: string;
  companyType: string | null;
  postedBy: string;
  level: string;
  salaryRange: string;
  startDate: string;
  applicationDeadline: string;
  jobId: string;
  jobStatus: string;
  description: string;
  status: string;
  requiredSkills: string[];
  createBy: string;
  url: string;
  companyId: string;
  applicants: any[];
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: OpenPosition[];
}

function ShowOpenPosition({ firmName }: { firmName?: string }) {
  const [selectedPosition, setSelectedPosition] = useState<OpenPosition | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: response, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ['open-positions', firmName],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lawfirm/law-firm-based-job?firmName=${firmName}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!res.ok) {
        throw new Error('Failed to fetch open positions');
      }
      return res.json();
    },
    enabled: !!firmName,
  });

  const openPositions = response?.data || [];

  // Handle view details click
  const handleViewDetails = (position: OpenPosition) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPosition(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-48"></div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200">
        <svg
          className="w-16 h-16 text-red-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Positions</h3>
        <p className="text-gray-600">Please try again later</p>
      </div>
    );
  }

  // Empty state
  if (openPositions.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
        <svg
          className="w-16 h-16 text-gray-300 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Open Positions</h3>
        <p className="text-gray-600">There are currently no open positions at this firm.</p>
      </div>
    );
  }

  // Format date helper function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `Posted ${day}/${month}/${year}`;
  };

  return (
    <>
      <div className="space-y-4">
        {openPositions.map((position) => (
          <div
            key={position._id}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all hover:border-gray-300"
          >
            {/* Header */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{position.title}</h3>

              {/* Badges Row */}
              <div className="flex items-center gap-3 flex-wrap mb-4">
                <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200">
                  Corporate Law
                </span>
                <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
                  {position.jobStatus === 'Open' ? 'Full time' : position.jobStatus}
                </span>
                <span className="bg-purple-50 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full border border-purple-200">
                  {position.level || 'Mid'}
                </span>
              </div>

              {/* Info Row */}
              <div className="flex items-center gap-6 text-sm text-gray-600 flex-wrap">
                {/* Location */}
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span className="font-medium">{position.location || 'Worldwide'}</span>
                </div>

                {/* Salary */}
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                  </svg>
                  <span className="font-medium">
                    {position.salaryRange || '£80,000 - £120,000'}
                  </span>
                </div>

                {/* Posted Date */}
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                  </svg>
                  <span>{formatDate(position.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {position.description ||
                'We are seeking an experienced corporate lawyer to join our dynamic team.'}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* <button className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm">
                Apply Now
              </button> */}
              <button 
                onClick={() => handleViewDetails(position)}
                className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedPosition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">Job Details</h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Title & Company */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedPosition.title}</h3>
                <p className="text-lg text-gray-600">{selectedPosition.companyName}</p>
              </div>

              {/* Status Badges */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  selectedPosition.jobStatus === 'Open' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {selectedPosition.jobStatus}
                </span>
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                  {selectedPosition.level}
                </span>
              </div>

              {/* Key Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-semibold text-gray-900 flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      {selectedPosition.location}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Salary Range</p>
                    <p className="font-semibold text-gray-900 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                      </svg>
                      {selectedPosition.salaryRange}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Job ID</p>
                    <p className="font-semibold text-gray-900">{selectedPosition.jobId}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Start Date</p>
                    <p className="font-semibold text-gray-900">{selectedPosition.startDate}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Application Deadline</p>
                    <p className="font-semibold text-red-600">{selectedPosition.applicationDeadline}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Posted By</p>
                    <p className="font-semibold text-gray-900">{selectedPosition.postedBy}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Job Description</h4>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedPosition.description}
                </p>
              </div>

              {/* Required Skills */}
              {selectedPosition.requiredSkills && selectedPosition.requiredSkills.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPosition.requiredSkills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* External Link */}
              {selectedPosition.url && (
                <div className="border-t border-gray-200 pt-6">
                  <a
                    href={selectedPosition.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Original Posting
                  </a>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <button className="flex-1 bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg transition-colors">
                  Apply Now
                </button>
                <button 
                  onClick={handleCloseModal}
                  className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShowOpenPosition;