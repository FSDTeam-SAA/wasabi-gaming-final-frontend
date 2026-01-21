const ProgressBar = ({ percent }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className="yellow h-2 rounded-full transition-all duration-300"
      style={{ width: `${percent}%` }}
    />
  </div>
);


const CircularProgress = ({ percent = 0 }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-40 h-40 flex-shrink-0">
      {/* SVG – rotated -90° so the progress starts at the top */}
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* background ring */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="12"
          fill="none"
        />
        {/* progress ring */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#FFFF00"
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {/* center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-bold text-[rgb(248,248,4)]">{percent}%</span>
        <span className="text-xs text-[#64748B] -mt-1">Complete</span>
      </div>
    </div>
  );
};

const Button = ({
  children,
  onClick,
  disabled,
  variant = true,
  size = "md",
  className = "",
  icon,
}) => {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2";
  const sizeClasses =
    size === "lg" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm";
  const variantClasses = !variant
    ? "yellow text-gray-900"
    : "bg-white hover:bg-gray-50 tex t-gray-700 border border-gray-300";
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${disabledClasses} ${className}`}
    >
      {icon && !variant && (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3.33334 3.33373C3.33327 3.09912 3.39511 2.86865 3.5126 2.66559C3.63009 2.46252 3.79908 2.29406 4.00251 2.17719C4.20594 2.06033 4.4366 1.99921 4.6712 2.00001C4.90581 2.0008 5.13605 2.06349 5.33868 2.18173L13.3367 6.84706C13.5385 6.96418 13.7061 7.13223 13.8226 7.3344C13.9392 7.53657 14.0006 7.76579 14.0008 7.99915C14.001 8.23251 13.94 8.46184 13.8238 8.66422C13.7076 8.86659 13.5403 9.03493 13.3387 9.15239L5.33868 13.8191C5.13605 13.9373 4.90581 14 4.6712 14.0008C4.4366 14.0016 4.20594 13.9405 4.00251 13.8236C3.79908 13.7067 3.63009 13.5383 3.5126 13.3352C3.39511 13.1321 3.33327 12.9017 3.33334 12.6671V3.33373Z"
              stroke="#1E1E1E"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      )}
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
    {children}
  </div>
);

export { ProgressBar, Button, Card, CircularProgress };
