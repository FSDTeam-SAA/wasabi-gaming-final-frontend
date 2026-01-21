import { Layout } from "antd";
import { Link } from "react-router-dom";

const { Footer: AntFooter } = Layout;

const StudentFooter = () => {
  return (
    <AntFooter
      style={{
        backgroundColor: "#ffffff",
        borderTop: "1px solid #e5e5e5",
        padding: "24px 16px",
        textAlign: "center",
      }}
    >
      {/* Copyright */}
      <div
        style={{
          margin: 0,
          fontFamily: "'Poppins', sans-serif",
          fontSize: "16px",
          fontWeight: 400,
          color: "#495565",
          lineHeight: "24px",
        }}
      >
        © 2025 Aspiring – Your Path to Professional Growth
      </div>

      {/* Links */}
      <div
        style={{
          marginTop: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/privacy-policy"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            color: "#495565",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#495565")}
        >
          Privacy Policy
        </Link>

        <Link
          to="/terms"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            color: "#495565",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#495565")}
        >
          Terms
        </Link>

        <Link
          to="/contact-support"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            color: "#495565",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#495565")}
        >
          Contact Support
        </Link>
      </div>
    </AntFooter>
  );
};

export default StudentFooter;