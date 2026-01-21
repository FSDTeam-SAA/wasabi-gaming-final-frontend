
export const RadioButton = ({ label, checked, onChange, value }) => (
  <label
    className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
      checked
        ? "border-yellow-400 bg-yellow-50"
        : "border-gray-200 hover:border-yellow-300 hover:bg-yellow-25"
    }`}
  >
    <div className="relative mt-1 w-4 h-4">
      <input
        type="radio"
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <div
        className={`absolute inset-0 rounded-full border-2 transition-colors ${
          checked ? "border-yellow-400" : "border-gray-300"
        }`}
      />
      {checked && (
        <div className="absolute inset-1 bg-yellow-400 rounded-full" />
      )}
    </div>

    <span className="text-gray-700 flex-1">{label}</span>
  </label>
);

const Question = ({ question, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        {question.text}
      </h3>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <RadioButton
            key={index}
            label={option}
            checked={selectedAnswer === index}
            onChange={onAnswerSelect}
            value={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
