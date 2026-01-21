import { Button, Card, ProgressBar } from "./PsychometricUI";
import Question from "./Question";

const Test = ({
  activeTest,
  currentQuestion,
  selectedAnswer,
  answers,
  onAnswerSelect,
  onNext,
  onPrevious,
}) => {
  if (!activeTest) return null;

  const progress = ((currentQuestion + 1) / activeTest.questions.length) * 100;
  const question = activeTest.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Practice Questions
            </h2>
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {activeTest.questions.length}
            </span>
          </div>
          <ProgressBar percent={progress} />
        </div>

        <Card className="mb-6 shadow-lg">
          <Question
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={onAnswerSelect}
          />
        </Card>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={onPrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>

          <div className="flex gap-2 flex-wrap justify-center">
            {activeTest.questions.map((_, idx) => (
              <div
                key={idx}
                className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${
                  idx === currentQuestion
                    ? "yellow text-gray-900"
                    : answers[idx] !== undefined
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {idx + 1}
              </div>
            ))}
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={onNext}
            disabled={selectedAnswer === null}
          >
            {currentQuestion === activeTest.questions.length - 1
              ? "Finish"
              : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Test;
