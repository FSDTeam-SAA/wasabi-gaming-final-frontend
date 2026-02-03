import MockInterview from "./_components/mock-interview";
import WhyMockInterview from "./_components/why-mock-interview";

export default function MockInterviewPage() {
  return (
    <div className="container mt-5 mb-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mock Interview Simulation</h1>
        <p className="text-gray-600">
          Practice real law firm-style interviews, build confidence, and improve
          your performance.
        </p>
      </div>

      <div>
        <MockInterview />
      </div>

      <div>
        <WhyMockInterview />
      </div>
    </div>
  );
}
