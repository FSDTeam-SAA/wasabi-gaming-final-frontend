import { Button, Col, Layout, Row, Typography, Input, Card } from "antd";
import { useState, useEffect } from "react";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const LegalCaseStudy = ({ onCancel, onSubmit, test }) => {
  const [response, setResponse] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (test?.content) {
      setResponse("");
      setWordCount(0);
    }
  }, [test]);

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
      });
    }
  };

  const currentTest = test || {
    content: {
      users: ["William Stevenson", "Ethan Dickman", "Olivia Jackson"],
      precedent: {
        title: "Precedent summary",
        facts: "Mrs Donoghue consumed ginger beer that contained a decomposed snail, which caused her to fall ill.",
        issue: "Whether a manufacturer owes a duty of care to the ultimate consumer where there is no direct contract.",
        holding: "The House of Lords recognised a duty of care owed to one's neighbour, meaning that a manufacturer owes a duty of care to consumers where harm is reasonably foreseeable.",
        principle: "A manufacturer owes a duty of care to consumers where harm is reasonably foreseeable."
      },
      pretendCase: {
        title: "Pretend case (fictional)",
        facts: "Mason bought a takeaway coffee, the lid was not secured, hot liquid spilled and caused burns. The drink was sold through a third-party distributor.",
        issue: "Whether Fresh Brew owes a duty of care to Mason in these circumstances.",
        keyDetails: "The House of Lords recognised a duty of care owed to one's neighbour, meaning that a manufacturer owes a duty of care to consumers where harm is reasonably foreseeable."
      },
      userSummary: {
        title: "Your summary",
        instructions: [
          "Apply the Donoghue principal to Mason v Fresh Brew",
          "State one arguments for Mason, and one for Fresh Brew"
        ],
        wordLimit: 200
      }
    }
  };

  const sidebarContent = (
    <div style={{ padding: "16px 0" }}>
      <div style={{ 
        padding: "16px 20px", 
        background: "#ffff00", 
        margin: "0 16px 16px 16px",
        borderRadius: "8px"
      }}>
        <div style={{ 
          fontWeight: "600", 
          color: "#1e1e1e", 
          fontSize: "clamp(14px, 2vw, 16px)",
          fontFamily: "poppins"
        }}>
          William Stevenson
        </div>
      </div>
      <div style={{ 
        padding: "12px 20px", 
        color: "#1e1e1e", 
        fontSize: "clamp(12px, 2vw, 14px)",
        fontFamily: "poppins",
        borderBottom: "1px solid #f0f0f0",
        margin: "0 16px"
      }}>
        Ethan Dickman
      </div>
      <div style={{ 
        padding: "12px 20px", 
        color: "#1e1e1e", 
        fontSize: "clamp(12px, 2vw, 14px)",
        fontFamily: "poppins",
        margin: "0 16px"
      }}>
        Olivia Jackson
      </div>
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "white", fontFamily: "poppins" }} className="poppins">
      {/* Mobile Sidebar Trigger */}
      <div className="lg:hidden">
        <Header style={{ 
          background: "white", 
          padding: "0 16px",
          borderBottom: "1px solid #d9d9d9"
        }}>
          <Button
            onClick={() => setCollapsed(!collapsed)}
            style={{ margin: "16px 0" }}
          >
            {collapsed ? "Show Panel" : "Hide Panel"}
          </Button>
        </Header>
        {!collapsed && (
          <div style={{ 
            background: "#f5f5f5", 
            borderBottom: "1px solid #d9d9d9"
          }}>
            {sidebarContent}
          </div>
        )}
      </div>

      <Layout>
        {/* Desktop Sidebar */}
        <Sider
          width={280}
          style={{ 
            background: "#f5f5f5", 
            borderRight: "1px solid #d9d9d9"
          }}
          className="hidden lg:block"
        >
          {sidebarContent}
        </Sider>

        <Layout>
          <Content style={{ 
            padding: "clamp(16px, 3vw, 24px)", 
            background: "white" 
          }}>
            {/* Precedent Summary Section */}
            <Card
              style={{
                borderRadius: "12px",
                border: "1px solid #d9d9d9",
                marginBottom: "16px",
                background: "linear-gradient(135deg, #fff9c4 0%, #fffde7 100%)"
              }}
              bodyStyle={{ padding: "clamp(16px, 3vw, 24px)" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "20px" }}>
                <div style={{
                  width: "clamp(36px, 8vw, 40px)",
                  height: "clamp(36px, 8vw, 40px)",
                  backgroundColor: "#000",
                  borderRadius: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "clamp(16px, 3vw, 18px)",
                  fontWeight: "bold",
                  marginRight: "16px",
                  flexShrink: 0
                }}>
                  01
                </div>
                <div>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: "clamp(16px, 3vw, 20px)", 
                    fontWeight: "600",
                    color: "#1e1e1e",
                    fontFamily: "poppins"
                  }}>
                    Precedent summary
                  </h3>
                </div>
              </div>

              <Row gutter={[16, 12]} style={{ marginBottom: "12px" }}>
                <Col xs={24} sm={6} lg={4}>
                  <Text strong style={{ 
                    fontSize: "clamp(14px, 2vw, 16px)",
                    color: "#1e1e1e",
                    fontFamily: "poppins"
                  }}>
                    Facts
                  </Text>
                </Col>
                <Col xs={24} sm={18} lg={20}>
                  <Text style={{ 
                    fontSize: "clamp(14px, 2vw, 16px)",
                    color: "#1e1e1e",
                    fontFamily: "poppins",
                    lineHeight: "1.5"
                  }}>
                    {currentTest.content.precedent.facts}
                  </Text>
                </Col>
              </Row>

              <Row gutter={[16, 12]} style={{ marginBottom: "12px" }}>
                <Col xs={24} sm={6} lg={4}>
                  <Text strong style={{ 
                    fontSize: "clamp(14px, 2vw, 16px)",
                    color: "#1e1e1e",
                    fontFamily: "poppins"
                  }}>
                    Issue
                  </Text>
                </Col>
                <Col xs={24} sm={18} lg={20}>
                  <Text style={{ 
                    fontSize: "clamp(14px, 2vw, 16px)",
                    color: "#1e1e1e",
                    fontFamily: "poppins",
                    lineHeight: "1.5"
                  }}>
                    {currentTest.content.precedent.issue}
                  </Text>
                </Col>
              </Row>

              <Row gutter={[16, 12]} style={{ marginBottom: "12px" }}>
                <Col xs={24} sm={6} lg={4}>
                  <Text strong style={{ 
                    fontSize: "clamp(14px, 2vw, 16px)",
                    color: "#1e1e1e",
                    fontFamily: "poppins"
                  }}>
                    Holding
                  </Text>
                </Col>
                <Col xs={24} sm={18} lg={20}>
                  <Text style={{ 
                    fontSize: "clamp(14px, 2vw, 16px)",
                    color: "#1e1e1e",
                    fontFamily: "poppins",
                    lineHeight: "1.5"
                  }}>
                    {currentTest.content.precedent.holding}
                  </Text>
                </Col>
              </Row>

              <Row gutter={[16, 12]}>
                <Col xs={24} sm={6} lg={4}>
                  <Text strong style={{ 
                    fontSize: "clamp(14px, 2vw, 16px)",
                    color: "#1e1e1e",
                    fontFamily: "poppins"
                  }}>
                    Principle
                  </Text>
                </Col>
                <Col xs={24} sm={18} lg={20}>
                  <Text style={{ 
                    fontSize: "clamp(14px, 2vw, 16px)",
                    color: "#1e1e1e",
                    fontFamily: "poppins",
                    lineHeight: "1.5"
                  }}>
                    {currentTest.content.precedent.principle}
                  </Text>
                </Col>
              </Row>
            </Card>

            {/* Pretend Case Section */}
            <Card
              style={{
                borderRadius: "12px",
                border: "1px solid #d9d9d9",
                marginBottom: "16px",
                background: "white"
              }}
              bodyStyle={{ padding: "clamp(16px, 3vw, 24px)" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "20px" }}>
                <div style={{
                  width: "clamp(36px, 8vw, 40px)",
                  height: "clamp(36px, 8vw, 40px)",
                  backgroundColor: "#000",
                  borderRadius: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "clamp(16px, 3vw, 18px)",
                  fontWeight: "bold",
                  marginRight: "16px",
                  flexShrink: 0
                }}>
                  02
                </div>
                <div>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: "clamp(16px, 3vw, 20px)", 
                    fontWeight: "600",
                    color: "#1e1e1e",
                    fontFamily: "poppins"
                  }}>
                    Pretend case (fictional)
                  </h3>
                </div>
              </div>

              <Row gutter={[16, 12]} style={{ marginBottom: "12px" }}>
                <Col xs={24} sm={6} lg={4}>
                  <Text strong style={{ 
                    fontSize: "clamp(14px, 2vw, 16px)",
                    color: "#1e1e1e",
                    fontFamily: "poppins"
                  }}>
                    Facts
                  </Text>
                </Col>
                <Col xs={24} sm={18} lg={20}>
                  <Text style={{ 
                    fontSize: "clamp(14px, 2vw, 16px)",
                    color: "#1e1e1e",
                    fontFamily: "poppins",
                    lineHeight: "1.5"
                  }}>
                    {currentTest.content.pretendCase.facts}
                  </Text>
                </Col>
              </Row>

              <Row gutter={[16, 12]} style={{ marginBottom: "12px" }}>
                <Col xs={24} sm={6} lg={4}>
                  <Text strong style={{ 
                    fontSize: "clamp(14px, 2vw, 16px)",
                    color: "#1e1e1e",
                    fontFamily: "poppins"
                  }}>
                    Issue
                  </Text>
                </Col>
                <Col xs={24} sm={18} lg={20}>
                  <Text style={{ 
                    fontSize: "clamp(14px, 2vw, 16px)",
                    color: "#1e1e1e",
                    fontFamily: "poppins",
                    lineHeight: "1.5"
                  }}>
                    {currentTest.content.pretendCase.issue}
                  </Text>
                </Col>
              </Row>

              <Row gutter={[16, 12]}>
                <Col xs={24} sm={6} lg={4}>
                  <Text strong style={{ 
                    fontSize: "clamp(14px, 2vw, 16px)",
                    color: "#1e1e1e",
                    fontFamily: "poppins"
                  }}>
                    Key details
                  </Text>
                </Col>
                <Col xs={24} sm={18} lg={20}>
                  <Text style={{ 
                    fontSize: "clamp(14px, 2vw, 16px)",
                    color: "#1e1e1e",
                    fontFamily: "poppins",
                    lineHeight: "1.5"
                  }}>
                    {currentTest.content.pretendCase.keyDetails}
                  </Text>
                </Col>
              </Row>
            </Card>

            {/* User Summary Section */}
            <Card
              style={{
                borderRadius: "12px",
                border: "1px solid #d9d9d9",
                background: "white"
              }}
              bodyStyle={{ padding: "clamp(16px, 3vw, 24px)" }}
            >
              <div style={{ 
                display: "flex", 
                flexDirection: "column",
                gap: "16px",
                marginBottom: "20px" 
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{
                    width: "clamp(36px, 8vw, 40px)",
                    height: "clamp(36px, 8vw, 40px)",
                    backgroundColor: "#000",
                    borderRadius: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "clamp(16px, 3vw, 18px)",
                    fontWeight: "bold",
                    flexShrink: 0
                  }}>
                    03
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      margin: 0, 
                      fontSize: "clamp(16px, 3vw, 20px)", 
                      fontWeight: "600",
                      color: "#1e1e1e",
                      fontFamily: "poppins",
                      marginBottom: "8px"
                    }}>
                      Your summary
                    </h3>
                    <div style={{ 
                      fontSize: "clamp(14px, 2vw, 16px)", 
                      color: "#1e1e1e", 
                      fontFamily: "poppins" 
                    }}>
                      {currentTest.content.userSummary.instructions.map((instruction, index) => (
                        <div key={index} style={{ marginBottom: "4px" }}>
                          • {instruction}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div style={{ textAlign: "left" }}>
                  <div style={{ 
                    fontSize: "clamp(14px, 2vw, 16px)", 
                    color: "#666",
                    fontFamily: "poppins",
                    marginBottom: "4px"
                  }}>
                    Word count
                  </div>
                  <div style={{ 
                    fontSize: "clamp(16px, 3vw, 18px)", 
                    fontWeight: "600",
                    color: wordCount > currentTest.content.userSummary.wordLimit ? "#ff4d4f" : "#1e1e1e",
                    fontFamily: "poppins"
                  }}>
                    {wordCount} of {currentTest.content.userSummary.wordLimit}
                  </div>
                </div>
              </div>

              <div style={{
                background: "#f8f9fa",
                borderRadius: "8px",
                border: "1px solid #e9ecef",
                padding: "16px",
                marginBottom: "16px"
              }}>
                <TextArea
                  value={response}
                  onChange={handleResponseChange}
                  placeholder="Write your summary applying the principal here"
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "clamp(14px, 2vw, 16px)",
                    resize: "none",
                    minHeight: "120px",
                    boxShadow: "none",
                    fontFamily: "poppins"
                  }}
                  autoSize={{ minRows: 6, maxRows: 10 }}
                />
              </div>

             <div style={{ textAlign: "right" }}>
              <Button 
                style={{
                  background: "white",
                  border: "1px solid #d9d9d9",
                  borderRadius: "6px",
                  fontWeight: "500",
                  marginRight: "8px",
                  fontFamily: "poppins"
                }}
                onClick={onCancel}
              >
                Save Draft
              </Button>
              <Button 
                type="primary"
                style={{ 
                  background: "#ffff00", 
                  borderColor: "#ffff00",
                  borderRadius: "6px",
                  fontWeight: "500",
                  color: "#1e1e1e",
                  fontFamily: "poppins"
                }}
                onClick={handleSubmit}
                disabled={wordCount > currentTest.content.userSummary.wordLimit || wordCount === 0}
              >
                Submit
              </Button>
            </div>
            </Card>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LegalCaseStudy;