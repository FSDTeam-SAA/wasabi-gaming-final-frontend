import { useCallback, useState } from "react";
import {
  Button,
  Card,
  ProgressBar,
} from "../../../components/student/psychometric/PsychometricUI";
import WrittenAssessment from "../../../components/student/ai-assessment-centre/WrittenAssessment";
import InTrayEmailExercise from "../../../components/student/ai-assessment-centre/InTrayEmailExercise";
import LegalCaseStudy from "../../../components/student/ai-assessment-centre/LegalCaseStudy";
import { aiAssessmentData } from "@/components/student/ai-assessment-centre/aiAssessmentData";

const AIAssessmentCentre = () => {
  const [currentView, setCurrentView] = useState("assessmentUI");
  const [activeTest, setActiveTest] = useState(null);
  const [testSequence, setTestSequence] = useState([]);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);

  // Define the fixed sequence: Written -> InTray -> Legal
  const testSequenceOrder = [1, 2, 4]; // IDs for Written, InTray, Legal

  const handleStartSequentialFlow = useCallback(() => {
    // Create sequence based on the fixed order
    const sequence = testSequenceOrder.map(id => 
      aiAssessmentData.tests.find(test => test.id === id)
    ).filter(test => test !== undefined);
    
    console.log("Starting sequential flow:", sequence.map(t => ({id: t.id, name: t.name})));
    
    setTestSequence(sequence);
    setCurrentTestIndex(0);
    setActiveTest(sequence[0]);
    
    // Always start with Written Assessment
    setCurrentView("writtenAssessment");
  }, []);

  const handleCancelTest = useCallback(() => {
    setCurrentView("assessmentUI");
    setActiveTest(null);
    setTestSequence([]);
    setCurrentTestIndex(0);
  }, []);

  const handleSubmitTest = useCallback((submissionData) => {
    // Handle test submission logic here
    console.log("Test submitted:", submissionData);
    
    // Move to next test in sequence
    if (testSequence.length > 0 && currentTestIndex < testSequence.length - 1) {
      const nextIndex = currentTestIndex + 1;
      setCurrentTestIndex(nextIndex);
      const nextTest = testSequence[nextIndex];
      setActiveTest(nextTest);
      
      // Set view based on next test type
      if (nextTest.type === "email") {
        setCurrentView("inTrayEmail");
      } else if (nextTest.type === "legal") {
        setCurrentView("legalCaseStudy");
      }
    } else {
      // End of sequence, go back to dashboard
      setCurrentView("assessmentUI");
      setActiveTest(null);
      setTestSequence([]);
      setCurrentTestIndex(0);
    }
  }, [testSequence, currentTestIndex]);

  const AssessmentUI = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            AI Assessment Centre
          </h1>
          <p className="text-gray-600">
            Discover your cognitive strengths and ideal career paths.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {aiAssessmentData.tests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                      test.status === "completed"
                        ? "bg-purple-100"
                        : test.status === "avoiding"
                        ? "bg-red-100"
                        : "bg-pink-100"
                    }`}
                  >
                    {test.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {test.name}
                    </h3>
                    <p className="text-sm text-gray-500">{test.description}</p>
                  </div>
                </div>
                {test.status === "completed" ? (
                  <span className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-3 py-1 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_2141_427)">
                        <path
                          d="M10.9005 4.99975C11.1288 6.1204 10.9661 7.28546 10.4394 8.30065C9.91273 9.31583 9.05393 10.1198 8.00625 10.5784C6.95856 11.037 5.7853 11.1226 4.68214 10.8209C3.57897 10.5192 2.61258 9.84845 1.94413 8.92046C1.27567 7.99247 0.94555 6.86337 1.00882 5.72144C1.07209 4.57952 1.52493 3.4938 2.29181 2.64534C3.0587 1.79688 4.09328 1.23697 5.22302 1.05898C6.35276 0.880989 7.50938 1.09568 8.49999 1.66725"
                          stroke="#016630"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.5 5.5L6 7L11 2"
                          stroke="#016630"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2141_427">
                          <rect width="12" height="12" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>{" "}
                    Complete
                  </span>
                ) : test.status === "avoiding" ? (
                  <span className="flex items-center gap-1 text-red-600 text-xs font-medium bg-red-50 px-3 py-1 rounded-full">
                    Avoiding
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-yellow-600 text-xs font-medium bg-yellow-50 px-3 py-1 rounded-full">
                    Available
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_2141_548)">
                      <path
                        d="M8 4V8L10.6667 9.33333"
                        stroke="#4A5565"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.99999 14.6673C11.6819 14.6673 14.6667 11.6825 14.6667 8.00065C14.6667 4.31875 11.6819 1.33398 7.99999 1.33398C4.3181 1.33398 1.33333 4.31875 1.33333 8.00065C1.33333 11.6825 4.3181 14.6673 7.99999 14.6673Z"
                        stroke="#4A5565"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2141_548">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <span>{test.duration}</span>
              </div>

              {test.score !== null && (
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Year Score</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {test.score}/100
                    </span>
                  </div>
                  <ProgressBar percent={test.score} />
                </div>
              )}

              <Button
                variant={test.status === "completed"}
                size="lg"
                className="w-full"
                icon="Play"
                onClick={handleStartSequentialFlow}
              >
                {test.status === "completed"
                  ? "View Details & Try Again"
                  : "Start Test"}
              </Button>
            </Card>
          ))}
        </div>

        <Card className="bg-purple-50 border-0">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[20px] bg-purple-500 flex items-center justify-center text-white text-2xl flex-shrink-0 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M16 24.0013V6.66797"
                  stroke="white"
                  strokeWidth="2.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 17.3333C18.8464 16.9961 17.8331 16.2942 17.112 15.3327C16.3909 14.3712 16.0007 13.2019 16 12C15.9993 13.2019 15.6091 14.3712 14.888 15.3327C14.1669 16.2942 13.1536 16.9961 12 17.3333"
                  stroke="white"
                  strokeWidth="2.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23.464 8.66814C23.7708 8.1368 23.9513 7.54199 23.9914 6.92974C24.0316 6.31749 23.9303 5.7042 23.6956 5.13734C23.4608 4.57047 23.0987 4.06521 22.6374 3.66065C22.1761 3.25609 21.6279 2.96307 21.0353 2.80427C20.4426 2.64546 19.8214 2.62513 19.2196 2.74483C18.6178 2.86454 18.0517 3.12108 17.5649 3.49461C17.0781 3.86813 16.6838 4.34863 16.4125 4.89893C16.1411 5.44923 16 6.05458 16 6.66814C16 6.05458 15.8589 5.44923 15.5875 4.89893C15.3162 4.34863 14.9219 3.86813 14.4351 3.49461C13.9483 3.12108 13.3822 2.86454 12.7804 2.74483C12.1786 2.62513 11.5574 2.64546 10.9647 2.80427C10.3721 2.96307 9.82387 3.25609 9.36257 3.66065C8.90127 4.06521 8.53923 4.57047 8.30444 5.13734C8.06965 5.7042 7.96842 6.31749 8.00858 6.92974C8.04873 7.54199 8.22919 8.1368 8.536 8.66814"
                  stroke="white"
                  strokeWidth="2.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23.9961 6.83203C24.7798 7.03355 25.5074 7.41076 26.1238 7.93511C26.7401 8.45946 27.2291 9.1172 27.5536 9.8585C27.8782 10.5998 28.0297 11.4052 27.9969 12.2138C27.9641 13.0223 27.7477 13.8128 27.3641 14.5254"
                  stroke="white"
                  strokeWidth="2.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M24 23.9989C25.174 23.9988 26.3152 23.6114 27.2466 22.8967C28.178 22.182 28.8475 21.1799 29.1514 20.0459C29.4552 18.9119 29.3764 17.7093 28.9272 16.6247C28.4779 15.54 27.6834 14.6339 26.6667 14.0469"
                  stroke="white"
                  strokeWidth="2.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M26.6233 23.3125C26.7168 24.0355 26.661 24.7699 26.4595 25.4705C26.2579 26.1711 26.0149 26.823 25.5516 27.3858C25.0883 27.9486 24.5145 28.4105 23.8657 28.7428C23.2169 29.0752 22.5068 29.2711 21.7793 29.3183C21.0519 29.3655 20.3225 29.2631 19.6361 29.0173C18.9498 28.7716 18.3211 28.3877 17.789 27.8895C17.2568 27.3913 16.8324 26.7893 16.542 26.1206C16.2516 25.4519 16.1014 24.7308 16.0006 24.0018C15.9999 24.7308 15.8496 25.4519 15.5593 26.1206C15.2689 26.7893 14.8445 27.3913 14.3123 27.8895C13.7802 28.3877 13.1515 28.7716 12.4652 29.0173C11.7788 29.2631 11.0494 29.3655 10.3219 29.3183C9.59448 29.2711 8.88442 29.0752 8.23561 28.7428C7.5868 28.4105 7.01301 27.9486 6.54969 27.3858C6.08638 26.823 5.74336 26.1711 5.54183 25.4705C5.3403 24.7699 5.28454 24.0355 5.37798 23.3125"
                  stroke="white"
                  strokeWidth="2.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.99912 23.9989C6.82511 23.9988 5.68392 23.6114 4.75254 22.8967C3.82115 22.182 3.15161 21.1799 2.84775 20.0459C2.54389 18.9119 2.62269 17.7093 3.07194 16.6247C3.52118 15.54 4.31576 14.6339 5.33245 14.0469"
                  stroke="white"
                  strokeWidth="2.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.00326 6.83203C7.21952 7.03355 6.49192 7.41076 5.87556 7.93511C5.2592 8.45946 4.77024 9.1172 4.44571 9.8585C4.12119 10.5998 3.9696 11.4052 4.00244 12.2138C4.03528 13.0223 4.25168 13.8128 4.63526 14.5254"
                  stroke="white"
                  strokeWidth="2.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Why Use Our AI Assessment Centre Suite?
              </h3>
              <div className="space-y-2">
                {aiAssessmentData.benefits.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-purple-600 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_2141_486)">
                          <path
                            d="M18.1675 8.33357C18.5481 10.2013 18.2769 12.1431 17.3991 13.8351C16.5213 15.527 15.0899 16.8669 13.3438 17.6313C11.5976 18.3957 9.64221 18.5384 7.8036 18.0355C5.965 17.5327 4.35435 16.4147 3.24025 14.8681C2.12616 13.3214 1.57596 11.4396 1.68141 9.53639C1.78686 7.63318 2.54159 5.82364 3.81973 4.40954C5.09787 2.99545 6.82217 2.06226 8.70508 1.76561C10.588 1.46897 12.5157 1.82679 14.1667 2.7794"
                            stroke="#9810FA"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.5 9.16732L10 11.6673L18.3333 3.33398"
                            stroke="#9810FA"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2141_486">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <>
      {currentView === "assessmentUI" && <AssessmentUI />}
      {currentView === "writtenAssessment" && (
        <WrittenAssessment 
          onCancel={handleCancelTest}
          onSubmit={handleSubmitTest}
          test={activeTest}
        />
      )}
      {currentView === "inTrayEmail" && (
        <InTrayEmailExercise 
          onCancel={handleCancelTest}
          onSubmit={handleSubmitTest}
          test={activeTest}
        />
      )}
      {currentView === "legalCaseStudy" && (
        <LegalCaseStudy 
          onCancel={handleCancelTest}
          onSubmit={handleSubmitTest}
          test={activeTest}
        />
      )}
    </>
  );
};

export default AIAssessmentCentre;