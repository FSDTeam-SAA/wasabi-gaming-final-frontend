import React, { useState, useMemo } from "react";
import { Table, Input, Select, Tag, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const data = [
  { key: 1, initial: "S", name: "Sarah Johnson", email: "sarah.j@email.com", status: "Active", applications: 12, interviews: 8 },
  { key: 2, initial: "M", name: "Michael Chen", email: "michael.c@email.com", status: "Active", applications: 15, interviews: 10 },
  { key: 3, initial: "E", name: "Emma Williams", email: "emma.w@email.com", status: "Active", applications: 9, interviews: 6 },
  { key: 4, initial: "J", name: "James Brown", email: "james.b@email.com", status: "Lost active 0005", applications: 5, interviews: 2 },
  { key: 5, initial: "O", name: "Olivia Davis", email: "olivia.d@email.com", status: "Active", applications: 14, interviews: 9 },
  { key: 6, initial: "W", name: "William Garcia", email: "william.g@email.com", status: "Active", applications: 18, interviews: 12 },
  // Add more students here later to test multiple pages
];

export default function ManageStudentsTable() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;

  const filteredData = useMemo(() => {
    let result = data;

    // Status filter
    if (filterStatus !== "All Status") {
      if (filterStatus === "Active") {
        result = result.filter((item) => item.status.includes("Active"));
      } else if (filterStatus === "Lost") {
        result = result.filter((item) => item.status.includes("Lost"));
      }
    }

    // Search by name
    if (searchText.trim()) {
      const query = searchText.toLowerCase();
      result = result.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchText, filterStatus]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  const total = filteredData.length;
  const startItem = total === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);
  const showingText =
    total === 0 ? "Showing 0 students" : `Showing ${startItem}-${endItem} of ${total} students`;

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage * pageSize < total;

  const handleTrackStudent = (student) => {
    navigate(`/student/applications/${student.key}`);
  };

  const handleInviteForJob = (student) => {
    navigate(`/student/invite/${student.key}`);
  };

  const columns = [
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full yellow flex items-center justify-center text-sm font-bold text-gray-900 flex-shrink-0">
            {record.initial}
          </div>
          <span className="font-medium text-gray-900 truncate">{text}</span>
        </div>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email", width: 220, ellipsis: true },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 140,
      align: "center",
      render: (status) => (
        <Tag color={status.includes("Active") ? "green" : "orange"}>{status}</Tag>
      ),
    },
    { title: "Applications", dataIndex: "applications", key: "applications", width: 120, align: "center" },
    { title: "Interviews", dataIndex: "interviews", key: "interviews", width: 110, align: "center" },
    {
      title: "Actions",
      key: "actions",
      width: 320,
      align: "center",
      render: (_, record) => (
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => handleTrackStudent(record)}
            className="border border-[#e5e500] rounded-[12px] h-9 font-medium"
            style={{ color: "#000" }}
          >
            Track Student
          </Button>
          <Button
            onClick={() => handleInviteForJob(record)}
            style={{ backgroundColor: "#ffff03", color: "#000" }}
            className="rounded-[12px] h-9 font-medium hover:!bg-[#e5e500]"
          >
            Invite for Job
          </Button>
        </div>
      ),
    },
  ];

  // Custom Pagination - ALWAYS visible, just like your reference
  const CustomPagination = () => (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={!hasPrevious}
        className="px-4 py-2 text-sm font-medium text-gray-500 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {/* Yellow current page */}
      <button
        className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-gray-900 rounded-full shadow-sm"
        style={{ backgroundColor: "#ffff03" }}
      >
        {currentPage}
      </button>

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={!hasNext}
        className="px-4 py-2 text-sm font-medium text-gray-500 rounded-full border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="flex flex-col max-h-screen m-2 sm:m-4 rounded-[24px] border-2 border-[#E5E5E5] bg-white overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center p-4 gap-3 bg-white z-10">
        <Input
          placeholder="Search students..."
          prefix={<SearchOutlined className="text-gray-400 text-lg" />}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full h-12 rounded-2xl border-2 border-transparent bg-[#FAFAFA] focus:border-yellow-400"
          allowClear
        />
        <Select
          value={filterStatus}
          className="w-full sm:w-40 h-12"
          onChange={(value) => {
            setFilterStatus(value);
            setCurrentPage(1);
          }}
        >
          <Option value="All Status">All Status</Option>
          <Option value="Active">Active</Option>
          <Option value="Lost">Lost</Option>
        </Select>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-[900px] sm:min-w-full">
          <Table
            columns={columns}
            dataSource={paginatedData}
            pagination={false}  // Crucial: disables any default AntD pagination
            rowClassName="hover:bg-gray-50 transition"
            scroll={{ x: "max-content" }}
            components={{
              header: {
                cell: (props) => (
                  <th {...props} className="bg-[#FFFEF0] text-left text-sm font-medium text-gray-700 px-4 py-3" />
                ),
              },
            }}
          />
        </div>
      </div>

      {/* Footer - Pagination ALWAYS shown */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-[#E5E5E5] bg-white gap-4">
        <span className="text-sm text-gray-600 text-center sm:text-left">
          {showingText}
        </span>

        {/* Always render the custom pagination */}
        <CustomPagination />
      </div>
    </div>
  );
}