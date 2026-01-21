import { useState } from "react";
import { Modal, Button } from "antd";

export default function NeedHelpSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="yellow py-16 px-2 rounded-b-2xl text-center space-y-4">
      <h3 className="text-2xl md:text-4xl text-gray-900 mb-2 source">
        Need help managing students?
      </h3>
      <p className="text-gray-700 mb-6 md:text-lg">
        Our team is here to support you with onboarding, training, and best
        practices.
      </p>

      <div className="flex justify-center gap-4">
        <button className="bg-black text-primary px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition">
          Contact Support
        </button>
        <button
          className="border-2 border-black text-black px-10 py-2 rounded-full font-medium hover:bg-black hover:text-white transition flex items-center gap-2"
          onClick={showModal} // Show the modal when clicked
        >
          View Guide
        </button>
      </div>

      {/* Modal for displaying the guide */}
      <Modal
        title="Website Guide (Instruction Manual)"
        open={isModalOpen} // Using 'open' instead of 'visible'
        onCancel={handleCancel}
        footer={null} // No footer buttons
        width={800} // Adjust width if needed
      >
        <div className="text-left">
          <h3>1. Website Overview</h3>
          <p>
            The AI-driven career development platform is designed to empower
            students and schools with tools that enhance employability and
            professional growth through the use of advanced, AI-integrated
            solutions...
          </p>

          <h3>2. Website Purpose</h3>
          <p>
            The purpose of this project is to provide a comprehensive AI-based
            career preparation platform that supports both students and
            educational institutions...
          </p>

          <h3>3. Target Users</h3>
          <p>
            The platform caters primarily to two types of users — Students and
            School Administrators...
          </p>

          <h3>4. Website Structure</h3>
          <p>
            The website structure is designed for simplicity and functionality.
            The key pages include the Home Page...
          </p>

          <h3>5. Functionality Guide</h3>
          <p>
            Students can use the AI CV Builder to create and refine resumes,
            generate personalized cover letters, and take psychometric tests
            that assess skills and traits...
          </p>

          <h3>6. Content Writing Guidelines</h3>
          <p>
            The platform’s content should be written in a professional yet
            encouraging tone. It must sound confident, supportive, and
            action-oriented to motivate students to engage with the tools...
          </p>

          <h3>7. User Flow Summary</h3>
          <p>
            Students will sign up or log in to their accounts and access the
            dashboard to choose from available tools like CV Builder...
          </p>

          <h3>8. Future Scalability</h3>
          <p>
            The platform is built with scalability in mind, allowing for future
            enhancements such as an integrated Learning Portal for skill
            development...
          </p>

          <h3>9. Deliverables for Design/Development Team</h3>
          <p>
            The design and development team will deliver a complete set of Figma
            wireframes for both the student and admin dashboards...
          </p>

          <h3>Summary</h3>
          <p>
            This guide ensures that all designers, developers, and content
            creators follow a unified direction in building the AI-powered career
            development platform...
          </p>
        </div>
      </Modal>
    </div>
  );
}
