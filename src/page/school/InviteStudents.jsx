import { useState } from "react";
import { Card, Input, Button, Upload, Tag, Space } from "antd";
import {
  UploadOutlined,
  CopyOutlined,
  CheckOutlined,
  DownloadOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

export default function InviteStudents() {
  const [activeTab, setActiveTab] = useState("single");
  const [singleForm, setSingleForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [bulkEmails, setBulkEmails] = useState("");
  const [copied, setCopied] = useState(false);

  const shareLink = "https://aspiringlegalnetwork.com/join/school-xyz-2024";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const recentInvites = [
    {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      time: "2 hours ago",
      status: "Accepted",
    },
    {
      name: "Michael Chen",
      email: "michael.c@email.com",
      time: "5 hours ago",
      status: "Pending",
    },
    {
      name: "Emma Williams",
      email: "emma.w@email.com",
      time: "1 day ago",
      status: "Accepted",
    },
    {
      name: "James Brown",
      email: "james.b@email.com",
      time: "2 days ago",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen source">
      {/* === HEADER === */}
      <div className="bg-[#FFFEF0]">
        <div className="px-6 py-14">
          <div>
            <h1 className="text-2xl md:text-4xl text-gray-900">Invite Students</h1>
            <p className="md:text-lg text-[#666666] mt-4">
              Quickly onboard students to your platform with personalised
              invitations
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {/* === SINGLE + BULK CARDS === */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8 max-w-7xl mx-auto">
          {/* SINGLE INVITATION */}
          <Card className="rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 yellow rounded-xl flex items-center justify-center">
                <MailOutlined className="text-xl text-black" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Single Invitation
              </h3>
            </div>

            <Space direction="vertical" size="middle" className="w-full">
              <Input
                placeholder="Student Name *"
                value={singleForm.name}
                onChange={(e) =>
                  setSingleForm({ ...singleForm, name: e.target.value })
                }
                className="h-12 rounded-xl text-sm"
              />
              <Input
                placeholder="Email Address *"
                value={singleForm.email}
                onChange={(e) =>
                  setSingleForm({ ...singleForm, email: e.target.value })
                }
                className="h-12 rounded-xl text-sm"
              />
              <TextArea
                placeholder="Personal Message (Optional) - Add a welcome message..."
                value={singleForm.message}
                onChange={(e) =>
                  setSingleForm({ ...singleForm, message: e.target.value })
                }
                rows={3}
                className="rounded-xl text-sm resize-none"
              />
              {/* YELLOW BUTTON - NO HOVER */}
              <Button
                type="primary"
                size="large"
                className="w-full h-12 rounded-xl border-none flex items-center justify-center gap-2"
                style={{ backgroundColor: "#FFFF00", color: "black" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#FFFF00")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#FFFF00")
                }
              >
                <MailOutlined />
                Send Invitation
              </Button>
            </Space>
          </Card>

          {/* BULK INVITATION */}
          <Card className="rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <UploadOutlined className="text-xl yellow" />
              </div>
              <h3 className="text-lg font-semibold text-black">
                Bulk Invitation
              </h3>
            </div>

            <Space direction="vertical" size="large" className="w-full">
              <div>
                <Upload.Dragger
                  name="file"
                  accept=".csv"
                  beforeUpload={() => false}
                  className="p-8"
                >
                  <p className="ant-upload-drag-icon">
                    <UploadOutlined className="text-4xl text-gray-400" />
                  </p>
                  <p className="ant-upload-text text-sm">
                    Drop your CSV file here or click to browse
                  </p>
                  <p className="ant-upload-hint text-xs text-gray-500 mt-1">
                    File should include: Name, Email
                  </p>
                </Upload.Dragger>

                <Button
                  icon={<DownloadOutlined />}
                  className="w-[90%] mx-auto mt-3 h-12 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50"
                  size="large"
                >
                  Download Template
                </Button>
              </div>

              <div className="text-center text-xs text-gray-500">
                Or paste emails (one per line)
              </div>

              <TextArea
                placeholder="student1@email.com\nstudent2@email.com\nstudent3@email.com"
                value={bulkEmails}
                onChange={(e) => setBulkEmails(e.target.value)}
                rows={4}
                className="font-mono text-sm rounded-xl"
              />

              {/* YELLOW BUTTON - NO HOVER */}
              <Button
                type="primary"
                size="large"
                className="w-full h-12 rounded-xl border-none"
                style={{ backgroundColor: "#FFFF00", color: "black" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#FFFF00")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#FFFF00")
                }
              >
                Send Bulk Invitations
              </Button>
            </Space>
          </Card>
        </div>

        {/* === SHARE LINK === */}
        <Card className="rounded-2xl bg-[#FFFEF0] shadow-sm p-6 mb-8">
          <h3 className="text-lg md:text-3xl font-semibold text-gray-900 mb-2 text-center">
            Share Invitation Link
          </h3>
          <p className="md:text-lg text-[#666666] mb-6 text-center">
            Generate a unique link that students can use to join your program
          </p>

          <div className="flex gap-3 mb-6 max-w-7xl mx-auto">
            <Input
              value={shareLink}
              readOnly
              className="flex-1 h-12 rounded-xl bg-gray-50 font-mono text-sm"
            />
            {/* YELLOW COPY BUTTON - NO HOVER */}
            <Button
              onClick={handleCopy}
              icon={copied ? <CheckOutlined /> : <CopyOutlined />}
              className="h-12 px-6 rounded-xl border-none"
              style={{ backgroundColor: "#FFFF00", color: "black" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#FFFF00")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#FFFF00")
              }
            >
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {[
              { value: "24", label: "Students Joined" },
              { value: "48", label: "Link Clicks" },
              { value: "50%", label: "Conversion Rate" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* === RECENT INVITATIONS === */}
        <Card className="p-6 mb-8 max-w-7xl mx-auto">
          <div className="mb-5">
            <h3 className="text-3xl text-gray-900">Recent Invitations</h3>
          </div>

          <div className="space-y-3">
            {recentInvites.map((inv, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-dashed border-blue-300"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 yellow rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {inv.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900">
                      {inv.name}
                    </p>
                    <p className="text-xs text-gray-500">{inv.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{inv.time}</p>
                  <Tag
                    color={inv.status === "Accepted" ? "warning" : "default"}
                    className="mt-1 text-xs font-medium"
                  >
                    {inv.status}
                  </Tag>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* === CTA FOOTER === */}
        <div className="yellow rounded-2xl p-8 py-16 text-center">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M29.0662 13.3333C29.6751 16.3217 29.2411 19.4285 27.8366 22.1357C26.4322 24.8429 24.142 26.9867 21.3482 28.2097C18.5544 29.4328 15.4257 29.661 12.4839 28.8565C9.54214 28.0519 6.9651 26.2632 5.18255 23.7885C3.39999 21.3139 2.51968 18.303 2.6884 15.2578C2.85712 12.2127 4.06469 9.31744 6.10971 7.05488C8.15474 4.79232 10.9136 3.29923 13.9263 2.82459C16.9389 2.34995 20.0232 2.92247 22.6648 4.44665"
                stroke="#FFFF00"
                stroke-width="2.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 14.6673L16 18.6673L29.3333 5.33398"
                stroke="#FFFF00"
                stroke-width="2.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Start Building Your Student Network
          </h3>
          <p className="text-gray-700">
            Invite students now and help them succeed in their career journey
          </p>
        </div>
      </div>
    </div>
  );
}
