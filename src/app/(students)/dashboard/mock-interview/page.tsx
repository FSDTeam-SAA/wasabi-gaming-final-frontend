import MockInterview from "./_components/mock-interview";
import Title from "./_components/title";
import WhyMockInterview from "./_components/why-mock-interview";

export default function MockInterviewPage() {
  return (
    <div className="container mt-5 mb-10 space-y-6">
      <Title />

      <div>
        <MockInterview />
      </div>

      <div>
        <WhyMockInterview />
      </div>
    </div>
  );
}
