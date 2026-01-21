import { Button, Col, Layout, Row, Typography, Input } from "antd";
import { useState, useEffect } from "react";

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const WrittenAssessment = ({ onCancel, onSubmit, test }) => {
  const [response, setResponse] = useState("");
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (test?.content) {
      setResponse("");
      setWordCount(0);
    }
  }, [test]);

  const handleResponseChange = (e) => {
    const text = e.target.value;
    setResponse(text);

    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(text.trim() === "" ? 0 : words.length);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        testId: test.id,
        response,
        wordCount,
      });
    }
  };

  const currentTest = test || {
    content: {
      caseStudy: {
        title: "Case Study",
        description:
          "You are an analyst at a consulting firm. Your manager has requested a brief email about a recent client case:",
        client: "Ventara Automotive",
        scenario:
          "Our client, Ventara, is experiencing delays in the launch of their new electric vehicle. The main issues include supply chain disruptions and technical challenges with the battery system. This could affect their position in the market and profitability.",
        instructions: [
          "Summarize the main issues",
          "Explain potential impact on client relationship",
          "Suggest two next steps",
        ],
      },
      writingTask: {
        title: "Case Study",
        description: "Write an internal email to your manager",
        greeting: "Dear [Manager],",
        wordLimit: 300,
        requirements: [
          "Use at least 300 words",
          "Use a professional or concise tone",
          "Structure your response clearly",
        ],
      },
    },
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundColor: "white",
        fontFamily: "poppins",
      }}
      className="poppins"
    >
      <Header style={{ 
        backgroundColor: "white", 
        textAlign: "center",
        padding: "16px 24px",
        height: "auto"
      }}>
        <Title 
          level={1} 
          style={{ 
            margin: 0,
            fontSize: "clamp(24px, 5vw, 32px)"
          }}
        >
          Written assessment
        </Title>
      </Header>
      
      <Content style={{ 
        padding: "clamp(16px, 4vw, 50px)",
        marginTop: "clamp(20px, 4vw, 50px)"
      }}>
        <Row gutter={[0, 24]}>
          {/* Left Column - Case Study */}
          <Col xs={24} lg={12}>
            <div
              style={{
                padding: "clamp(16px, 3vw, 24px)",
                border: "1px solid #d9d9d9",
                borderRadius: "16px 16px 0 0",
                height: "100%",
              }}
            >
              <Title level={3} style={{ fontSize: "clamp(18px, 4vw, 24px)" }}>
                Case Study
              </Title>
              <div className="poppins text-base font-semibold text-[#4A5565] py-4">
                {currentTest.content.caseStudy.description}
              </div>

              {currentTest.content.caseStudy.client && (
                <>
                  <Title level={3} style={{ fontSize: "clamp(16px, 3vw, 20px)" }}>
                    {currentTest.content.caseStudy.client}
                  </Title>
                  <div className="poppins text-base font-semibold text-[#4A5565] py-4">
                    {currentTest.content.caseStudy.scenario}
                  </div>
                </>
              )}

              <Paragraph>
                <div className="poppins text-base font-semibold text-[#4A5565] pt-4">
                  In your email to your manager:
                </div>
                <br />
                {currentTest.content.caseStudy.instructions.map(
                  (instruction, index) => (
                    <div
                      className="poppins text-base font-semibold text-[#4A5565]"
                      key={index}
                    >
                      • {instruction}
                      <br />
                    </div>
                  )
                )}
              </Paragraph>
            </div>
          </Col>

          {/* Right Column - Writing Task */}
          <Col xs={24} lg={12}>
            <div
              style={{
                padding: "clamp(16px, 3vw, 24px)",
                border: "1px solid #d9d9d9",
                borderRadius: "0 0 16px 16px",
                height: "100%",
              }}
            >
              <Title level={3} style={{ fontSize: "clamp(18px, 4vw, 24px)" }}>
                Case Study
              </Title>
              <div className="poppins text-base font-semibold text-[#4A5565] py-4">
                {currentTest.content.writingTask.description}
              </div>

              {currentTest.content.writingTask.greeting && (
                <div className="poppins text-base font-semibold text-[#4A5565] py-4">
                  {currentTest.content.writingTask.greeting}
                </div>
              )}

              <div
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: 12,
                  padding: 16,
                  height: 300,
                  marginBottom: 16,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextArea
                  value={response}
                  className="poppins text-base"
                  onChange={handleResponseChange}
                  placeholder="Type your response here..."
                  style={{
                    border: "none",
                    resize: "none",
                    height: "100%",
                    minHeight: "100%",
                    boxShadow: "none",
                    overflowY: "auto",
                    flex: 1,
                    fontSize: "clamp(14px, 2vw, 16px)"
                  }}
                  autoSize={false}
                />
              </div>

              <Paragraph style={{ marginBottom: 16 }}>
                <Text
                  strong
                  style={{
                    color:
                      wordCount >= currentTest.content.writingTask.wordLimit
                        ? "#52c41a"
                        : "#ff4d4f",
                    fontSize: "clamp(14px, 2vw, 16px)"
                  }}
                >
                  {wordCount}/{currentTest.content.writingTask.wordLimit} words
                </Text>
                {wordCount < currentTest.content.writingTask.wordLimit && (
                  <Text 
                    type="danger" 
                    style={{ 
                      marginLeft: 8,
                      fontSize: "clamp(12px, 2vw, 14px)"
                    }}
                  >
                    (Minimum {currentTest.content.writingTask.wordLimit} words required)
                  </Text>
                )}
              </Paragraph>

              <Paragraph>
                {currentTest.content.writingTask.requirements.map(
                  (requirement, index) => (
                    <div
                      className="poppins text-base font-semibold text-[#4A5565]"
                      key={index}
                      style={{ fontSize: "clamp(14px, 2vw, 16px)" }}
                    >
                      • {requirement}
                      <br />
                    </div>
                  )
                )}
              </Paragraph>
            </div>
          </Col>
        </Row>

        {/* Action Buttons */}
        <Row 
          justify="center" 
          style={{ 
            marginTop: "clamp(30px, 6vw, 50px)", 
            marginBottom: 30 
          }} 
          className="poppins"
          gutter={[16, 16]}
        >
          <Col xs={12} sm={6} lg={4}>
            <Button
              className="font-semibold w-full"
              type="default"
              style={{ 
                color: "#1E1E1E",
                height: "clamp(44px, 8vw, 48px)",
                fontSize: "clamp(14px, 2vw, 16px)"
              }}
              onClick={onCancel}
              size="large"
            >
              Cancel
            </Button>
          </Col>
          <Col xs={12} sm={6} lg={4}>
            <Button
              className="font-semibold w-full"
              style={{ 
                backgroundColor: "#FFFF00", 
                color: "#1E1E1E",
                height: "clamp(44px, 8vw, 48px)",
                fontSize: "clamp(14px, 2vw, 16px)"
              }}
              type="primary"
              onClick={handleSubmit}
              disabled={wordCount < currentTest.content.writingTask.wordLimit}
              size="large"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default WrittenAssessment;