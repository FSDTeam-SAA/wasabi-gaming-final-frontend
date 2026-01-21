import React, { useState } from "react";
import {
  CalendarOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Input,
  Progress,
  Row,
  Typography,
} from "antd";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const SchoolProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("school-info");

  // Realistic UK Law School dummy data
  const schoolData = {
    name: "Westminster Law School",
    fullName: "Westminster Law School, University of Westminster",
    type: "Public University Law School",
    established: "1838 (University), Law School established 1968",
    location: "London, United Kingdom",
    address: "4–12 Little Titchfield Street, London W1W 7BY",
    email: "admissions@westminster.ac.uk",
    phone: "+44 (0)20 7911 5000",
    website: "www.westminster.ac.uk/law",
    about:
      "Westminster Law School is one of the UK’s leading providers of legal education, located in the heart of legal London. We offer qualifying law degrees (LLB), the Solicitors Qualifying Examination (SQE) preparation courses, LLM programmes, and professional development for solicitors and barristers. Our strong links with the legal profession, chambers, and law firms ensure excellent employability outcomes.",
    studentIntake: "Approximately 1,200 undergraduate and postgraduate law students",
    ranking: "Top 50 UK Law Schools (Guardian University Guide 2025)",
    profileCompletion: 92,
  };

  const [formData, setFormData] = useState(schoolData);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(schoolData);
    setIsEditing(false);
  };

  const renderSchoolInfo = () => (
    <div>
      {/* Edit Mode Notice */}
      {isEditing && (
        <Card
          bordered={false}
          style={{
            marginBottom: 24,
            borderRadius: 12,
            backgroundColor: "#fff9e6",
            border: "1px solid #ffe58f",
          }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Text>
                <InfoCircleOutlined style={{ color: "#faad14", marginRight: 8 }} />
                You are currently editing your school profile
              </Text>
            </Col>
            <Col>
              <Button icon={<CloseOutlined />} onClick={handleCancel} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={handleSave}
                style={{ backgroundColor: "#FFFF00", color: "black", border: "none" }}
              >
                Save Changes
              </Button>
            </Col>
          </Row>
        </Card>
      )}

      {/* School Overview */}
      <Card
        bordered={false}
        style={{
          marginBottom: 24,
          borderRadius: 20,
          border: "1px solid #f0f0f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={4} style={{ marginBottom: 24 }}>
          School Overview
        </Title>

        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>School Name</Text>
            </div>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={!isEditing}
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>Full Legal Name</Text>
            </div>
            <Input
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              disabled={!isEditing}
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Col>
        </Row>

        <Row gutter={[24, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>Institution Type</Text>
            </div>
            <Input
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              disabled={!isEditing}
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>Year Established</Text>
            </div>
            <Input
              value={formData.established}
              onChange={(e) => handleInputChange("established", e.target.value)}
              disabled={!isEditing}
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Col>
        </Row>

        <Row gutter={[24, 16]} style={{ marginTop: 16 }}>
          <Col xs={24}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>Campus Address</Text>
            </div>
            <Input
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              disabled={!isEditing}
              size="large"
              prefix={<EnvironmentOutlined />}
              style={{ borderRadius: 8 }}
            />
          </Col>
        </Row>

        <Row gutter={[24, 16]} style={{ marginTop: 16 }}>
          <Col xs={24}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>About the Law School</Text>
            </div>
            <TextArea
              value={formData.about}
              onChange={(e) => handleInputChange("about", e.target.value)}
              disabled={!isEditing}
              rows={6}
              placeholder="Describe your law school..."
              style={{ borderRadius: 8 }}
            />
          </Col>
        </Row>

        <Row gutter={[24, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>Student Intake</Text>
            </div>
            <Input
              value={formData.studentIntake}
              onChange={(e) => handleInputChange("studentIntake", e.target.value)}
              disabled={!isEditing}
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>Current Ranking</Text>
            </div>
            <Input
              value={formData.ranking}
              onChange={(e) => handleInputChange("ranking", e.target.value)}
              disabled={!isEditing}
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Col>
        </Row>
      </Card>

      {/* Contact & Links */}
      <Card
        bordered={false}
        style={{
          borderRadius: 20,
          border: "1px solid #f0f0f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={4} style={{ marginBottom: 24 }}>
          Contact & Links
        </Title>

        <Row gutter={[0, 16]}>
          <Col xs={24}>
            <Input
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={!isEditing}
              size="large"
              prefix={<MailOutlined />}
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col xs={24}>
            <Input
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={!isEditing}
              size="large"
              prefix={<PhoneOutlined />}
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col xs={24}>
            <Input
              value={formData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              disabled={!isEditing}
              size="large"
              prefix={<GlobalOutlined />}
              style={{ borderRadius: 8 }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );

  const renderSecurity = () => (
    <div>
      {/* Change Password */}
      <Card
        bordered={false}
        style={{
          marginBottom: 24,
          borderRadius: 20,
          border: "1px solid #f0f0f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={4} style={{ marginBottom: 24 }}>
          Change Admin Password
        </Title>
        <Row gutter={[0, 16]}>
          <Col xs={24}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>Current Password</Text>
            </div>
            <Input.Password placeholder="••••••••" size="large" style={{ borderRadius: 8 }} />
          </Col>
          <Col xs={24}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>New Password</Text>
            </div>
            <Input.Password placeholder="••••••••" size="large" style={{ borderRadius: 8 }} />
          </Col>
          <Col xs={24}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>Confirm New Password</Text>
            </div>
            <Input.Password placeholder="••••••••" size="large" style={{ borderRadius: 8 }} />
          </Col>
          <Col xs={24}>
            <Button
              type="primary"
              style={{
                backgroundColor: "#ffff00",
                borderColor: "#ffff00",
                color: "#000",
                borderRadius: 12,
                height: 40,
                fontWeight: 600,
              }}
            >
              Update Password
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Danger Zone */}
      <Card
        bordered={false}
        style={{
          borderRadius: 20,
          border: "1px solid #ffccc7",
          backgroundColor: "#fff2f0",
        }}
      >
        <Title level={4} style={{ marginBottom: 16, color: "#a8071a" }}>
          Danger Zone
        </Title>
        <Row justify="space-between" align="middle">
          <Col>
            <Text strong style={{ display: "block", marginBottom: 4 }}>
              Delete School Account
            </Text>
            <Text style={{ color: "#666" }}>
              This action is irreversible. All data will be permanently deleted.
            </Text>
          </Col>
          <Col>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              style={{
                borderRadius: 12,
                height: 40,
                backgroundColor: "#ff4d4f",
                borderColor: "#ff4d4f",
              }}
            >
              Delete Account
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );

  return (
    <div style={{ padding: "24px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
        <Col>
          <Title level={1} style={{ margin: 0, fontSize: "32px" }}>
            School Profile Settings
          </Title>
          <Text style={{ fontSize: "16px", color: "#666" }}>
            Manage your law school’s public profile and account settings
          </Text>
        </Col>
      </Row>

      {/* School Header Card */}
      <Card
        bordered={false}
        style={{
          borderRadius: 20,
          marginBottom: 32,
          background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
          border: "2px solid #bae6fd",
        }}
        bodyStyle={{ padding: 32 }}
      >
        <Row gutter={32} align="middle">
          <Col xs={24} md={6} style={{ textAlign: "center" }}>
            <Avatar
              size={140}
              style={{
                backgroundColor: "#0ea5e9",
                fontSize: "48px",
                fontWeight: "bold",
                color: "#fff",
                marginBottom: 16,
              }}
            >
              WLS
            </Avatar>
            <Button
              icon={<UploadOutlined />}
              style={{ borderRadius: "12px", width: "100%" }}
              disabled={!isEditing}
            >
              Upload Logo
            </Button>
          </Col>

          <Col xs={24} md={18}>
            <Row justify="space-between" align="top" style={{ marginBottom: 16 }}>
              <Col flex="auto">
                <Title level={2} style={{ margin: 0 }}>
                  {formData.name}
                </Title>
                <Text strong style={{ fontSize: "16px", display: "block", marginTop: 8 }}>
                  {formData.fullName}
                </Text>
              </Col>
              <Col>
                <Button
                  type={isEditing ? "default" : "primary"}
                  icon={<EditOutlined />}
                  style={{
                    borderRadius: "12px",
                    backgroundColor: isEditing ? "#f5f5f5" : "#ffff00",
                    borderColor: isEditing ? "#d9d9d9" : "#ffff00",
                    color: "#000",
                    height: 36,
                  }}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Editing..." : "Edit Profile"}
                </Button>
              </Col>
            </Row>

            <Paragraph style={{ color: "#374151", marginBottom: 16 }}>
              {formData.about}
            </Paragraph>

            <Row gutter={[16, 8]}>
              <Col xs={24} md={12}>
                <Text>
                  <EnvironmentOutlined style={{ marginRight: 8 }} />
                  {formData.location}
                </Text>
              </Col>
              <Col xs={24} md={12}>
                <Text>
                  <CalendarOutlined style={{ marginRight: 8 }} />
                  Law School since {formData.established.split(",")[1]?.trim()}
                </Text>
              </Col>
              <Col xs={24} md={12}>
                <Text>
                  <MailOutlined style={{ marginRight: 8 }} />
                  {formData.email}
                </Text>
              </Col>
              <Col xs={24} md={12}>
                <Text>
                  <PhoneOutlined style={{ marginRight: 8 }} />
                  {formData.phone}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* Tab Navigation */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col>
          <Button
            type={activeTab === "school-info" ? "primary" : "default"}
            icon={<InfoCircleOutlined />}
            style={{
              borderRadius: "20px",
              color: "black",
              backgroundColor: activeTab === "school-info" ? "#FFFF00" : "transparent",
            }}
            onClick={() => setActiveTab("school-info")}
          >
            School Info
          </Button>
        </Col>
        <Col>
          <Button
            type={activeTab === "security" ? "primary" : "default"}
            icon={<LockOutlined />}
            style={{
              borderRadius: "20px",
              color: "black",
              backgroundColor: activeTab === "security" ? "#FFFF00" : "transparent",
            }}
            onClick={() => setActiveTab("security")}
          >
            Security
          </Button>
        </Col>
      </Row>

      {/* Tab Content */}
      {activeTab === "school-info" && renderSchoolInfo()}
      {activeTab === "security" && renderSecurity()}

      {/* Profile Completion */}
      <Card
        bordered={false}
        style={{
          marginTop: 32,
          borderRadius: 20,
          background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
          border: "2px solid #bbf7d0",
        }}
      >
        <Row gutter={24} align="middle">
          <Col>
            <div
              style={{
                width: 60,
                height: 60,
                backgroundColor: "#22c55e",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckOutlined style={{ color: "white", fontSize: 24 }} />
            </div>
          </Col>
          <Col flex="auto">
            <Title level={4} style={{ margin: 0 }}>
              Profile Completion
            </Title>
            <Text style={{ color: "#666", display: "block", marginBottom: 8 }}>
              A complete profile helps students discover your law school more easily
            </Text>
            <Progress
              percent={formData.profileCompletion}
              showInfo={false}
              strokeColor="#22c55e"
              style={{ marginBottom: 8 }}
            />
            <Text strong>{formData.profileCompletion}% Complete</Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SchoolProfile;