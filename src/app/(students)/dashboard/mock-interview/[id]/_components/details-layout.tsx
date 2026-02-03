"use client";
import React, { useState } from "react";
import MockInterviewDetails from "./mock-interview-details";
import Interview from "./interview";

const DetailsLayout = () => {
  const [showInterview, setShowInterview] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleProceed = async (interviewData: any) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mock-interview-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${interviewData.token}`,
          },
          body: JSON.stringify({
            category: "Technical Interview",
            questionNumber: "5",
          }),
        },
      );

      const result = await response.json();
      if (result.success) {
        setSessionData(result.data.session);
        setShowInterview(true);
      } else {
        throw new Error(result.message || "Failed to create session");
      }
    } catch (error) {
      console.error("Error creating session:", error);
      alert("Failed to start interview session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      {!showInterview ? (
        <MockInterviewDetails onProceed={handleProceed} />
      ) : (
        <Interview
          sessionData={sessionData}
          onBack={() => setShowInterview(false)}
        />
      )}
    </div>
  );
};

const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 border-t-4 rounded-full border-primary solid border- animate-spin"></div>
      <p className="text-lg font-semibold text-gray-700">
        Setting up your interview session...
      </p>
    </div>
  </div>
);

export default DetailsLayout;
