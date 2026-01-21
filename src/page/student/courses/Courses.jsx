import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Badge,
  Progress,
  Row,
  Col,
  Typography,
  Input,
  Tag,
  Statistic,
  Modal,
  List
} from "antd";
import {
  SearchOutlined,
  PlayCircleOutlined,
  StarFilled,
  UserOutlined,
  ClockCircleOutlined,
  ShoppingCartOutlined,
  RocketOutlined,
  BookOutlined,
  VideoCameraOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  LockOutlined
} from "@ant-design/icons";
import { GraduationCap, LockIcon } from "lucide-react";
import { IMAGES } from "../../../assets";

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

const statsData = [
  {
    icon: <BookOutlined />,
    value: "6",
    label: "Total Courses",
  },
  {
    icon: <VideoCameraOutlined />,
    value: "4",
    label: "Enrolled",
  },
  {
    icon: <PlayCircleOutlined />,
    value: "1",
    label: "Videos Completed",
  },
  {
    icon: <TrophyOutlined />,
    value: "0",
    label: "Certificates",
  },
];

const filterCategories = [
  { label: "All", active: true },
  { label: "Career Development", active: false },
  { label: "Interview Prep", active: false },
  { label: "Personal Branding", active: false },
];

const coursesData = [
  {
    id: "1",
    image: IMAGES.course,
    priceTag: "FREE",
    isFree: true,
    level: "Beginner",
    category: "Career Development",
    title: "Resume Writing Mastery",
    description:
      "Learn how to craft compelling resumes that get noticed by recruiters and land interviews",
    duration: "2h 30m",
    rating: "4.8",
    students: "1250",
    progress: 33,
    enrolled: true,
  },
  {
    id: "2",
    image: IMAGES.course,
    priceTag: "FREE",
    isFree: true,
    level: "Intermediate",
    category: "Interview Prep",
    title: "Interview Skills Bootcamp",
    description:
      "Master the art of interviewing with proven techniques and practice sessions",
    duration: "3h 45m",
    rating: "4.9",
    students: "980",
    progress: 0,
    enrolled: true,
  },
  {
    id: "3",
    image: IMAGES.course,
    priceTag: "FREE",
    isFree: true,
    level: "Beginner",
    category: "Personal Branding",
    title: "LinkedIn Profile Optimization",
    description:
      "Build a powerful LinkedIn presence that attracts recruiters and opportunities",
    duration: "2h 15m",
    rating: "4.7",
    students: "1450",
    progress: 0,
    enrolled: true,
  },
  {
    id: "4",
    image: "/image--advanced-negotiation-skills-.png",
    priceTag: "$49.99",
    isFree: false,
    level: "Advanced",
    category: "Career Development",
    title: "Advanced Negotiation Skills",
    description:
      "Learn proven negotiation strategies to maximize your salary and benefits",
    duration: "4h 20m",
    rating: "4.9",
    students: "560",
    enrolled: false,
  },
  {
    id: "5",
    image: "/image--personal-branding-for-professionals-.png",
    priceTag: "$39.99",
    isFree: false,
    level: "Intermediate",
    category: "Personal Branding",
    title: "Personal Branding for Professionals",
    description:
      "Develop and communicate your unique professional brand across all platforms",
    duration: "3h 30m",
    rating: "4.8",
    students: "720",
    enrolled: false,
  },
  {
    id: "6",
    image: "/image--career-transition-strategies-.png",
    priceTag: "$59.99",
    isFree: false,
    level: "Advanced",
    category: "Career Development",
    title: "Career Transition Strategies",
    description:
      "Navigate career changes successfully with expert guidance and actionable steps",
    duration: "5h 15m",
    rating: "4.9",
    students: "430",
    enrolled: false,
  },
];

const heroStats = [
  { icon: <RocketOutlined />, text: "3 Free Courses" },
  { icon: <UserOutlined />, text: "5,000+ Students" },
  { icon: <StarFilled />, text: "4.8 Average Rating" },
];

