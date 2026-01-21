import { useState } from "react";
import {
  Card,
  Button,
  Progress,
  Row,
  Col,
  Typography,
  Radio,
  Modal,
  Flex,
} from "antd";
import {
  CloseOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const CourseQuizModal = ({ visible, onClose, questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (value) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = parseInt(value);
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const correctAnswers = userAnswers.filter(
        (answer, index) => answer === questions[index].correctAnswer
      ).length;
      const calculatedScore = (correctAnswers / questions.length) * 100;
      setScore(calculatedScore);
      setQuizCompleted(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setScore(0);
  };

  const handleCancelQuiz = () => {
    onClose();
  };

  const getCurrentProgress = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  const renderQuizQuestion = () => {
    const question = questions[currentQuestion];
    const userAnswer = userAnswers[currentQuestion];

    return (
      <Card
        style={{
          width: 512,
          borderRadius: "16px",
          border: "1px solid #0000001a",
        }}
        bodyStyle={{ padding: 25 }}
      >
        <Row>
          <Col span={24}>
            <Title level={3} style={{ marginBottom: 0 }}>
              Final Course Quiz
            </Title>
            <Text type="secondary">
              Question {currentQuestion + 1} of {questions.length}
            </Text>
          </Col>
        </Row>

        <Row style={{ marginTop: 32 }}>
          <Col span={24}>
            <Card
              style={{
                borderRadius: "20px",
                border: "2px solid #bddaff",
                background:
                  "linear-gradient(117deg, rgba(239,246,255,1) 0%, rgba(250,245,255,1) 100%)",
              }}
              bodyStyle={{ padding: "26px" }}
            >
              <Flex gap={12} gutter={16} style={{ marginBottom: 24 }}>
                <Col flex="none">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#ffff00",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                      {currentQuestion + 1}
                    </Text>
                  </div>
                </Col>
                <Col flex="auto">
                  <Text
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      lineHeight: "1.4",
                    }}
                  >
                    {question.question}
                  </Text>
                </Col>
              </Flex>

              <Radio.Group
                style={{ width: "100%" }}
                value={userAnswer}
                onChange={(e) => handleAnswerSelect(e.target.value)}
              >
                {question.options.map((option, index) => (
                  <Radio.Button
                    key={index}
                    value={index}
                    // className="truncate"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                      border: "2px solid #d9d9d9",
                      marginBottom: 12,
                      backgroundColor:
                        userAnswer === index ? "#fffef0" : "transparent",
                      borderColor: userAnswer === index ? "#ffff00" : "#d9d9d9",
                      padding: "0 20px",
                      color: "black"
                    }}
                  >
                    <span
                      style={{
                        width: "100%",
                        textAlign: "center",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {option}
                    </span>
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Card>
          </Col>
        </Row>

        <Row style={{ marginTop: 24 }}>
          <Col span={24}>
            <Row justify="space-between">
              <Col>
                <Text>Progress</Text>
              </Col>
              <Col>
                <Text>
                  {currentQuestion + 1} / {questions.length}
                </Text>
              </Col>
            </Row>
            <Progress
              percent={getCurrentProgress()}
              showInfo={false}
              strokeColor="#ffff00"
              style={{ borderRadius: "50px", marginTop: 8 }}
            />
          </Col>
        </Row>

        <Row style={{ marginTop: 24 }} gutter={16}>
          <Col flex="auto">
            <Button
              block
              style={{ borderRadius: "14px", color: "black" }}
              onClick={handleCancelQuiz}
            >
              Cancel Quiz
            </Button>
          </Col>
          <Col flex="auto">
            <Button
              type="primary"
              block
              style={{
                backgroundColor: "#ffff00",
                borderColor: "#ffff00",
                borderRadius: "14px",
                color: "#1e1e1e",
              }}
              onClick={handleNextQuestion}
              disabled={userAnswers[currentQuestion] === undefined}
              icon={
                currentQuestion === questions.length - 1 &&  <CheckCircleOutlined />
              }
            >
              {currentQuestion === questions.length - 1
                ? "Submit Quiz"
                : <div className="flex items-center justify-center gap-2"> 
                  Next Question
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="#1E1E1E"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>}
            </Button>
          </Col>
        </Row>

        <div
          style={{
            position: "absolute",
            top: 17,
            right: 17,
            cursor: "pointer",
            opacity: 0.7,
          }}
          onClick={onClose}
        >
          <CloseOutlined />
        </div>
      </Card>
    );
  };

  const renderQuizResult = () => {
    const isPass = score >= 70;
    const correctAnswers = userAnswers.filter(
      (answer, index) => answer === questions[index].correctAnswer
    ).length;

    if (isPass) {
      return (
        <Card
          style={{
            width: 512,
            borderRadius: "16px",
            border: "1px solid #0000001a",
          }}
          bodyStyle={{ padding: 25 }}
        >
          <Row>
            <Col span={24}>
              <Title level={2} style={{ marginBottom: 0 }}>
                Final Course Quiz
              </Title>
              <Text type="secondary">Here are your results</Text>
            </Col>
          </Row>

          <Row style={{ marginTop: 32 }}>
            <Col span={24}>
              <Card
                style={{
                  borderRadius: "20px",
                  border: "2px solid #b8f7cf",
                  background:
                    "linear-gradient(117deg, rgba(240,253,244,1) 0%, rgba(236,253,245,1) 100%)",
                  textAlign: "center",
                }}
                bodyStyle={{ padding: "34px 0" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      background: "#d9f7be",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircleOutlined
                      style={{ fontSize: 40, color: "#52c41a" }}
                    />
                  </div>
                </div>
                <Title level={3} style={{ color: "#0d532b" }}>
                  Congratulations! 🎉
                </Title>
                <Text style={{ color: "#008235", display: "block" }}>
                  You scored {Math.round(score)}% ({correctAnswers} out of{" "}
                  {questions.length})
                </Text>
                <Paragraph style={{ color: "#354152", marginBottom: 0 }}>
                  You've successfully completed this course and earned your
                  certificate!
                </Paragraph>
              </Card>
            </Col>
          </Row>

          <Row style={{ marginTop: 24 }}>
            <Col span={24}>
              <Title level={4}>Answer Review</Title>
            </Col>
          </Row>

          <Row gutter={[0, 16]}>
            {questions.map((question, index) => (
              <Col span={24} key={question.id || index}>
                <Card
                  style={{
                    borderRadius: "20px",
                    border: "2px solid #b8f7cf",
                    background: "#f6ffed",
                  }}
                  bodyStyle={{ padding: "18px" }}
                >
                  <Row align="middle" gutter={16}>
                    <Col>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          background: "#d9f7be",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CheckCircleOutlined
                          style={{ fontSize: 20, color: "#52c41a" }}
                        />
                      </div>
                    </Col>
                    <Col flex="auto">
                      <Text style={{ color: "#354152" }}>
                        {question.question}
                      </Text>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>

          <Row style={{ marginTop: 24 }}>
            <Col span={24}>
              <Button
                type="default"
                block
                style={{
                  borderRadius: "14px",
                  border: "1px solid #0000001a",
                }}
                onClick={onClose}
              >
                Close
              </Button>
            </Col>
          </Row>

          <div
            style={{
              position: "absolute",
              top: 17,
              right: 17,
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            <CloseOutlined style={{ fontSize: 16, color: "#1e1e1e" }} />
          </div>
        </Card>
      );
    } else {
      return (
        <Card
          style={{
            width: 512,
            borderRadius: "16px",
            border: "1px solid #0000001a",
          }}
          bodyStyle={{ padding: 25 }}
        >
          <Row>
            <Col span={24}>
              <Title level={2} style={{ marginBottom: 0 }}>
                Final Course Quiz
              </Title>
              <Text type="secondary">Here are your results</Text>
            </Col>
          </Row>

          <Row style={{ marginTop: 32 }}>
            <Col span={24}>
              <Card
                style={{
                  borderRadius: "20px",
                  border: "2px solid #ffc9c9",
                  background:
                    "linear-gradient(117deg, rgba(254,242,242,1) 0%, rgba(255,247,237,1) 100%)",
                  textAlign: "center",
                }}
                bodyStyle={{ padding: "34px 0" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      background: "#ffe2e2",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ExclamationCircleOutlined
                      style={{ fontSize: 40, color: "#c10007" }}
                    />
                  </div>
                </div>
                <Title level={3} style={{ color: "#811719" }}>
                  Not Quite There
                </Title>
                <Text style={{ color: "#c10007", display: "block" }}>
                  You scored {Math.round(score)}% ({correctAnswers} out of{" "}
                  {questions.length})
                </Text>
                <Paragraph style={{ color: "#354152", marginBottom: 0 }}>
                  You need 70% to pass. Review the course content and try again.
                </Paragraph>
              </Card>
            </Col>
          </Row>

          <Row style={{ marginTop: 24 }}>
            <Col span={24}>
              <Title level={4}>Answer Review</Title>
            </Col>
          </Row>

          <Row gutter={[0, 16]}>
            {questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <Col span={24} key={question.id || index}>
                  <Card
                    style={{
                      borderRadius: "20px",
                      border: "2px solid #ffc9c9",
                      background: "#fff1f0",
                    }}
                    bodyStyle={{ padding: "18px" }}
                  >
                    <Row gutter={16}>
                      <Col>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            background: "#ffe2e2",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ExclamationCircleOutlined
                            style={{ fontSize: 16, color: "#c10007" }}
                          />
                        </div>
                      </Col>
                      <Col flex="auto">
                        <Text>{question.question}</Text>
                        {!isCorrect && (
                          <>
                            <Paragraph
                              style={{ marginBottom: 0, color: "#e7000b" }}
                            >
                              Your answer: {question.options[userAnswer]}
                            </Paragraph>
                            <Paragraph
                              style={{ marginBottom: 0, color: "#00a63e" }}
                            >
                              Correct answer:{" "}
                              {question.options[question.correctAnswer]}
                            </Paragraph>
                          </>
                        )}
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            })}
          </Row>

          <Row gutter={16} style={{ marginTop: 24 }}>
            <Col flex="auto">
              <Button block style={{ borderRadius: "14px" }} onClick={onClose}>
                Back to Course
              </Button>
            </Col>
            <Col flex="auto">
              <Button
                block
                type="primary"
                style={{
                  borderRadius: "14px",
                  backgroundColor: "#ffff00",
                  borderColor: "#ffff00",
                  color: "#1e1e1e",
                }}
                onClick={handleRetakeQuiz}
              >
                Retake Quiz
              </Button>
            </Col>
          </Row>

          <div
            style={{
              position: "absolute",
              top: 17,
              right: 17,
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            <CloseOutlined style={{ fontSize: 16, color: "#1e1e1e" }} />
          </div>
        </Card>
      );
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={512}
      style={{ maxWidth: "90vw" }}
      bodyStyle={{
        padding: 0,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
      closable={false}
      maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      {quizCompleted ? renderQuizResult() : renderQuizQuestion()}
    </Modal>
  );
};

export default CourseQuizModal;
