'use client';
import React, { useState } from "react";
import { LeftOutlined, CalendarOutlined } from "@ant-design/icons";
import { Button, Col, Image, Row, Typography, Modal, Card } from "antd";


const { Title, Paragraph, Text } = Typography;

type EventItem = {
  id: number;
  title: string;
  type: string;
  image: string;
  date: string;
  preview: string;
  modalContent: string;
};

const eventsData: EventItem[] = [
  {
    id: 1,
    title: "Get Ready to Ask an Apprentice!",
    type: "Webinar",
    image: "/event1.png",
    date: "Tuesday, Jun 24 • 06:00 PM UTC",
    preview: `"Apprenticeships? Isn't that just for people who can't get into university?" 🤔 Er... nope, that's not true at all! And here's why...`,
    modalContent: `
      <p><strong>Tuesday, Jun 24 • 06:00 PM UTC</strong></p>
      <h2>Get Ready to Ask an Apprentice!</h2>
      <p><strong>Webinar</strong></p>
      <p>🚨 <strong>CALLING ALL ASPIRING LEGAL APPRENTICES!</strong> 🚨</p>
      <p>"Apprenticeships? Isn't that just for people who can't get into university?" 🤔</p>
      <p>Er… nope, that's not true at all! And here's why…</p>
      <p>When I was in school, I heard it all:</p>
      <ul>
        <li>"Apprenticeships are just for plumbers."</li>
        <li>"You'll get stuck doing the same thing for years."</li>
        <li>"You won't be able to switch career paths after an apprenticeship."</li>
      </ul>
      <p>Sound familiar? 🙄</p>
      <p>But the reality is, I was just misinformed — mainly because apprenticeships weren't being promoted enough at school.</p>
      <p>So, if you're wondering what it's REALLY like, join us for the Ask a Legal Apprentice event.</p>
      <p><strong>🔗 Sign up here:</strong><br/>https://lnkd.in/eym4rDVE</p>
      <p>See you there! 😎</p>
    `,
  },
  {
    id: 2,
    title: "1:1 Mock Interview with Current Legal Apprentices",
    type: "Webinar - 1:1 Session",
    image: "/event1.png",
    date: "Tuesday, Mar 18 • 12:00 PM UTC",
    preview:
      "We're excited to announce that registration is now open for our mock interviews with current solicitor apprentices! This is a unique opportunity to...",
    modalContent: `
      <p><strong>Tuesday, Mar 18 • 12:00 PM UTC</strong></p>
      <h2>1:1 Mock Interview with Current Legal Apprentices</h2>
      <p><strong>Webinar - 1:1 Session</strong></p>
      <h3>🚀 Aspiring Legal Professionals—This is Your Chance! 🚀</h3>
      <ul>
        <li>✅ Gain real-life interview experience</li>
        <li>✅ Receive personalised feedback</li>
        <li>✅ Boost your confidence for future legal interviews</li>
      </ul>
      <p><strong>📅 Registration Deadline:</strong> 18th March 2025</p>
      <p><strong>🌐 Secure your spot now:</strong> https://lnkd.in/dmT3SBHG</p>
    `,
  },
  {
    id: 3,
    title: "DWF x Aspiring Legal Network Solicitor Apprenticeship Insight Event",
    type: "Webinar",
    image: "/event1.png",
    date: "Thursday, Dec 05 • 06:00 PM UTC",
    preview:
      "This event includes: A session with Ben Winstanley for top tips on strengthening your solicitor apprenticeship applications...",
    modalContent: `
      <p><strong>Thursday, Dec 05 • 06:00 PM UTC</strong></p>
      <h2>DWF x Aspiring Legal Network Solicitor Apprenticeship Insight Event</h2>
      <p><strong>Webinar</strong></p>
      <p><strong>📢 Join us for our first event:</strong> DWF Solicitor Apprenticeship Insight Event</p>
      <p><strong>🗓 December 5th | ⏰ 6 PM | 🌐 Virtual</strong></p>
      <ul>
        <li>✨ Tips on strengthening applications</li>
        <li>✨ Interactive Q&A with current solicitor apprentices</li>
      </ul>
      <p>👉 https://lnkd.in/eccpDWDT</p>
    `,
  },
  {
    id: 4,
    title: "Legal Tech Conference 2024",
    type: "Conference",
    image: "/event1.png",
    date: "Friday, Nov 15 • 09:00 AM UTC",
    preview:
      "Explore the latest innovations in legal technology with industry leaders and tech experts...",
    modalContent: `<p>Conference details here...</p>`,
  },
  {
    id: 5,
    title: "Networking for Junior Lawyers",
    type: "Networking",
    image: "/event1.png",
    date: "Wednesday, Oct 30 • 07:00 PM UTC",
    preview:
      "Connect with fellow legal professionals and build your network in a casual setting...",
    modalContent: `<p>Networking event details here...</p>`,
  },
  {
    id: 6,
    title: "Workshop: Contract Law Fundamentals",
    type: "Workshop",
   image: "/event1.png",
    date: "Saturday, Sep 21 • 10:00 AM UTC",
    preview:
      "Learn the basics of contract law from experienced practitioners...",
    modalContent: `<p>Workshop details here...</p>`,
  },
];

