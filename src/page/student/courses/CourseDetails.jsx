import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Progress,
  Row,
  Col,
  Typography,
  Space,
  Flex,
} from "antd";
import {
  ArrowLeftOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { IMAGES } from "../../../assets";
import CourseQuizModal from "../../../components/school/courses/CourseQuizModal";
import { BookOpen, Target } from "lucide-react";

const { Title, Text, Paragraph } = Typography;

export const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [quizModalVisible, setQuizModalVisible] = useState(false);

  // Quiz questions data
  const quizQuestions = [
    {
      id: 1,
      question: "What is the most important section of a resume?",
      options: [
        "Contact Information",
        "Work Experience and Achievements Work Experience and Achievements Work Experience and Achievements Work Experience and Achievements Work Experience and Achievements Work Experience and Achievements Work Experience and Achievements Work Experience and Achievements Work Experience and Achievements Work Experience and Achievements Work Experience and Achievements Work Experience and Achievements",
        "Education",
        "Hobbies and Interests",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "How long should a professional summary typically be?",
      options: [
        "A full paragraph of 8-10 sentences",
        "2-4 sentences",
        "1 sentence only",
        "As long as needed to include all details",
      ],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "Which format best demonstrates achievement?",
      options: [
        "Responsible for sales",
        "Managed sales team",
        "Increased sales by 35% in Q1 2024",
        "Worked in sales department",
      ],
      correctAnswer: 2,
    },
  ];

  // Mock data - replace with your actual API calls
  useEffect(() => {
    const mockCourse = {
      id: courseId,
      title: "Resume Writing Mastery",
      instructor: "Sarah Johnson",
      image: IMAGES.course,
      duration: "2h 30m",
    };

    const mockVideos = [
      {
        id: "1",
        title: "Introduction to Resume Writing",
        duration: "15:30",
        completed: true,
        description: "Learn the fundamentals of effective resume writing",
      },
      {
        id: "2",
        title: "Crafting Your Professional Summary",
        duration: "20:15",
        completed: true,
        description:
          "Create compelling professional summaries that grab attention",
      },
      {
        id: "3",
        title: "Highlighting Your Achievements",
        duration: "18:45",
        completed: true,
        description: "Using metrics and results to showcase your impact",
      },
    ];

    setCourse(mockCourse);
    setCurrentVideo(mockVideos[2]);
  }, [courseId]);

  const handleBackToCourses = () => {
    navigate("/dashboard/courses");
  };

  const handleTakeQuiz = () => {
    setQuizModalVisible(true);
  };

  const handleCloseQuiz = () => {
    setQuizModalVisible(false);
  };

  if (!course) {
    return (
      <div className="bg-white w-full min-h-screen flex items-center justify-center p-8">
        <p className="text-gray-500">Loading course...</p>
      </div>
    );
  }

  return (
    <div className="bg-white w-full min-h-screen p-4 md:p-8">
      {/* Header Section */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col>
          <Button
            icon={<ArrowLeftOutlined />}
            className="rounded-[14px] border-gray-300"
            onClick={handleBackToCourses}
            style={{
              border: "1px solid #d9d9d9",
              fontWeight: "normal",
              padding: "8px 16px",
            }}
          >
            Back to Courses
          </Button>
        </Col>
        <Col flex="auto">
          <Title level={2} className="!mb-1 !text-[#1e1e1e] font-normal">
            {course.title}
          </Title>
          <Text className="!text-[#495565] text-base">{course.instructor}</Text>
        </Col>
      </Row>

      {/* Progress Card */}
      <Card
        className="rounded-[20px] border border-gray-200 mb-6"
        bodyStyle={{ padding: "24px" }}
      >
        <Row justify="space-between" align="middle" className="mb-4">
          <Col>
            <Title level={4} className="!mb-0 !text-[#1e1e1e] font-normal">
              Your Progress
            </Title>
          </Col>
          <Col>
            <Button
              className="rounded-[14px] font-normal"
              style={{
                backgroundColor: "#ffff00",
                borderColor: "#ffff00",
                color: "#1e1e1e",
                padding: "4px 12px",
              }}
            >
              3 / 3 Videos Watched
            </Button>
          </Col>
        </Row>
        <Progress
          percent={100}
          showInfo={false}
          strokeColor="#ffff00"
          trailColor="#f0f0f0"
          style={{ height: "8px", borderRadius: "4px" }}
        />
      </Card>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        {/* Video Content Sidebar */}
        <Col xs={24} lg={8}>
          <Title level={4} className="!mb-4 !text-[#1e1e1e] font-normal">
            Video Content
          </Title>

          {/* Video 1 */}
          <Card
            className="rounded-[20px] border border-gray-200 mb-3"
            bodyStyle={{ padding: "16px" }}
          >
            <Row align="middle" gutter={12}>
              <Col>
                <CheckCircleOutlined
                  style={{ fontSize: "24px", color: "#52c41a" }}
                />
              </Col>
              <Col flex="auto">
                <Title level={5} className="!mb-1 !text-[#1e1e1e] font-normal">
                  Introduction to Resume Writing
                </Title>
                <Text className="!text-[#495565] text-sm">15:30</Text>
              </Col>
            </Row>
          </Card>

          {/* Video 2 */}
          <Card
            className="rounded-[20px] border border-gray-200 mb-3"
            bodyStyle={{ padding: "16px" }}
          >
            <Row align="middle" gutter={12}>
              <Col>
                <CheckCircleOutlined
                  style={{ fontSize: "24px", color: "#52c41a" }}
                />
              </Col>
              <Col flex="auto">
                <Title level={5} className="!mb-1 !text-[#1e1e1e] font-normal">
                  Crafting Your Professional Summary
                </Title>
                <Text className="!text-[#495565] text-sm">20:15</Text>
              </Col>
            </Row>
          </Card>

          {/* Video 3 - Active/Current */}
          <Card
            className="rounded-[20px] border border-[#ffff00] mb-3"
            style={{ backgroundColor: "#ffffe0" }}
            bodyStyle={{ padding: "16px" }}
          >
            <Row align="middle" gutter={12}>
              <Col>
                <CheckCircleOutlined
                  style={{ fontSize: "24px", color: "#52c41a" }}
                />
              </Col>
              <Col flex="auto">
                <Title level={5} className="!mb-1 !text-[#1e1e1e] font-normal">
                  Highlighting Your Achievements
                </Title>
                <Text className="!text-[#495565] text-sm">18:45</Text>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Video Player Section */}
        <Col xs={24} lg={16}>
          <Card
            className="rounded-[20px] border border-gray-200"
            bodyStyle={{ padding: 0 }}
          >
            {/* Video Player */}
            <div
              className="w-full aspect-video bg-black rounded-t-[20px] flex items-center justify-center"
              style={{
                backgroundImage: `url(${course.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Button
                type="primary"
                icon={<PlayCircleOutlined />}
                className="rounded-full w-16 h-16 flex items-center justify-center bg-white hover:bg-white"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  color: "#1e1e1e",
                }}
              />
            </div>

            {/* Video Details */}
            <div className="p-6">
              <Title level={4} className="!mb-3 !text-[#1e1e1e] font-normal">
                Highlighting Your Achievements
              </Title>
              <Paragraph className="!text-[#495565] !mb-4">
                Using metrics and results to showcase your impact
              </Paragraph>

              <Space>
                <PlayCircleOutlined
                  style={{ fontSize: "24px", color: "#52c41a" }}
                />
                <Text className="!text-[#00a63e] font-medium text-base">
                  Video Watched
                </Text>
              </Space>
            </div>
          </Card>
        </Col>
        
        {/* Quiz Completion Card */}
        <Col span={24}>
          <Card
            bordered={true}
            style={{
              borderRadius: "20px",
              borderColor: "#ffff00",
              background:
                "linear-gradient(117deg, rgba(254,252,232,1) 0%, rgba(255,247,237,1) 100%)",
              marginTop: "24px",
            }}
          >
            <Flex gutter={[16, 16]} align="flex-start" wrap={false}>
              <Col flex="none">
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    backgroundColor: "#ffff00",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M20.6359 17.1875L22.6559 28.5555C22.6785 28.6894 22.6598 28.8269 22.6021 28.9498C22.5444 29.0727 22.4506 29.1751 22.3332 29.2432C22.2157 29.3114 22.0803 29.342 21.945 29.3311C21.8097 29.3202 21.6809 29.2682 21.5759 29.1822L16.8026 25.5995C16.5721 25.4273 16.2922 25.3343 16.0046 25.3343C15.7169 25.3343 15.437 25.4273 15.2066 25.5995L10.4252 29.1808C10.3203 29.2667 10.1917 29.3186 10.0566 29.3296C9.92142 29.3405 9.78614 29.3099 9.6688 29.242C9.55145 29.174 9.45761 29.0719 9.3998 28.9493C9.34199 28.8266 9.32296 28.6893 9.34525 28.5555L11.3639 17.1875"
                      stroke="#1E1E1E"
                      strokeWidth="2.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 18.668C20.4183 18.668 24 15.0862 24 10.668C24 6.24969 20.4183 2.66797 16 2.66797C11.5817 2.66797 8 6.24969 8 10.668C8 15.0862 11.5817 18.668 16 18.668Z"
                      stroke="#1E1E1E"
                      strokeWidth="2.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Col>
              <Col flex="auto" style={{ minWidth: 0 }}>
                <Row>
                  <Col span={24}>
                    <h2
                      style={{
                        margin: 0,
                        color: "#1e1e1e",
                        fontSize: "24px",
                        fontWeight: "normal",
                      }}
                    >
                      Ready for the Final Quiz?
                    </h2>
                  </Col>
                  <Col span={24}>
                    <p
                      style={{
                        margin: "8px 0 16px 0",
                        color: "#354152",
                        fontSize: "16px",
                        lineHeight: "1.5",
                      }}
                    >
                      You've watched all 3 videos! Take the final quiz to complete
                      this course and earn your certificate. You'll need to score
                      at least 70% to pass.
                    </p>
                  </Col>
                  <Col span={24}>
                    <Flex
                      gap={16}
                      align="center"
                      style={{ marginBottom: "16px" }}
                      wrap="wrap"
                    >
                      <Flex gap={8} align="center">
                        <BookOpen style={{ color: "#495565" }} />
                        <span style={{ color: "#495565" }}>3 Questions</span>
                      </Flex>
                      <Flex gap={8} align="center">
                        <Target style={{ color: "#495565" }} />
                        <span style={{ color: "#495565" }}>70% to Pass</span>
                      </Flex>
                      <Flex gap={8} align="center">
                        <TrophyOutlined style={{ color: "#495565" }} />
                        <span style={{ color: "#495565" }}>
                          Certificate on Completion
                        </span>
                      </Flex>
                    </Flex>
                  </Col>
                  <Col span={24}>
                    <Button
                      type="primary"
                      shape="round"
                      style={{
                        backgroundColor: "#ffff00",
                        borderColor: "#ffff00",
                        color: "#1e1e1e",
                        padding: "8px 20px",
                        fontWeight: "normal",
                      }}
                      onClick={handleTakeQuiz}
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M7.34472 1.87629C7.37328 1.72336 7.45443 1.58524 7.57412 1.48584C7.6938 1.38644 7.84447 1.33203 8.00005 1.33203C8.15563 1.33203 8.3063 1.38644 8.42599 1.48584C8.54567 1.58524 8.62682 1.72336 8.65538 1.87629L9.35605 5.58163C9.40581 5.84506 9.53383 6.08737 9.7234 6.27694C9.91297 6.46651 10.1553 6.59453 10.4187 6.64429L14.1241 7.34496C14.277 7.37353 14.4151 7.45468 14.5145 7.57436C14.6139 7.69404 14.6683 7.84472 14.6683 8.00029C14.6683 8.15587 14.6139 8.30655 14.5145 8.42623C14.4151 8.54591 14.277 8.62706 14.1241 8.65563L10.4187 9.35629C10.1553 9.40606 9.91297 9.53408 9.7234 9.72365C9.53383 9.91322 9.40581 10.1555 9.35605 10.419L8.65538 14.1243C8.62682 14.2772 8.54567 14.4154 8.42599 14.5147C8.3063 14.6141 8.15563 14.6686 8.00005 14.6686C7.84447 14.6686 7.6938 14.6141 7.57412 14.5147C7.45443 14.4154 7.37328 14.2772 7.34472 14.1243L6.64405 10.419C6.59429 10.1555 6.46627 9.91322 6.2767 9.72365C6.08713 9.53408 5.84482 9.40606 5.58138 9.35629L1.87605 8.65563C1.72312 8.62706 1.58499 8.54591 1.4856 8.42623C1.3862 8.30655 1.33179 8.15587 1.33179 8.00029C1.33179 7.84472 1.3862 7.69404 1.4856 7.57436C1.58499 7.45468 1.72312 7.37353 1.87605 7.34496L5.58138 6.64429C5.84482 6.59453 6.08713 6.46651 6.2767 6.27694C6.46627 6.08737 6.59429 5.84506 6.64405 5.58163L7.34472 1.87629Z"
                            stroke="#1E1E1E"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.3333 1.33203V3.9987"
                            stroke="#1E1E1E"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14.6667 2.66797H12"
                            stroke="#1E1E1E"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.66659 14.6667C3.40297 14.6667 3.99992 14.0697 3.99992 13.3333C3.99992 12.597 3.40297 12 2.66659 12C1.93021 12 1.33325 12.597 1.33325 13.3333C1.33325 14.0697 1.93021 14.6667 2.66659 14.6667Z"
                            stroke="#1E1E1E"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                    >
                      Take Final Quiz
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Flex>
          </Card>
        </Col>
      </Row>

      {/* Quiz Modal */}
      <CourseQuizModal
        visible={quizModalVisible}
        onClose={handleCloseQuiz}
        questions={quizQuestions}
      />
    </div>
  );
};

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Card,
//   Button,
//   Badge,
//   Progress,
//   Row,
//   Col,
//   Typography,
//   Collapse
// } from "antd";
// import {
//   PlayCircleOutlined,
//   CheckCircleOutlined,
//   ClockCircleOutlined,
//   StarFilled,
//   UserOutlined,
//   DownloadOutlined
// } from "@ant-design/icons";
// import { IMAGES } from "../../../assets";

// const { Title, Text, Paragraph } = Typography;
// const { Panel } = Collapse;

// export const CourseDetails = () => {
//   const { courseId } = useParams();
//   const [course, setCourse] = useState(null);
//   const [modules, setModules] = useState([]);
//   const [currentVideo, setCurrentVideo] = useState(null);

//   // Mock data - replace with your actual API calls
//   useEffect(() => {
//     // Simulate API call
//     const mockCourse = {
//       id: courseId,
//       title: "Resume Writing Mastery",
//       description: "Learn how to craft compelling resumes that get noticed by recruiters and land interviews",
//       image: IMAGES.course,
//       level: "Beginner",
//       category: "Career Development",
//       duration: "2h 30m",
//       rating: "4.8",
//       students: "1250",
//       price: 0
//     };

//     const mockModules = [
//       {
//         id: "1",
//         title: "Introduction to Resume Writing",
//         order_index: 1,
//         videos: [
//           { id: "1", title: "What Makes a Great Resume", duration: "15:30", completed: true },
//           { id: "2", title: "Understanding ATS Systems", duration: "20:15", completed: true },
//           { id: "3", title: "Resume Formats and Styles", duration: "18:45", completed: false }
//         ]
//       },
//       {
//         id: "2",
//         title: "Crafting Your Resume",
//         order_index: 2,
//         videos: [
//           { id: "4", title: "Writing Powerful Summaries", duration: "22:10", completed: false },
//           { id: "5", title: "Highlighting Achievements", duration: "25:30", completed: false }
//         ]
//       }
//     ];

//     setCourse(mockCourse);
//     setModules(mockModules);
//   }, [courseId]);

//   const totalVideos = modules.reduce((acc, module) => acc + module.videos.length, 0);
//   const completedVideos = modules.reduce((acc, module) =>
//     acc + module.videos.filter(v => v.completed).length, 0
//   );
//   const progressPercent = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

//   if (!course) {
//     return (
//       <div className="bg-white w-full min-h-screen flex items-center justify-center p-8">
//         <p className="text-gray-500">Loading course...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white w-full min-h-screen">
//       <div className="px-4 md:px-16 py-8">
//         <Row gutter={[24, 24]}>
//           <Col xs={24} lg={16}>
//             {/* Course Header */}
//             <Card className="rounded-3xl border-2 border-gray-200 overflow-hidden mb-6">
//               <div
//                 className="w-full h-64 md:h-80 bg-cover bg-center"
//                 style={{ backgroundImage: `url(${course.image})` }}
//               />
//             </Card>

//             {/* Course Info */}
//             <div className="mb-6">
//               <Title level={1} className="!text-3xl md:!text-4xl !text-[#1e1e1e] !mb-4">
//                 {course.title}
//               </Title>

//               <Paragraph className="!text-lg !text-[#495565] !mb-4">
//                 {course.description}
//               </Paragraph>

//               <div className="flex flex-wrap gap-2 mb-4">
//                 <Badge className="rounded-[14px] border-gray-300 text-[#1e1e1e] text-sm h-7 px-3">
//                   {course.level}
//                 </Badge>
//                 <Badge className="rounded-[14px] border-gray-300 text-[#1e1e1e] text-sm h-7 px-3">
//                   {course.category}
//                 </Badge>
//               </div>

//               <div className="flex flex-wrap gap-6">
//                 <div className="flex items-center gap-2">
//                   <ClockCircleOutlined className="text-[#495565]" />
//                   <Text className="!text-[#495565]">{course.duration}</Text>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <StarFilled className="text-yellow-500" />
//                   <Text className="!text-[#495565]">{course.rating}</Text>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <UserOutlined className="text-[#495565]" />
//                   <Text className="!text-[#495565]">{course.students} students</Text>
//                 </div>
//               </div>
//             </div>

//             {/* Course Content */}
//             <Card className="rounded-[20px] border border-gray-200">
//               <Title level={2} className="!text-2xl !text-[#1e1e1e] !mb-4">
//                 Course Content
//               </Title>

//               <Collapse
//                 bordered={false}
//                 className="bg-white"
//                 defaultActiveKey={['1']}
//               >
//                 {modules.map((module) => (
//                   <Panel
//                     key={module.id}
//                     header={
//                       <div className="flex justify-between items-center w-full">
//                         <Text strong>Module {module.order_index}: {module.title}</Text>
//                         <Text className="!text-[#495565]">
//                           {module.videos.filter(v => v.completed).length}/{module.videos.length} completed
//                         </Text>
//                       </div>
//                     }
//                     className="mb-2 border border-gray-200 rounded-[14px] overflow-hidden"
//                   >
//                     {module.videos.map((video) => (
//                       <div
//                         key={video.id}
//                         className={`flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer ${
//                           currentVideo === video.id ? 'bg-[#fffe0033]' : ''
//                         }`}
//                         onClick={() => setCurrentVideo(video.id)}
//                       >
//                         <div className="flex items-center gap-3">
//                           {video.completed ? (
//                             <CheckCircleOutlined className="text-green-600 text-lg" />
//                           ) : (
//                             <PlayCircleOutlined className="text-gray-400 text-lg" />
//                           )}
//                           <Text className="!text-[#1e1e1e]">{video.title}</Text>
//                         </div>
//                         <Text className="!text-[#495565]">{video.duration}</Text>
//                       </div>
//                     ))}
//                   </Panel>
//                 ))}
//               </Collapse>
//             </Card>
//           </Col>

//           <Col xs={24} lg={8}>
//             {/* Progress Card */}
//             <Card className="rounded-[20px] border border-gray-200 sticky top-8">
//               <div className="flex flex-col gap-6">
//                 {/* Progress Section */}
//                 <div className="flex flex-col gap-4">
//                   <div className="flex items-center justify-between">
//                     <Text className="!text-[#495565]">Your Progress</Text>
//                     <Title level={3} className="!text-lg !text-[#1e1e1e] !mb-0">
//                       {progressPercent}%
//                     </Title>
//                   </div>
//                   <Progress
//                     percent={progressPercent}
//                     strokeColor="#ffff00"
//                     trailColor="#fffe0033"
//                     showInfo={false}
//                     className="h-3"
//                   />
//                   <Text className="!text-sm !text-[#495565]">
//                     {completedVideos} of {totalVideos} lessons completed
//                   </Text>
//                 </div>

//                 {/* Course Stats */}
//                 <div className="border-t border-gray-200 pt-6 flex flex-col gap-4">
//                   <div className="flex items-center justify-between">
//                     <Text className="!text-[#495565]">Total Duration</Text>
//                     <Text className="!text-[#1e1e1e]">{course.duration}</Text>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <Text className="!text-[#495565]">Total Lessons</Text>
//                     <Text className="!text-[#1e1e1e]">{totalVideos}</Text>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <Text className="!text-[#495565]">Level</Text>
//                     <Text className="!text-[#1e1e1e]">{course.level}</Text>
//                   </div>
//                 </div>

//                 {/* Certificate Button */}
//                 {progressPercent === 100 && (
//                   <Button
//                     type="primary"
//                     icon={<DownloadOutlined />}
//                     className="h-11 w-full bg-[#00a63e] hover:bg-[#009933] border-[#00a63e] text-white rounded-[14px] font-normal text-base"
//                   >
//                     Download Certificate
//                   </Button>
//                 )}
//               </div>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };
