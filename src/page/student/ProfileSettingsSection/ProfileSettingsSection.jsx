import { useState } from "react";
import {
  CalendarOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  GithubOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  LinkedinOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SettingOutlined,
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
  Divider,
  Tag,
} from "antd";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ProfileSettingsSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal-info");

  // Mock user data
  const userData = {
    name: "John Doe",
    title: "Software Engineer",
    company: "TextScript Inc.",
    bio: "Persistence software engineer with B+ years of experience in building scrollsite web applications. Love solving complex problems and learning new technologies.",
    email: "john.doe@gmail.com",
    phone: "+1 234 567 8900",
    location: "San Francisco, CA",
    memberSince: "January 2024",
    website: "johndoe.dev",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    profileCompletion: 85,
  };

  const [formData, setFormData] = useState(userData);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Here you would typically save to API
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const renderPersonalInfo = () => (
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
                <InfoCircleOutlined
                  style={{ color: "#faad14", marginRight: 8 }}
                />
                You are currently editing your profile
              </Text>
            </Col>
            <Col>
              <Button
                icon={<CloseOutlined />}
                onClick={handleCancel}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={handleSave}
                style={{ backgroundColor: "#FFFF00", color:"black" }}
              >
                Save Changes
              </Button>
            </Col>
          </Row>
        </Card>
      )}

      {/* Basic Information */}
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
          Basic Information
        </Title>

        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>First Name</Text>
            </div>
            <Input
              value={formData.name.split(" ")[0]}
              onChange={(e) =>
                handleInputChange(
                  "name",
                  e.target.value + " " + formData.name.split(" ")[1]
                )
              }
              disabled={!isEditing}
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>Last Name</Text>
            </div>
            <Input
              value={formData.name.split(" ")[1]}
              onChange={(e) =>
                handleInputChange(
                  "name",
                  formData.name.split(" ")[0] + " " + e.target.value
                )
              }
              disabled={!isEditing}
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Col>
        </Row>

        <Row gutter={[24, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>Email Address</Text>
            </div>
            <Input
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={!isEditing}
              size="large"
              prefix={<MailOutlined />}
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>Phone Number</Text>
            </div>
            <Input
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={!isEditing}
              size="large"
              prefix={<PhoneOutlined />}
              style={{ borderRadius: 8 }}
            />
          </Col>
        </Row>

        <Row gutter={[24, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>Job Title</Text>
            </div>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              disabled={!isEditing}
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>Company</Text>
            </div>
            <Input
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              disabled={!isEditing}
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Col>
        </Row>

        <Row gutter={[24, 16]} style={{ marginTop: 16 }}>
          <Col xs={24}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>Location</Text>
            </div>
            <Input
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
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
              <Text strong>Bio</Text>
            </div>
            <TextArea
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              disabled={!isEditing}
              rows={4}
              placeholder="Tell us about yourself..."
              style={{ borderRadius: 8 }}
            />
          </Col>
        </Row>
      </Card>

      {/* Social Links */}
      <Card
        bordered={false}
        style={{
          borderRadius: 20,
          border: "1px solid #f0f0f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={4} style={{ marginBottom: 24 }}>
          Social Links
        </Title>

        <Row gutter={[0, 16]}>
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
          <Col xs={24}>
            <Input
              value={formData.linkedin}
              onChange={(e) => handleInputChange("linkedin", e.target.value)}
              disabled={!isEditing}
              size="large"
              prefix={<LinkedinOutlined />}
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col xs={24}>
            <Input
              value={formData.github}
              onChange={(e) => handleInputChange("github", e.target.value)}
              disabled={!isEditing}
              size="large"
              prefix={<GithubOutlined />}
              style={{ borderRadius: 8 }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );

  // const renderPreferences = () => (
  //   <Card bordered={false} style={{ borderRadius: 20 }}>
  //     <Title level={4}>Preferences</Title>
  //     <Text>Preferences settings will be available soon.</Text>
  //   </Card>
  // );

  const renderSecurity = () => (
    <div>
      {/* Change Password Section */}
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
          Change Password
        </Title>
        
        <Row gutter={[0, 16]}>
          <Col xs={24}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>Current Password</Text>
            </div>
            <Input.Password
              placeholder="Enter current password"
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col xs={24}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>New Password</Text>
            </div>
            <Input.Password
              placeholder="Enter new password"
              size="large"
              style={{ borderRadius: 8 }}
            />
          </Col>
          <Col xs={24}>
            <div style={{ marginBottom: 8 }}>
              <Text strong>Confirm New Password</Text>
            </div>
            <Input.Password
              placeholder="Confirm new password"
              size="large"
              style={{ borderRadius: 8 }}
            />
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

      {/* Two-Factor Authentication Section */}
      <Card
        bordered={false}
        style={{
          marginBottom: 24,
          borderRadius: 20,
          border: "1px solid #f0f0f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={4} style={{ marginBottom: 16 }}>
          Two-Factor Authentication
        </Title>
        
        <Row justify="space-between" align="middle">
          <Col>
            <Text style={{ color: "#666" }}>
              Add an extra layer of security to your account by enabling two-factor authentication (2FA)
            </Text>
          </Col>
          <Col>
            <Button
              style={{
                borderRadius: 12,
                height: 40,
                borderColor: "#d9d9d9",
              }}
            >
              Enable 2FA
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Active Sessions Section */}
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
          Active Sessions
        </Title>
        
        {/* Current Session */}
        <div
          style={{
            padding: 16,
            backgroundColor: "#fafafa",
            borderRadius: 12,
            marginBottom: 16,
          }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Text strong style={{ display: "block", marginBottom: 4 }}>
                Current Session
              </Text>
              <Text style={{ color: "#666" }}>
                San Francisco, CA - Chrome on Mac
              </Text>
            </Col>
            <Col>
              <Tag color="green">Active</Tag>
            </Col>
          </Row>
        </div>

        {/* Mobile Device Session */}
        <div
          style={{
            padding: 16,
            backgroundColor: "#fafafa",
            borderRadius: 12,
          }}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Text strong style={{ display: "block", marginBottom: 4 }}>
                Mobile Device
              </Text>
              <Text style={{ color: "#666" }}>
                Last active 2 days ago
              </Text>
            </Col>
            <Col>
              <Button
                style={{
                  borderRadius: 12,
                  borderColor: "#d9d9d9",
                }}
              >
                Revoke
              </Button>
            </Col>
          </Row>
        </div>
      </Card>

      {/* Danger Zone Section */}
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
              Delete Account
            </Text>
            <Text style={{ color: "#666" }}>
              Permanently delete your account and all data
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
      {/* Header Section */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
        <Col>
          <Title level={1} style={{ margin: 0, fontSize: "32px" }}>
            Profile Settings
          </Title>
          <Text style={{ fontSize: "16px", color: "#666" }}>
            Manage your account information and preferences
          </Text>
        </Col>
        <Col>
          <Button
            type="primary"
            style={{
              background: "linear-gradient(90deg, #F3E8FF 0%, #DBEAFE 100%)",
              border: "none",
              borderRadius: "20px",
              height: "40px",
              padding: "0 20px",
              fontWeight: "600",
              color:"#8200DB"
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <g clipPath="url(#clip0_177_792)">
                <path
                  d="M5.50872 1.4082C5.53014 1.2935 5.59101 1.1899 5.68077 1.11536C5.77053 1.04081 5.88354 1 6.00022 1C6.1169 1 6.22991 1.04081 6.31967 1.11536C6.40943 1.1899 6.4703 1.2935 6.49172 1.4082L7.01722 4.1872C7.05454 4.38477 7.15056 4.56651 7.29274 4.70868C7.43491 4.85086 7.61665 4.94687 7.81422 4.9842L10.5932 5.5097C10.7079 5.53112 10.8115 5.59198 10.8861 5.68175C10.9606 5.77151 11.0014 5.88452 11.0014 6.0012C11.0014 6.11788 10.9606 6.23089 10.8861 6.32065C10.8115 6.41041 10.7079 6.47127 10.5932 6.4927L7.81422 7.0182C7.61665 7.05552 7.43491 7.15154 7.29274 7.29371C7.15056 7.43589 7.05454 7.61762 7.01722 7.8152L6.49172 10.5942C6.4703 10.7089 6.40943 10.8125 6.31967 10.887C6.22991 10.9616 6.1169 11.0024 6.00022 11.0024C5.88354 11.0024 5.77053 10.9616 5.68077 10.887C5.59101 10.8125 5.53014 10.7089 5.50872 10.5942L4.98322 7.8152C4.9459 7.61762 4.84988 7.43589 4.70771 7.29371C4.56553 7.15154 4.38379 7.05552 4.18622 7.0182L1.40722 6.4927C1.29252 6.47127 1.18893 6.41041 1.11438 6.32065C1.03983 6.23089 0.999023 6.11788 0.999023 6.0012C0.999023 5.88452 1.03983 5.77151 1.11438 5.68175C1.18893 5.59198 1.29252 5.53112 1.40722 5.5097L4.18622 4.9842C4.38379 4.94687 4.56553 4.85086 4.70771 4.70868C4.84988 4.56651 4.9459 4.38477 4.98322 4.1872L5.50872 1.4082Z"
                  stroke="#8200DB"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 1V3"
                  stroke="#8200DB"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 2H9"
                  stroke="#8200DB"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 11C2.55228 11 3 10.5523 3 10C3 9.44772 2.55228 9 2 9C1.44772 9 1 9.44772 1 10C1 10.5523 1.44772 11 2 11Z"
                  stroke="#8200DB"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_177_792">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Premium Account
          </Button>
        </Col>
      </Row>

      {/* Profile Card */}
      <Card
        bordered={false}
        style={{
          borderRadius: 20,
          marginBottom: 32,
          background: "linear-gradient(135deg, #fefce8 0%, #fefce8 100%)",
          border: "2px solid #ffff00",
        }}
        bodyStyle={{ padding: 32 }}
      >
        <Row gutter={32} align="middle">
          <Col xs={24} md={6} style={{ textAlign: "center" }}>
            <Avatar
              size={120}
              style={{
                backgroundColor: "#ffff00",
                fontSize: "36px",
                fontWeight: "bold",
                color: "#000",
                marginBottom: 16,
              }}
            >
              JD
            </Avatar>
            <Button
              icon={<UploadOutlined />}
              style={{ borderRadius: "12px", width: "100%" }}
              disabled={!isEditing}
            >
              Upload Photo
            </Button>
          </Col>

          <Col xs={24} md={18}>
            <Row justify="space-between" align="top" style={{ marginBottom: 16 }}>
              <Col flex="auto">
                <Row justify="space-between" gutter={16}>
                  <Col>
                    <Title level={2} style={{ margin: 0 }}>
                      {formData.name}
                    </Title>
                  </Col>
                  <Col>
                    <Button
                      type={isEditing ? "default" : "primary"}
                      icon={<EditOutlined />}
                      style={{
                        borderRadius: "12px",
                        backgroundColor: isEditing ? "#f5f5f5" : "#ffff00",
                        borderColor: isEditing ? "#d9d9d9" : "#ffff00",
                        color: isEditing ? "#000" : "#000",
                        height: 36,
                      }}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Editing..." : "Edit Profile"}
                    </Button>
                  </Col>
                </Row>
                <Text
                  strong
                  style={{
                    fontSize: "16px",
                    display: "block",
                    marginTop: 8,
                    marginBottom: 16,
                  }}
                >
                  {formData.title} at {formData.company}
                </Text>
              </Col>
            </Row>

            <Paragraph style={{ color: "#666", marginBottom: 16 }}>
              {formData.bio}
            </Paragraph>

            <Row gutter={[16, 8]}>
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
              <Col xs={24} md={12}>
                <Text>
                  <EnvironmentOutlined style={{ marginRight: 8 }} />
                  {formData.location}
                </Text>
              </Col>
              <Col xs={24} md={12}>
                <Text>
                  <CalendarOutlined style={{ marginRight: 8 }} />
                  Member since {formData.memberSince}
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
            type={activeTab === "personal-info" ? "primary" : "default"}
            icon={<InfoCircleOutlined />}
            style={{
              borderRadius: "20px",
              color: "black",
              backgroundColor:
                activeTab === "personal-info" ? "#FFFF00" : "transparent",
            }}
            onClick={() => setActiveTab("personal-info")}
          >
            Personal Info
          </Button>
        </Col>
        {/* <Col>
          <Button
            type={activeTab === "preferences" ? "primary" : "default"}
            icon={<SettingOutlined />}
            style={{
              borderRadius: "20px",
              color: "black",
              backgroundColor:
                activeTab === "preferences" ? "#FFFF00" : "transparent",
            }}
            onClick={() => setActiveTab("preferences")}
          >
            Preferences
          </Button>
        </Col> */}
        <Col>
          <Button
            type={activeTab === "security" ? "primary" : "default"}
            icon={<LockOutlined />}
            style={{
              borderRadius: "20px",
              color: "black",
              backgroundColor:
                activeTab === "security" ? "#FFFF00" : "transparent",
            }}
            onClick={() => setActiveTab("security")}
          >
            Security
          </Button>
        </Col>
      </Row>

      {/* Tab Content */}
      {activeTab === "personal-info" && renderPersonalInfo()}
      {/* {activeTab === "preferences" && renderPreferences()} */}
      {activeTab === "security" && renderSecurity()}

      {/* Profile Completion Card */}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15.477 12.8906L16.992 21.4166C17.009 21.517 16.9949 21.6202 16.9516 21.7124C16.9084 21.8046 16.838 21.8813 16.7499 21.9324C16.6619 21.9835 16.5603 22.0065 16.4588 21.9983C16.3573 21.9902 16.2607 21.9512 16.182 21.8866L12.602 19.1996C12.4292 19.0705 12.2192 19.0007 12.0035 19.0007C11.7878 19.0007 11.5778 19.0705 11.405 19.1996L7.819 21.8856C7.74032 21.9501 7.64386 21.989 7.54249 21.9972C7.44112 22.0054 7.33967 21.9825 7.25166 21.9315C7.16365 21.8805 7.09327 21.804 7.04991 21.712C7.00656 21.62 6.99228 21.5169 7.009 21.4166L8.523 12.8906"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 14 12 14Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Col>
          <Col flex="auto">
            <Title level={4} style={{ margin: 0 }}>
              Profile Completion
            </Title>
            <Text style={{ color: "#666", display: "block", marginBottom: 8 }}>
              Complete your profile to unlock all features and improve your job
              matching
            </Text>
            <Progress
              percent={formData.profileCompletion}
              showInfo={false}
              strokeColor={{
                "0%": "#22c55e",
                "100%": "#22c55e",
              }}
              style={{ marginBottom: 8 }}
            />
            <Text strong>{formData.profileCompletion}% Complete</Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProfileSettingsSection;