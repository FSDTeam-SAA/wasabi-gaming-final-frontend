import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Button,
  Tag,
  Modal,
  Descriptions,
  Badge,
  Typography,
  Space,
  message,
} from "antd";
import {
  EnvironmentOutlined,
  DollarOutlined,
  CloseOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";

const { Title, Text, Paragraph } = Typography;

const availableJobs = [
  {
    id: 1,
    jobTitle: "Legal Assistant Apprentice",
    company: "JIES LEGAL SERVICES LIMITED",
    level: "Level 6",
    location: "South East",
    industry: "Law",
    salary: "$15,704.00 - $15,704.00 Yearly",
    startDate: "1/5/2026",
    deadline: "1/10/2026",
    jobId: "9040",
    description:
      "Reporting directly to JLES' Legal Services Manager, you will take on responsibilities to manage and oversee legal hindrances to highway and sewer adoptions! Liaising with local authorities, clients and third parties' legal teams as required. Negotiating legal requirements with local authorities, researching alternative approaches, and assisting presenting these findings and solutions to both internal and external clients.",
    keyResponsibilities: "Unknown",
    skills: "Education Level",
    acceptBTEC: false,
  },
  // Add more jobs with full details as needed
];

const JobDetailsModal = ({ visible, onClose, job }) => {
  if (!job) return null;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width="90%"
      style={{ maxWidth: "900px", top: 20 }}
      bodyStyle={{ padding: "0", borderRadius: "12px", overflow: "hidden" }}
      closeIcon={<CloseOutlined className="text-gray-600 text-xl" />}
    >
      <div className="bg-white">
        <div className="p-6 border-b border-gray-200">
          <Title level={2} className="!text-2xl !text-[#1e1e1e] !mb-2">
            Job details
          </Title>
          <div className="flex items-center gap-4">
            <Title level={3} className="!text-xl !text-[#1e1e1e] !mb-0">
              {job.jobTitle}
            </Title>
            <Badge color="blue" text="Available" />
          </div>
          <Text className="!text-base !text-[#495565]">{job.level}</Text>
        </div>

        <div className="p-6 border-b border-gray-200">
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="Company" span={1}>
              {job.company}
            </Descriptions.Item>
            <Descriptions.Item label="Location" span={1}>
              <EnvironmentOutlined className="mr-2 text-gray-600" />
              {job.location}
            </Descriptions.Item>
            <Descriptions.Item label="Industry" span={1}>
              {job.industry}
            </Descriptions.Item>
            <Descriptions.Item label="Salary" span={1}>
              <DollarOutlined className="mr-2 text-gray-600" />
              {job.salary}
            </Descriptions.Item>
          </Descriptions>
        </div>

        <div className="p-6 border-b border-gray-200">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Text strong className="block !text-sm !text-[#697282]">
                Start date
              </Text>
              <Text className="!text-base !text-[#1e1e1e]">{job.startDate}</Text>
            </Col>
            <Col span={8}>
              <Text strong className="block !text-sm !text-[#697282]">
                Response deadline
              </Text>
              <Text className="!text-base !text-[#1e1e1e]">{job.deadline}</Text>
            </Col>
            <Col span={8}>
              <Text strong className="block !text-sm !text-[#697282]">
                Job ID
              </Text>
              <Text className="!text-base !text-[#1e1e1e]">{job.jobId}</Text>
            </Col>
          </Row>
        </div>

        <div className="p-6 border-b border-gray-200">
          <Title level={4} className="!text-lg !text-[#1e1e1e] !mb-4">
            About The Job
          </Title>
          <Paragraph className="!text-base !text-[#495565] leading-relaxed">
            {job.description}
          </Paragraph>
        </div>

        <div className="p-6">
          <Title level={4} className="!text-lg !text-[#1e1e1e] !mb-6">
            Education
          </Title>
          <div className="mb-8">
            <Title level={5} className="!text-base !text-[#1e1e1e] !mb-3">
              Key Responsibilities
            </Title>
            <Text className="!text-base !text-[#495565]">
              {job.keyResponsibilities}
            </Text>
          </div>
          <div>
            <Title level={5} className="!text-base !text-[#1e1e1e] !mb-3">
              Skills
            </Title>
            <Space direction="vertical" size={8}>
              <div className="flex items-center gap-3">
                <BookOutlined className="text-gray-600" />
                <Text strong className="!text-base !text-[#1e1e1e]">
                  {job.skills}
                </Text>
              </div>
              <Text className="!text-base !text-[#495565]">
                {job.acceptBTEC
                  ? "Yes, we accept Education Level"
                  : "No, we do not accept Education Level"}
              </Text>
            </Space>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const InviteStudent = () => {
  const { studentId } = useParams();
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleInvite = (job) => {
    message.success(
      `Invitation sent for ${job.jobTitle} at ${job.company}!`
    );
    toast.success(`Invitation sent for ${job.jobTitle} at ${job.company}!`);
  };

  return (
    <div className="p-6 md:px-16">
      <Title level={2} className="!text-3xl !mb-2">
        Invite Student for Job
      </Title>
      <Text className="!text-base !text-[#495565]">
        Choose a position to invite the student to apply
      </Text>

      <Row gutter={[16, 16]} className="mt-8">
        {availableJobs.map((job) => (
          <Col xs={24} sm={12} lg={8} key={job.id}>
            <Card className="h-full border-2 rounded-[20px] hover:shadow-lg transition-shadow">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M11.6667 14H16.3334" stroke="#4A5565" strokeWidth="2.333" />
                      <path d="M11.6667 9.33203H16.3334" stroke="#4A5565" strokeWidth="2.333" />
                      <path d="M16.3334 24.5013V21.0013C16.3334 20.3825 16.0876 19.789 15.65 19.3514C15.2124 18.9138 14.6189 18.668 14.0001 18.668C13.3812 18.668 12.7878 18.9138 12.3502 19.3514C11.9126 19.789 11.6667 20.3825 11.6667 21.0013V24.5013" stroke="#4A5565" strokeWidth="2.333" />
                      <path d="M6.99992 11.668H4.66659C4.04775 11.668 3.45425 11.9138 3.01667 12.3514C2.57908 12.789 2.33325 13.3825 2.33325 14.0013V22.168C2.33325 22.7868 2.57908 23.3803 3.01667 23.8179C3.45425 24.2555 4.04775 24.5013 4.66659 24.5013H23.3333C23.9521 24.5013 24.5456 24.2555 24.9832 23.8179C25.4208 23.3803 25.6666 22.7868 25.6666 22.168V10.5013C25.6666 9.88246 25.4208 9.28897 24.9832 8.85139C24.5456 8.4138 23.9521 8.16797 23.3333 8.16797H20.9999" stroke="#4A5565" strokeWidth="2.333" />
                      <path d="M7 24.5V5.83333C7 5.21449 7.24583 4.621 7.68342 4.18342C8.121 3.74583 8.71449 3.5 9.33333 3.5H18.6667C19.2855 3.5 19.879 3.74583 20.3166 4.18342C20.7542 4.621 21 5.21449 21 5.83333V24.5" stroke="#4A5565" strokeWidth="2.333" />
                    </svg>
                  </div>
                  <Tag color="blue" className="px-3 py-1 text-xs">
                    Available
                  </Tag>
                </div>

                <div>
                  <Title level={4} className="!text-base !text-[#1e1e1e] !mb-1">
                    {job.company}
                  </Title>
                  <Text className="!text-sm !text-[#495565]">{job.jobTitle}</Text>
                </div>

                <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                  <Button
                    className="flex-1 border-2 border-[#e5e500] rounded-[14px] h-10 font-medium"
                    onClick={() => handleViewDetails(job)}
                  >
                    View Details
                  </Button>
                  <Button
                    type="primary"
                    className="flex-1 rounded-[14px] h-10 font-medium"
                    style={{ backgroundColor: "#ffff03", color: "#000" }}
                    onClick={() => handleInvite(job)}
                  >
                    Invite Student
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <JobDetailsModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
      />
    </div>
  );
};

export default InviteStudent;