export const Courses = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  // Add course action handler function
  const handleCourseAction = (course, enrolled, isFree) => {
    if (enrolled) {
      navigate(`/dashboard/course/${course.id}`);
    } else if (isFree) {
      navigate(`/course/${course.id}`);
    } else {
      // For paid courses, show modal first
      setSelectedCourse(course);
      setIsModalVisible(true);
    }
  };

  const handleModalCompletePayment = () => {
    setIsModalVisible(false);
    navigate(`/dashboard/payment/${selectedCourse.id}`);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedCourse(null);
  };

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchText.toLowerCase()) ||
      course.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter =
      activeFilter === "All" || course.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const features = [
    "Lifetime access to all course videos",
    "Interactive quizzes and assessments",
    "Certificate of completion",
    "Access to course materials",
  ];

  return (
    <section className="flex flex-col items-start gap-6 w-full p-4 md:p-12">
      {/* Hero Section */}
      <Card
        className="w-full rounded-3xl border-2 border-[#ffff00] bg-gradient-to-r from-[#fefce8] via-white to-[#faf5ff]"
        bodyStyle={{ padding: "50px" }}
      >
        <div className="flex flex-col items-start">
          <Badge className="h-7 gap-2 bg-[#ffff00] rounded-[14px] text-[#1e1e1e] border-0 px-4 mb-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="text-[#1e1e1e] text-sm" />
              <span className="text-xs font-normal">
                Professional Development
              </span>
            </div>
          </Badge>

          <Title level={1} className="!text-4xl !text-[#1e1e1e] !mt-11 !mb-0">
            Advance Your Career with Expert-Led Courses
          </Title>

          <Paragraph className="!text-lg !text-[#495565] !mt-9 !mb-0 max-w-2xl">
            Access high-quality courses designed to help you land your dream
            job. Learn at your own pace with interactive video lessons and
            practical exercises.
          </Paragraph>

          <div className="flex items-center gap-6 mt-14">
            {heroStats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="text-[#354152] text-lg">{stat.icon}</div>
                <Text className="!text-base !text-[#354152]">{stat.text}</Text>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Stats Section */}
      <Row gutter={[16, 16]} className="w-full">
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              className="rounded-[20px] border border-solid border-gray-200 hover:shadow-md transition-shadow"
              bodyStyle={{ padding: "24px" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ffff00] flex items-center justify-center text-[#1e1e1e] text-lg">
                  {stat.icon}
                </div>
                <div className="flex flex-col">
                  <Title level={2} className="!text-2xl !text-[#1e1e1e] !mb-0">
                    {stat.value}
                  </Title>
                  <Text className="!text-sm !text-[#495565]">{stat.label}</Text>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Search and Filter Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-4">
        <div className="flex-1 max-w-2xl">
          <Input
            placeholder="Search courses..."
            prefix={<SearchOutlined className="text-[#717182]" />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="h-10 rounded-[14px] bg-[#f3f3f5] border-transparent"
            style={{ backgroundColor: "#f3f3f5" }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {filterCategories.map((category, index) => (
            <Button
              key={index}
              type={
                category.active && activeFilter === category.label
                  ? "primary"
                  : "default"
              }
              style={
                activeFilter === category.label
                  ? { backgroundColor: "#ffff00", color: "black" }
                  : { backgroundColor: "white", color: "black" }
              }
              className={`h-9 px-4 py-2 rounded-[14px] font-normal text-sm ${
                activeFilter === category.label
                  ? "bg-[#ffff00] text-[#1e1e1e] border-[#ffff00] hover:bg-[#e5e500] hover:border-[#e5e500]"
                  : "bg-white text-[#1e1e1e] border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setActiveFilter(category.label)}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <Row gutter={[16, 16]} className="w-full">
        {filteredCourses.map((course, index) => (
          <Col xs={24} lg={8} key={index}>
            <Card
              className="overflow-hidden rounded-[20px] border border-solid border-gray-200 hover:shadow-lg transition-all duration-300 h-full"
              bodyStyle={{ padding: 0 }}
              cover={
                <div className="relative w-full h-48 bg-gray-100">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${course.image})` }}
                  />
                  <Tag
                    className="absolute top-3 right-3"
                    color={course.isFree ? "#00A63E" : "#FFFF00"}
                    style={{ color: course.isFree ? "white" : "black" }}
                  >
                    {course.priceTag}
                  </Tag>
                </div>
              }
            >
              <div className="p-6 flex flex-col h-[300px]">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="rounded-[14px] border-gray-300 text-[#1e1e1e] text-xs h-[22px]">
                    {course.level}
                  </Tag>
                  <Tag className="rounded-[14px] border-gray-300 text-[#1e1e1e] text-xs h-[22px]">
                    {course.category}
                  </Tag>
                </div>

                <Title
                  level={4}
                  className="!text-xl !text-[#1e1e1e] !mb-2 line-clamp-2"
                >
                  {course.title}
                </Title>

                <Paragraph className="!text-sm !text-[#495565] !mb-4 line-clamp-2 flex-grow">
                  {course.description}
                </Paragraph>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <ClockCircleOutlined className="text-[#495565] text-sm" />
                    <Text className="!text-sm !text-[#495565]">
                      {course.duration}
                    </Text>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarFilled className="text-yellow-500 text-sm" />
                    <Text className="!text-sm !text-[#495565]">
                      {course.rating}
                    </Text>
                  </div>
                  <div className="flex items-center gap-1">
                    <UserOutlined className="text-[#495565] text-sm" />
                    <Text className="!text-sm !text-[#495565]">
                      {course.students}
                    </Text>
                  </div>
                </div>

                {course.enrolled ? (
                  <div className="flex flex-col gap-3 mt-auto">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <Text className="!text-sm !text-[#495565]">
                          Progress
                        </Text>
                        <Text className="!text-sm !text-[#1e1e1e]">
                          {course.progress}%
                        </Text>
                      </div>
                      <Progress
                        percent={course.progress}
                        strokeColor="#ffff00"
                        trailColor="#fffe0033"
                        showInfo={false}
                        className="h-2"
                      />
                    </div>
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#ffff00", color: "black" }}
                      className="h-9 w-full bg-[#ffff00] hover:bg-[#e5e500] border-[#ffff00] text-[#1e1e1e] rounded-[14px] font-normal text-sm flex items-center justify-center"
                      onClick={() =>
                        handleCourseAction(course, course.enrolled, course.isFree)
                      }
                    >
                      Continue Learning
                      <PlayCircleOutlined className="ml-2" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    style={{ color: "black" }}
                    className="h-9 w-full bg-white hover:bg-gray-50 text-[#1e1e1e] rounded-[14px] border-gray-300 font-normal text-sm flex items-center justify-center mt-auto"
                    icon={<LockOutlined />}
                    onClick={() =>
                      handleCourseAction(course, course.enrolled, course.isFree)
                    }
                  >
                    Enroll Now - {course.priceTag}
                  </Button>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="w-full text-center py-12">
          <Title level={3} className="!text-xl !text-[#495565]">
            No courses found matching your criteria
          </Title>
          <Button
            type="primary"
            className="mt-4 bg-[#ffff00] hover:bg-[#e5e500] border-[#ffff00] text-[#1e1e1e]"
            onClick={() => {
              setSearchText("");
              setActiveFilter("All");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Enrollment Modal for Paid Courses */}
      <Modal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        closeIcon={<CloseOutlined />}
        width={512}
        bodyStyle={{ padding: 0 }}
        className="rounded-[16px]"
        style={{ borderRadius: "16px" }}
      >
        <Card
          bordered={false}
          style={{ borderRadius: "16px" }}
          bodyStyle={{ padding: 25 }}
        >
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Title level={3} className="!mb-1">
                Enroll in Premium Course
              </Title>
              <Text type="secondary">
                Get lifetime access to this course
              </Text>
            </Col>
            
            <Col span={24}>
              <Card
                bordered
                style={{
                  background:
                    "linear-gradient(117deg, rgba(254,252,232,1) 0%, rgba(255,247,237,1) 100%)",
                  borderColor: "#ffff00",
                  borderRadius: "20px",
                }}
                bodyStyle={{ padding: "26px 26px 0.5px 26px" }}
              >
                <Title level={2} style={{ textAlign: "center", marginBottom: 8 }}>
                  {selectedCourse?.priceTag.replace('$', '')}
                </Title>
                <Text style={{ textAlign: "center", display: "block" }}>
                  One-time payment
                </Text>
              </Card>
            </Col>
            
            <Col span={24}>
              <Title level={5} className="!mb-3">What's Included:</Title>
              <List
                dataSource={features}
                renderItem={(item) => (
                  <List.Item style={{ border: 'none', padding: '4px 0' }}>
                    <Text style={{ marginLeft: 8 }}><CheckCircleOutlined style={{ color: "#52c41a" }} /> {item}</Text>
                  </List.Item>
                )}
              />
            </Col>
            
            <Col span={24}>
              <Row gutter={16}>
                <Col span={12}>
                  <Button 
                    block 
                    size="large"
                    onClick={handleModalCancel}
                    className="rounded-[14px]"
                  >
                    Cancel
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    type="primary"
                    block
                    size="large"
                    style={{ 
                      backgroundColor: "#ffff00", 
                      borderColor: "#ffff00",
                      color: "#1e1e1e"
                    }}
                    className="rounded-[14px]"
                    onClick={handleModalCompletePayment}
                  >
                    <Row align="middle" justify="center">
                      <Col>
                        <LockOutlined style={{ marginRight: 8 }} />
                      </Col>
                      <Col>Complete Payment</Col>
                    </Row>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Modal>
    </section>
  );
};

export default Courses;