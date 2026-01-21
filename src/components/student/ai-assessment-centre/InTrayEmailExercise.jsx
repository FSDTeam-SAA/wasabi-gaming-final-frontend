import { Button, Col, Divider, Input, Layout, Row, Typography } from "antd";
import { useState, useEffect } from "react";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const InTrayEmailExercise = ({ onCancel, onSubmit, test }) => {
  const [response, setResponse] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(24 * 60 + 2);

  useEffect(() => {
    if (test?.content) {
      setResponse("");
      setWordCount(0);
    }
  }, [test]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResponseChange = (e) => {
    const text = e.target.value;
    setResponse(text);
    
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(text.trim() === "" ? 0 : words.length);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        testId: test.id,
        response,
        wordCount,
        timeSpent: 24 * 60 + 2 - timeLeft
      });
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentTest = test || {
    content: {
      header: {
        title: "IN-TRAY EMAIL EXERCISE",
        time: "24:02"
      },
      emails: [
        {
          subject: "Disclosure Review-Riverside Case",
          priority: "HIGH",
          time: "09:45",
          content: `Hi,\n\nWe have received the disclosure documents for the Riverside Developments vs Newton Homes matter by 3 p.m, for a client call. The client has specifically asked that we flag any key discrepancies between the parties disputes.\n\n- Prioritize the mail thread "Construction Delays-2023"- writing a note of no more than 150 words outlining key points and potential risks; send your summary back to me for review before 2:30 p.m.`
        },
        {
          subject: "Draft Witness statement-Follow Up",
          priority: "MEDIUM",
          time: "09:30",
          content: "Follow up on the witness statement draft..."
        },
        {
          subject: "Billing Query-Newton Homes Matter",
          priority: "LOW",
          time: "09:15",
          content: "Query regarding billing for Newton Homes matter..."
        }
      ],
      requirements: {
        wordLimit: 150,
        instructions: [
          "Write a note of no more than 150 words",
          "Outline key points and potential risks",
          "Submit before 2:30 p.m."
        ]
      }
    }
  };

  const getPriorityButtonStyle = (priority) => {
    switch (priority) {
      case "HIGH":
        return {
          backgroundColor: "#FFFF00",
          color: "black"
        };
      default:
        return {
          backgroundColor: "#f6f7f7",
          color: "black",
          borderColor: "#f6f7f7"
        };
    }
  };

  return (
    <Layout style={{ 
      minHeight: "70vh", 
      backgroundColor: "white", 
      fontFamily: "poppins" 
    }} 
    className="poppins px-4 md:px-12 mt-4 md:mt-8"
    >
      <Header style={{ 
        backgroundColor: "#fef9c2", 
        padding: "12px 16px",
        height: "auto"
      }}>
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={12} sm={16}>
            <Title 
              level={2} 
              style={{ 
                margin: 0, 
                color: "#1E1E1E",
                fontSize: "clamp(18px, 4vw, 24px)",
                textAlign: "left"
              }}
            >
              {currentTest.content.header?.title || "IN-TRAY EMAIL EXERCISE"}
            </Title>
          </Col>
          <Col xs={12} sm={8}>
            <Title 
              level={2} 
              style={{ 
                margin: 0, 
                color: "#1E1E1E",
                fontSize: "clamp(18px, 4vw, 24px)",
                textAlign: "right"
              }}
            >
              {formatTime(timeLeft)}
            </Title>
          </Col>
        </Row>
      </Header>
      
      <Content style={{ marginTop: 16 }}>
        <Row gutter={[0, 16]}>
          {/* Left Column - Inbox */}
          <Col xs={24} lg={12}>
            <div
              style={{
                backgroundColor: "white",
                padding: "clamp(12px, 3vw, 16px)",
                borderRadius: "16px 16px 0 0",
                border: "1px solid #d9d9d9",
                height: "100%"
              }}
            >
              <Title 
                className="poppins" 
                level={3} 
                style={{ 
                  color: "#1E1E1E",
                  fontSize: "clamp(16px, 3vw, 20px)"
                }}
              >
                Inbox
              </Title>
              
              {currentTest.content.emails?.map((email, index) => (
                <div 
                  key={index} 
                  style={{ 
                    marginBottom: "20px",
                    padding: "12px",
                    border: "1px solid #f0f0f0",
                    borderRadius: "8px"
                  }}
                >
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "8px"
                  }}>
                    <Title 
                      className="poppins" 
                      level={4} 
                      style={{ 
                        color: "#1E1E1E", 
                        marginBottom: "8px",
                        fontSize: "clamp(14px, 2vw, 16px)",
                        flex: 1
                      }}
                    >
                      {email.subject}
                    </Title>
                    <Button
                      type="primary"
                      className="font-semibold poppins"
                      style={{
                        ...getPriorityButtonStyle(email.priority),
                        fontSize: "clamp(12px, 2vw, 14px)",
                        whiteSpace: "nowrap"
                      }}
                      size="small"
                    >
                      {email.priority}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Col>

          {/* Right Column - Email Content */}
          <Col xs={24} lg={12}>
            <div
              style={{
                backgroundColor: "white",
                padding: "clamp(12px, 3vw, 16px)",
                borderRadius: "0 0 16px 16px",
                border: "1px solid #d9d9d9",
                height: "100%"
              }}
            >
              <div style={{ marginBottom: 16 }}>
                <Title 
                  className="poppins" 
                  level={3} 
                  style={{ 
                    color: "#1E1E1E",
                    fontSize: "clamp(16px, 3vw, 20px)",
                    marginBottom: 4
                  }}
                >
                  James Turner, Associate
                </Title>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "8px"
                }}>
                  <Text className="poppins" style={{ color: "#4A5565", fontSize: "clamp(12px, 2vw, 14px)" }}>
                    Assistant
                  </Text>
                  <Text className="poppins" style={{ color: "#4A5565", fontSize: "clamp(12px, 2vw, 14px)" }}>
                    09:45
                  </Text>
                </div>
              </div>
              
              <Divider style={{ margin: "16px 0" }} />
              
              <Paragraph 
                className="poppins" 
                style={{ 
                  color: "#4A5565", 
                  lineHeight: "1.6",
                  fontSize: "clamp(14px, 2vw, 16px)"
                }}
              >
                {currentTest.content.emails?.[0]?.content || "No content available"}
              </Paragraph>
              
              <Divider style={{ margin: "16px 0" }} />
              
              <Title 
                className="poppins" 
                level={3} 
                style={{ 
                  color: "#1E1E1E",
                  fontSize: "clamp(16px, 3vw, 20px)",
                  marginBottom: 16
                }}
              >
                Your Response
              </Title>
              
              <TextArea
                rows={6}
                className="poppins"
                placeholder="Write your reply here...."
                value={response}
                onChange={handleResponseChange}
                style={{
                  borderRadius: "8px",
                  border: "1px solid #d9d9d9",
                  resize: "none",
                  fontSize: "clamp(14px, 2vw, 16px)"
                }}
              />
              
              <div style={{ marginTop: "12px", marginBottom: "16px" }}>
                <Text
                  strong
                  style={{
                    color: wordCount >= currentTest.content.requirements?.wordLimit ? '#52c41a' : '#ff4d4f',
                    fontSize: "clamp(14px, 2vw, 16px)"
                  }}
                >
                  {wordCount}/{currentTest.content.requirements?.wordLimit || 150} words
                </Text>
                {wordCount > (currentTest.content.requirements?.wordLimit || 150) && (
                  <Text 
                    type="danger" 
                    style={{ 
                      marginLeft: "8px",
                      fontSize: "clamp(12px, 2vw, 14px)"
                    }}
                  >
                    (Maximum {currentTest.content.requirements?.wordLimit || 150} words allowed)
                  </Text>
                )}
              </div>

              <Row 
                justify="end" 
                style={{ marginTop: "16px" }}
                gutter={[8, 8]}
              >
                <Col xs={12} sm={6}>
                  <Button
                    type="default"
                    className="poppins font-medium w-full"
                    style={{
                      backgroundColor: "#FFFF00",
                      borderColor: "#FFFF00",
                      color: "#1E1E1E",
                      fontSize: "clamp(12px, 2vw, 14px)",
                      height: "clamp(36px, 6vw, 40px)"
                    }}
                    onClick={onCancel}
                  >
                    Save Draft
                  </Button>
                </Col>
                <Col xs={12} sm={6}>
                  <Button
                    type="primary"
                    className="poppins font-medium w-full"
                    style={{ 
                      backgroundColor: "#FFFF00", 
                      borderColor: "#FFFF00",
                      color: "#1E1E1E",
                      fontSize: "clamp(12px, 2vw, 14px)",
                      height: "clamp(36px, 6vw, 40px)"
                    }}
                    onClick={handleSubmit}
                    disabled={wordCount > (currentTest.content.requirements?.wordLimit || 150) || wordCount === 0}
                  >
                    Submit All
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default InTrayEmailExercise;