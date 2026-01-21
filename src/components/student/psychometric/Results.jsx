import { IMAGES } from "../../../assets";
import { psychometricData } from "./data";
import { Button, Card, CircularProgress } from "./PsychometricUI";

const Results = ({ score, onTryAgain, onBackToDashboard }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Your Psychometric Test Results
          </h1>
          <p className="text-gray-600">
            Get insights into your strengths and areas for growth.
          </p>
        </div>

        <Card className="mb-6 text-center shadow-lg">
          <div className="mb-4">
            <div className="w-20 h-20 mx-auto bg-[#FFFF001A] rounded-full flex items-center justify-center mb-4 text-4xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                  stroke="#FFFF00"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 24L22 28L30 20"
                  stroke="#FFFF00"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Test Completed!
            </h2>
            <p className="text-gray-500">
              You scored {score} out of 100 questions correctly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" variant="primary" onClick={onTryAgain}>
              Try Again
            </Button>
            <Button size="lg" variant="secondary" onClick={onBackToDashboard}>
              Review Answers
            </Button>
          </div>
        </Card>

        <Card className="mb-6 bg-yellow-50 border-0">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <CircularProgress percent={score} />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Overall Strengths Summary
              </h3>
              <p className="text-gray-700">
                You performed well overall. While your scores show a solid
                foundation, there is room for improvement. This is a good
                opportunity to build on your individual skill areas and elevate
                your performance.
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Key Strengths
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {psychometricData.strengths.map((strength, idx) => (
              <div key={idx} className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">
                    {strength.name}
                  </span>
                  <span className="text-green-600 font-semibold">
                    {strength.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Areas to Improve
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {psychometricData.areasToImprove.map((area, idx) => (
              <div
                key={idx}
                className="p-4 border border-[#0000001A] rounded-lg"
              >
                <h4 className="font-medium text-gray-900 mb-2">{area.name}</h4>
                <p className="text-sm text-gray-600">{area.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-yellow-50 border-0 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clip-path="url(#clip0_200_1430)">
                <path
                  d="M9.1812 2.34439C9.21691 2.15323 9.31835 1.98057 9.46795 1.85632C9.61755 1.73208 9.8059 1.66406 10.0004 1.66406C10.1948 1.66406 10.3832 1.73208 10.5328 1.85632C10.6824 1.98057 10.7838 2.15323 10.8195 2.34439L11.6954 6.97606C11.7576 7.30535 11.9176 7.60824 12.1546 7.8452C12.3915 8.08216 12.6944 8.24219 13.0237 8.30439L17.6554 9.18022C17.8465 9.21593 18.0192 9.31737 18.1434 9.46697C18.2677 9.61658 18.3357 9.80492 18.3357 9.99939C18.3357 10.1939 18.2677 10.3822 18.1434 10.5318C18.0192 10.6814 17.8465 10.7829 17.6554 10.8186L13.0237 11.6944C12.6944 11.7566 12.3915 11.9166 12.1546 12.1536C11.9176 12.3905 11.7576 12.6934 11.6954 13.0227L10.8195 17.6544C10.7838 17.8456 10.6824 18.0182 10.5328 18.1425C10.3832 18.2667 10.1948 18.3347 10.0004 18.3347C9.8059 18.3347 9.61755 18.2667 9.46795 18.1425C9.31835 18.0182 9.21691 17.8456 9.1812 17.6544L8.30537 13.0227C8.24316 12.6934 8.08314 12.3905 7.84618 12.1536C7.60922 11.9166 7.30632 11.7566 6.97703 11.6944L2.34537 10.8186C2.1542 10.7829 1.98155 10.6814 1.8573 10.5318C1.73305 10.3822 1.66504 10.1939 1.66504 9.99939C1.66504 9.80492 1.73305 9.61658 1.8573 9.46697C1.98155 9.31737 2.1542 9.21593 2.34537 9.18022L6.97703 8.30439C7.30632 8.24219 7.60922 8.08216 7.84618 7.8452C8.08314 7.60824 8.24316 7.30535 8.30537 6.97606L9.1812 2.34439Z"
                  stroke="#FFFF00"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.667 1.66602V4.99935"
                  stroke="#FFFF00"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.3333 3.33398H15"
                  stroke="#FFFF00"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.33366 18.3333C4.25413 18.3333 5.00033 17.5871 5.00033 16.6667C5.00033 15.7462 4.25413 15 3.33366 15C2.41318 15 1.66699 15.7462 1.66699 16.6667C1.66699 17.5871 2.41318 18.3333 3.33366 18.3333Z"
                  stroke="#FFFF00"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_200_1430">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <h3 className="text-lg text-gray-900">AI-Powered Feedback</h3>
          </div>
          <div className="flex items-center flex-col md:flex-row gap-4 font-medium px-5">
            <div className="flex-1">
              <p className="text-[#1E1E1E] mb-4">
                Your Psychometric skills are highly versatile. You are excellent
                at identifying the relationships between symbols and data
                connections, and you are able to quickly examine and evaluate
                information using systematic and structured approach.
              </p>
            </div>
            <img
              src={IMAGES.feedback_Image}
              alt="Feedback"
              className="w-full md:w-40 h-32 object-cover rounded-lg"
            />
          </div>
        </Card>

        <div className="bg-gradient-to-b from-[#FF0] to-[#E6E600] p-4 rounded-lg mb-5 flex gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <g opacity="0.8">
              <path
                d="M21.3337 4C20.6264 4 19.9481 4.28095 19.448 4.78105C18.9479 5.28115 18.667 5.95942 18.667 6.66667V14.6667C18.667 15.3739 18.9479 16.0522 19.448 16.5523C19.9481 17.0524 20.6264 17.3333 21.3337 17.3333C21.6873 17.3333 22.0264 17.4738 22.2765 17.7239C22.5265 17.9739 22.667 18.313 22.667 18.6667V20C22.667 20.7072 22.386 21.3855 21.8859 21.8856C21.3858 22.3857 20.7076 22.6667 20.0003 22.6667C19.6467 22.6667 19.3076 22.8071 19.0575 23.0572C18.8075 23.3072 18.667 23.6464 18.667 24V26.6667C18.667 27.0203 18.8075 27.3594 19.0575 27.6095C19.3076 27.8595 19.6467 28 20.0003 28C22.1221 28 24.1569 27.1571 25.6572 25.6569C27.1575 24.1566 28.0003 22.1217 28.0003 20V6.66667C28.0003 5.95942 27.7194 5.28115 27.2193 4.78105C26.7192 4.28095 26.0409 4 25.3337 4H21.3337Z"
                stroke="#1E1E1E"
                stroke-width="2.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.66667 4C5.95942 4 5.28115 4.28095 4.78105 4.78105C4.28095 5.28115 4 5.95942 4 6.66667V14.6667C4 15.3739 4.28095 16.0522 4.78105 16.5523C5.28115 17.0524 5.95942 17.3333 6.66667 17.3333C7.02029 17.3333 7.35943 17.4738 7.60948 17.7239C7.85952 17.9739 8 18.313 8 18.6667V20C8 20.7072 7.71905 21.3855 7.21895 21.8856C6.71885 22.3857 6.04058 22.6667 5.33333 22.6667C4.97971 22.6667 4.64057 22.8071 4.39052 23.0572C4.14048 23.3072 4 23.6464 4 24V26.6667C4 27.0203 4.14048 27.3594 4.39052 27.6095C4.64057 27.8595 4.97971 28 5.33333 28C7.45507 28 9.4899 27.1571 10.9902 25.6569C12.4905 24.1566 13.3333 22.1217 13.3333 20V6.66667C13.3333 5.95942 13.0524 5.28115 12.5523 4.78105C12.0522 4.28095 11.3739 4 10.6667 4H6.66667Z"
                stroke="#1E1E1E"
                stroke-width="2.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
          <div>
            <p className="text-gray-900 font-medium">
              "From good to great starts here: keep learning, keep growing!"
            </p>
            <p className="text-sm text-gray-700 mt-1">— Claude Team</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" variant="primary" onClick={onTryAgain}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M2 8C2 6.4087 2.63214 4.88258 3.75736 3.75736C4.88258 2.63214 6.4087 2 8 2C9.67737 2.00631 11.2874 2.66082 12.4933 3.82667L14 5.33333"
                stroke="#1E1E1E"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.0003 2V5.33333H10.667"
                stroke="#1E1E1E"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 8C14 9.5913 13.3679 11.1174 12.2426 12.2426C11.1174 13.3679 9.5913 14 8 14C6.32263 13.9937 4.71265 13.3392 3.50667 12.1733L2 10.6667"
                stroke="#1E1E1E"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.33333 10.666H2V13.9993"
                stroke="#1E1E1E"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Retake Test
          </Button>
          <Button size="lg" variant="secondary" onClick={onBackToDashboard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M10 14V8.66667C10 8.48986 9.92976 8.32029 9.80474 8.19526C9.67971 8.07024 9.51014 8 9.33333 8H6.66667C6.48986 8 6.32029 8.07024 6.19526 8.19526C6.07024 8.32029 6 8.48986 6 8.66667V14"
                stroke="#1E1E1E"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2 6.66568C1.99995 6.47173 2.04222 6.2801 2.12386 6.10416C2.20549 5.92822 2.32453 5.77222 2.47267 5.64702L7.13933 1.64702C7.37999 1.44362 7.6849 1.33203 8 1.33203C8.3151 1.33203 8.62001 1.44362 8.86067 1.64702L13.5273 5.64702C13.6755 5.77222 13.7945 5.92822 13.8761 6.10416C13.9578 6.2801 14 6.47173 14 6.66568V12.6657C14 13.0193 13.8595 13.3584 13.6095 13.6085C13.3594 13.8585 13.0203 13.999 12.6667 13.999H3.33333C2.97971 13.999 2.64057 13.8585 2.39052 13.6085C2.14048 13.3584 2 13.0193 2 12.6657V6.66568Z"
                stroke="#1E1E1E"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>{" "}
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
