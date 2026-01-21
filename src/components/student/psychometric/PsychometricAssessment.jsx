import { useCallback, useState } from "react";
import { psychometricData } from "./data";
import { Button, Card, ProgressBar } from "./PsychometricUI";
import Test from "./TestInterface";
import Results from "./Results";

const PsychometricAssessment = () => {
  const [currentView, setCurrentView] = useState("psychometricUI");
  const [activeTest, setActiveTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleStartTest = useCallback((testId) => {
    const test = psychometricData.tests.find((t) => t.id === testId);
    setActiveTest(test);
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer(null);
    setCurrentView("test");
  }, []);

  const handleAnswerSelect = useCallback((value) => {
    setSelectedAnswer(value);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedAnswer === null || !activeTest) return;

    setAnswers((prev) => ({ ...prev, [currentQuestion]: selectedAnswer }));
    setSelectedAnswer(null);

    if (currentQuestion < activeTest.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentView("results");
    }
  }, [activeTest, currentQuestion, selectedAnswer]);

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedAnswer(answers[currentQuestion - 1] ?? null);
    }
  }, [currentQuestion, answers]);

  const calculateScore = useCallback(() => {
    if (!activeTest || Object.keys(answers).length === 0) return 0;
    let correct = 0;
    Object.entries(answers).forEach(([idx, ans]) => {
      if (ans === activeTest.questions[Number(idx)].correctAnswer) correct++;
    });
    return Math.round((correct / activeTest.questions.length) * 100);
  }, [activeTest, answers]);

  const score = calculateScore();

  const PsychometricUI = () => (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Psychometric Assessment
          </h1>
          <p className="text-gray-600">
            Discover your cognitive strengths and ideal career paths.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {psychometricData.tests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                      test.status === "completed"
                        ? "bg-purple-100"
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
                      <g clip-path="url(#clip0_2141_427)">
                        <path
                          d="M10.9005 4.99975C11.1288 6.1204 10.9661 7.28546 10.4394 8.30065C9.91273 9.31583 9.05393 10.1198 8.00625 10.5784C6.95856 11.037 5.7853 11.1226 4.68214 10.8209C3.57897 10.5192 2.61258 9.84845 1.94413 8.92046C1.27567 7.99247 0.94555 6.86337 1.00882 5.72144C1.07209 4.57952 1.52493 3.4938 2.29181 2.64534C3.0587 1.79688 4.09328 1.23697 5.22302 1.05898C6.35276 0.880989 7.50938 1.09568 8.49999 1.66725"
                          stroke="#016630"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.5 5.5L6 7L11 2"
                          stroke="#016630"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2141_427">
                          <rect width="12" height="12" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>{" "}
                    Completed
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
                    <g clip-path="url(#clip0_2141_548)">
                      <path
                        d="M8 4V8L10.6667 9.33333"
                        stroke="#4A5565"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.99999 14.6673C11.6819 14.6673 14.6667 11.6825 14.6667 8.00065C14.6667 4.31875 11.6819 1.33398 7.99999 1.33398C4.3181 1.33398 1.33333 4.31875 1.33333 8.00065C1.33333 11.6825 4.3181 14.6673 7.99999 14.6673Z"
                        stroke="#4A5565"
                        stroke-width="1.33333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
                    <span className="text-sm text-gray-600">Your Score</span>
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
                onClick={() => handleStartTest(test.id)}
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
                  d="M16 23.9993V6.66602"
                  stroke="white"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 17.3333C18.8464 16.9961 17.8331 16.2942 17.112 15.3327C16.3909 14.3712 16.0007 13.2019 16 12C15.9993 13.2019 15.6091 14.3712 14.888 15.3327C14.1669 16.2942 13.1536 16.9961 12 17.3333"
                  stroke="white"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M23.464 8.66619C23.7708 8.13484 23.9513 7.54004 23.9914 6.92778C24.0316 6.31553 23.9303 5.70225 23.6956 5.13538C23.4608 4.56851 23.0987 4.06326 22.6374 3.6587C22.1761 3.25414 21.6279 2.96112 21.0353 2.80232C20.4426 2.64351 19.8214 2.62318 19.2196 2.74288C18.6178 2.86259 18.0517 3.11913 17.5649 3.49265C17.0781 3.86618 16.6838 4.34668 16.4125 4.89698C16.1411 5.44728 16 6.05262 16 6.66619C16 6.05262 15.8589 5.44728 15.5875 4.89698C15.3162 4.34668 14.9219 3.86618 14.4351 3.49265C13.9483 3.11913 13.3822 2.86259 12.7804 2.74288C12.1786 2.62318 11.5574 2.64351 10.9647 2.80232C10.3721 2.96112 9.82387 3.25414 9.36257 3.6587C8.90127 4.06326 8.53923 4.56851 8.30444 5.13538C8.06965 5.70225 7.96842 6.31553 8.00858 6.92778C8.04873 7.54004 8.22919 8.13484 8.536 8.66619"
                  stroke="white"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M23.996 6.83398C24.7797 7.0355 25.5073 7.41272 26.1237 7.93707C26.74 8.46142 27.229 9.11915 27.5535 9.86045C27.8781 10.6017 28.0296 11.4072 27.9968 12.2157C27.964 13.0243 27.7476 13.8148 27.364 14.5273"
                  stroke="white"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M24 24.0008C25.174 24.0008 26.3152 23.6134 27.2466 22.8986C28.178 22.1839 28.8475 21.1819 29.1514 20.0479C29.4552 18.9139 29.3764 17.7113 28.9272 16.6266C28.4779 15.542 27.6834 14.6359 26.6667 14.0488"
                  stroke="white"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M26.6227 23.3105C26.7161 24.0335 26.6603 24.768 26.4588 25.4686C26.2573 26.1692 25.9143 26.821 25.4509 27.3838C24.9876 27.9466 24.4138 28.4085 23.765 28.7409C23.1162 29.0733 22.4062 29.2691 21.6787 29.3163C20.9512 29.3635 20.2218 29.2611 19.5355 29.0154C18.8491 28.7696 18.2205 28.3858 17.6883 27.8876C17.1561 27.3893 16.7318 26.7873 16.4414 26.1186C16.151 25.45 16.0008 24.7289 16 23.9999C15.9992 24.7289 15.849 25.45 15.5586 26.1186C15.2682 26.7873 14.8438 27.3893 14.3117 27.8876C13.7795 28.3858 13.1508 28.7696 12.4645 29.0154C11.7782 29.2611 11.0488 29.3635 10.3213 29.3163C9.59383 29.2691 8.88376 29.0733 8.23495 28.7409C7.58614 28.4085 7.01236 27.9466 6.54904 27.3838C6.08572 26.821 5.7427 26.1692 5.54117 25.4686C5.33965 24.768 5.28388 24.0335 5.37733 23.3105"
                  stroke="white"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 24.0008C6.826 24.0008 5.68481 23.6134 4.75342 22.8986C3.82204 22.1839 3.1525 21.1819 2.84864 20.0479C2.54478 18.9139 2.62358 17.7113 3.07282 16.6266C3.52207 15.542 4.31665 14.6359 5.33333 14.0488"
                  stroke="white"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.004 6.83398C7.22027 7.0355 6.49267 7.41272 5.87631 7.93707C5.25995 8.46142 4.77099 9.11915 4.44646 9.86045C4.12193 10.6017 3.97035 11.4072 4.00319 12.2157C4.03603 13.0243 4.25243 13.8148 4.636 14.5273"
                  stroke="white"
                  stroke-width="2.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Why Take Psychometric Tests?
              </h3>
              <div className="space-y-2">
                {[
                  "Discover your natural cognitive strengths and abilities",
                  "Get personalized career recommendations based on your results",
                  "Stand out to employers with verified test scores on your profile",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-purple-600 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_2141_486)">
                          <path
                            d="M18.1675 8.33357C18.5481 10.2013 18.2769 12.1431 17.3991 13.8351C16.5213 15.527 15.0899 16.8669 13.3438 17.6313C11.5976 18.3957 9.64221 18.5384 7.8036 18.0355C5.965 17.5327 4.35435 16.4147 3.24025 14.8681C2.12616 13.3214 1.57596 11.4396 1.68141 9.53639C1.78686 7.63318 2.54159 5.82364 3.81973 4.40954C5.09787 2.99545 6.82217 2.06226 8.70508 1.76561C10.588 1.46897 12.5157 1.82679 14.1667 2.7794"
                            stroke="#9810FA"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.5 9.16732L10 11.6673L18.3333 3.33398"
                            stroke="#9810FA"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
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
      {currentView === "psychometricUI" && <PsychometricUI />}
      {currentView === "test" && (
        <Test
          activeTest={activeTest}
          currentQuestion={currentQuestion}
          selectedAnswer={selectedAnswer}
          answers={answers}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
      {currentView === "results" && (
        <Results
          score={score}
          activeTest={activeTest}
          onTryAgain={() => handleStartTest(activeTest.id)}
          onBackToDashboard={() => setCurrentView("psychometricUI")}
        />
      )}
    </>
  );
};

export default PsychometricAssessment;