type RichTextContentProps = {
  content: string;
};

const RichTextContent: React.FC<RichTextContentProps> = ({ content }) => {
  return (
    <div
      className="rich-text-content"
      style={{
        fontFamily: "'Source Sans Pro', Helvetica, Arial, sans-serif",
        fontSize: "16px",
        lineHeight: "1.8",
        color: "#000",
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

type EventDetailModalProps = {
  event: EventItem | null;
  visible: boolean;
  onClose: () => void;
};

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  visible,
  onClose,
}) => {
  if (!event) return null;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width="90%"
      style={{ maxWidth: 800, top: 20 }}
      styles={{
        body: {
          padding: 0,
          borderRadius: 8,
          overflow: "hidden",
        },
      }}
    >
      <div style={{ backgroundColor: "#fff" }}>
        {/* Header Image */}
        <div
          style={{
            backgroundImage: `url(${event.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 300,
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: 24,
          }}
        >
          <Button
            onClick={onClose}
            style={{
              backgroundColor: "rgba(52, 52, 52, 0.7)",
              borderRadius: 8,
              color: "white",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <LeftOutlined /> Back
          </Button>
        </div>

        {/* Content Section */}
        <div style={{ padding: 40, backgroundColor: "#fff" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <RichTextContent content={event.modalContent} />

            <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
              <Button
                type="primary"
                size="large"
                style={{
                  backgroundColor: "#ffff00",
                  borderColor: "#ffff00",
                  color: "#000",
                  borderRadius: 24,
                  height: 48,
                  padding: "0 32px",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Register for Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

type EventCardProps = {
  event: EventItem;
  onClick: (event: EventItem) => void;
};

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  return (
    <Card
      hoverable
      onClick={() => onClick(event)}
      style={{
        height: "100%",
        borderRadius: 16,
        overflow: "hidden",
        border: "2px solid #f0f0f0",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
      styles={{
        body: {
          padding: 24,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Event Image */}
      <div
        style={{
          margin: "-24px -24px 20px -24px",
          height: 200,
          overflow: "hidden",
        }}
      >
        <Image
          src={event.image}
          alt={event.title}
          preview={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
        />
      </div>

      {/* Event Date */}
      <Text
        style={{
          color: "#666",
          fontSize: 13,
          display: "block",
          marginBottom: 8,
        }}
      >
        <CalendarOutlined style={{ marginRight: 6 }} />
        {event.date}
      </Text>

      {/* Event Type */}
      <div style={{ marginBottom: 12 }}>
        <span
          style={{
            backgroundColor: "#fff9e6",
            color: "#d4a017",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
            border: "1px solid #ffecb3",
          }}
        >
          {event.type}
        </span>
      </div>

      {/* Event Title */}
      <Title
        level={4}
        style={{
          fontSize: 18,
          marginBottom: 12,
          lineHeight: 1.4,
          flex: 1,
        }}
      >
        {event.title}
      </Title>

      {/* Event Preview */}
      <Paragraph
        style={{
          fontSize: 14,
          color: "#666",
          lineHeight: 1.6,
          marginBottom: 20,
          flex: 2,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
        }}
      >
        {event.preview}
      </Paragraph>

      {/* Action Button */}
      <div style={{ marginTop: "auto" }}>
        <Button
          type="default"
          style={{
            width: "100%",
            backgroundColor: "#ffff00",
            borderColor: "#ffff00",
            color: "#000",
            borderRadius: 8,
            height: 40,
            fontWeight: 600,
            fontSize: 14,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#f2f200";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#ffff00";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          View Details →
        </Button>
      </div>
    </Card>
  );
};

const EventPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleEventClick = (event: EventItem) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        paddingBottom: 60,
      }}
    >
      {/* Events Section */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "60px 20px 0 20px",
        }}
      >
        {/* Section Title */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Title
            level={2}
            style={{
              fontSize: 36,
              color: "#1a1a1a",
              marginBottom: 16,
            }}
          >
            Past Events
          </Title>
          <Paragraph
            style={{
              fontSize: 16,
              color: "#666",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            Join our curated events to learn, network, and advance your legal
            career journey.
          </Paragraph>
        </div>

        {/* Events Grid */}
        <Row gutter={[32, 32]} justify="center">
          {eventsData.map((event) => (
            <Col
              key={event.id}
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={8}
              xxl={8}
            >
              <EventCard event={event} onClick={handleEventClick} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        visible={isModalVisible}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default EventPage;
