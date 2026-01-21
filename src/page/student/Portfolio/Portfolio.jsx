import { useState } from "react";
import { DownOutlined, LeftOutlined, HeartOutlined, CalendarOutlined, EnvironmentOutlined, SoundOutlined } from "@ant-design/icons";
import { Button, Col, Image, Row, Typography, Modal, Card, Grid } from "antd";
import { IMAGES } from "../../../assets";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

// Updated events data without icons
const eventsData = [
  {
    id: 1,
    title: "Get Ready to Ask an Apprentice!",
    type: "Webinar",
    image: IMAGES.event1,
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
      
      <p>But the reality is, I was just misinformed — mainly because apprenticeships weren't being promoted enough at school. Sure, some teachers were amazing and super supportive, but most of the time, the focus was all about UCAS applications.</p>
      
      <p>Every assembly was:</p>
      <ul>
        <li>"You need to get that UCAS application in."</li>
        <li>"Don't forget to mention your work experience in your personal statement."</li>
      </ul>
      
      <p>Which is great if you're going to university… but for someone like us, an apprenticeship was a way better option! 🙌</p>
      
      <p>So, if you're wondering what it's REALLY like, join us for the Ask a Legal Apprentice event on Tuesday 16 April at 6:00 PM on Microsoft Teams.</p>
      
      <p>👉 We'll be sharing all the tips on applying, studying, and what it's really like working as a solicitor apprentice.</p>
      <p>✨ You'll get the chance to ask questions and get the facts, not the myths!</p>
      <p>Certificates of participation 🎓 will be given out, so it's definitely worth checking out.</p>
      
      <p><strong>🔗 Sign up here:</strong><br/>https://lnkd.in/eym4rDVE</p>
      <p>See you there! 😎</p>
    `
  },
  {
    id: 2,
    title: "1:1 Mock Interview with Current Legal Apprentices",
    type: "Webinar - 1:1 Session",
    image: IMAGES.event1,
    date: "Tuesday, Mar 18 • 12:00 PM UTC",
    preview: `We're excited to announce that registration is now open for our mock interviews with current solicitor apprentices! This is a unique opportunity to...`,
    modalContent: `
      <p><strong>Tuesday, Mar 18 • 12:00 PM UTC</strong></p>
      <h2>1:1 Mock Interview with Current Legal Apprentices</h2>
      <p><strong>Webinar - 1:1 Session</strong></p>
      
      <h3>🚀 Aspiring Legal Professionals—This is Your Chance! 🚀</h3>
      
      <p>We're excited to announce that registration is now open for our mock interviews with current solicitor apprentices! This is a unique opportunity to:</p>
      
      <ul>
        <li>✅ Gain real-life interview experience</li>
        <li>✅ Receive personalised feedback</li>
        <li>✅ Boost your confidence for future legal interviews</li>
      </ul>
      
      <p><strong>📅 Registration Deadline:</strong> 18th March 2025</p>
      <p><strong>🌐 Secure your spot now:</strong> https://lnkd.in/dmT3SBHG</p>
      
      <p>Whether you're preparing for assessment centres or video interviews, this is the perfect opportunity to sharpen your skills and enhance your career prospects.</p>
      
      <p>Spaces are limited, so don't wait—register today!</p>
      
      <p>Know someone who might benefit? Share this post and help others grow in their legal careers! 🌟</p>
      
      <p><strong>#LegalCareer #MockInterviews #SolicitorApprentices #CareerGrowth #AspiringLawyers #InterviewPreparation</strong></p>
    `
  },
  {
    id: 3,
    title: "DWF x Aspiring Legal Network Solicitor Apprenticeship Insight Event",
    type: "Webinar",
    image: IMAGES.event1,
    date: "Thursday, Dec 05 • 06:00 PM UTC",
    preview: `This event includes: A session with Ben Winstanley for top tips on strengthening your solicitor apprenticeship applications...`,
    modalContent: `
      <p><strong>Thursday, Dec 05 • 06:00 PM UTC</strong></p>
      <h2>DWF x Aspiring Legal Network Solicitor Apprenticeship Insight Event</h2>
      <p><strong>Webinar</strong></p>
      
      <p><strong>📢 Join us for our first event:</strong> DWF Solicitor Apprenticeship Insight Event</p>
      <p><strong>🗓 December 5th | ⏰ 6 PM | 🌐 Virtual</strong></p>
      
      <p>This event includes:</p>
      <ul>
        <li>✨ A session with Ben Winstanley for top tips on strengthening your solicitor apprenticeship applications</li>
        <li>✨ An interactive Q&A with current solicitor apprentices to provide a behind-the-scenes look at their experience</li>
      </ul>
      
      <p>💡 Ready to take the first step toward your legal career? Join Aspiring Legal Network today:</p>
      <p>👉 https://lnkd.in/eccpDWDT</p>
      
      <p>Follow us for updates, resources, and exclusive events to help you achieve your career goals!</p>
    `
  },
  {
    id: 4,
    title: "Legal Tech Conference 2024",
    type: "Conference",
    image: IMAGES.event1,
    date: "Friday, Nov 15 • 09:00 AM UTC",
    preview: `Explore the latest innovations in legal technology with industry leaders and tech experts...`,
    modalContent: `<p>Conference details here...</p>`
  },
  {
    id: 5,
    title: "Networking for Junior Lawyers",
    type: "Networking",
    image: IMAGES.event1,
    date: "Wednesday, Oct 30 • 07:00 PM UTC",
    preview: `Connect with fellow legal professionals and build your network in a casual setting...`,
    modalContent: `<p>Networking event details here...</p>`
  },
  {
    id: 6,
    title: "Workshop: Contract Law Fundamentals",
    type: "Workshop",
    image: IMAGES.event1,
    date: "Saturday, Sep 21 • 10:00 AM UTC",
    preview: `Learn the basics of contract law from experienced practitioners...`,
    modalContent: `<p>Workshop details here...</p>`
  }
];

// Component to safely render HTML content
const RichTextContent = ({ content }) => {
  return (
    <div 
      className="rich-text-content"
      style={{
        fontFamily: "'Source Sans Pro', Helvetica, Arial, sans-serif",
        fontSize: "16px",
        lineHeight: "1.8",
        color: "#000"
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

// Modal component for event details
const EventDetailModal = ({ event, visible, onClose }) => {
  if (!event) return null;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width="90%"
      style={{ 
        maxWidth: "800px",
        top: 20
      }}
      bodyStyle={{ 
        padding: "0",
        borderRadius: "8px",
        overflow: "hidden"
      }}
    >
      <div style={{ backgroundColor: "#fff" }}>
        {/* Header Image */}
        <div
          style={{
            backgroundImage: `url(${event.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: "24px"
          }}
        >
          <Button
            onClick={onClose}
            style={{
              backgroundColor: "rgba(52, 52, 52, 0.7)",
              borderRadius: "8px",
              color: "white",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <LeftOutlined /> Back
          </Button>
        </div>

        {/* Content Section */}
        <div style={{ 
          padding: "40px",
          backgroundColor: "#fff"
        }}>
          <div style={{
            maxWidth: "700px",
            margin: "0 auto"
          }}>
            <RichTextContent content={event.modalContent} />
            
            <div style={{ 
              marginTop: "40px",
              display: "flex",
              gap: "16px"
            }}>
              <Button
                type="primary"
                size="large"
                style={{
                  backgroundColor: "#ffff00",
                  borderColor: "#ffff00",
                  color: "#000",
                  borderRadius: "24px",
                  height: "48px",
                  padding: "0 32px",
                  fontWeight: "600",
                  fontSize: "16px"
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

// Event Card Component
const EventCard = ({ event, onClick }) => {
  return (
    <Card
      hoverable
      onClick={() => onClick(event)}
      style={{
        height: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        border: "2px solid #f0f0f0",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column"
      }}
      bodyStyle={{
        padding: "24px",
        flex: 1,
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Event Image */}
      <div style={{ 
        margin: "-24px -24px 20px -24px",
        height: "200px",
        overflow: "hidden"
      }}>
        <Image
          src={event.image}
          alt={event.title}
          preview={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease"
          }}
        />
      </div>

      {/* Event Date */}
      <Text style={{ 
        color: "#666",
        fontSize: "13px",
        display: "block",
        marginBottom: "8px"
      }}>
        <CalendarOutlined style={{ marginRight: "6px" }} />
        {event.date}
      </Text>

      {/* Event Type */}
      <div style={{ marginBottom: "12px" }}>
        <span style={{
          backgroundColor: "#fff9e6",
          color: "#d4a017",
          padding: "4px 12px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "600",
          border: "1px solid #ffecb3"
        }}>
          {event.type}
        </span>
      </div>

      {/* Event Title */}
      <Title
        level={4}
        style={{
          fontSize: "18px",
          marginBottom: "12px",
          lineHeight: "1.4",
          flex: 1
        }}
      >
        {event.title}
      </Title>

      {/* Event Preview */}
      <Paragraph
        style={{
          fontSize: "14px",
          color: "#666",
          lineHeight: "1.6",
          marginBottom: "20px",
          flex: 2,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical"
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
            borderRadius: "8px",
            height: "40px",
            fontWeight: "600",
            fontSize: "14px",
            transition: "all 0.3s ease"
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

const EventPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const screens = useBreakpoint();

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
  };

  // Calculate column span based on screen size
  // const getColumnSpan = () => {
  //   if (screens.xxl || screens.xl) return 8; // 3 columns
  //   if (screens.lg) return 8; // 3 columns
  //   if (screens.md) return 12; // 2 columns for tablet
  //   return 24; // 1 column for mobile
  // };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        paddingBottom: "60px"
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${IMAGES.portfolioBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          height: "340px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)"
          }}
        />
        {/* <div style={{ 
          textAlign: "center", 
          color: "#fff",
          position: "relative",
          zIndex: 1,
          padding: "20px"
        }}>
          <Title style={{ 
            color: "#fff", 
            fontSize: "48px", 
            marginBottom: "16px",
            fontWeight: "700"
          }}>
            Events
          </Title>
          <Paragraph style={{ 
            color: "#fff", 
            fontSize: "18px", 
            maxWidth: "700px",
            margin: "0 auto"
          }}>
            Discover upcoming webinars, workshops, and networking events designed to help you grow in your legal career.
          </Paragraph>
        </div> */}
      </div>

      {/* Events Section */}
      <div style={{ 
        maxWidth: "1400px", 
        margin: "0 auto", 
        padding: "60px 20px 0 20px"
      }}>
        {/* Section Title */}
        <div style={{ 
          textAlign: "center", 
          marginBottom: "48px"
        }}>
          <Title level={2} style={{ 
            fontSize: "36px", 
            color: "#1a1a1a",
            marginBottom: "16px"
          }}>
            Past Events
          </Title>
          <Paragraph style={{
            fontSize: "16px",
            color: "#666",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Join our curated events to learn, network, and advance your legal career journey.
          </Paragraph>
        </div>

        {/* Events Grid */}
        <Row 
          gutter={[32, 32]}
          justify="center"
        >
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
              <EventCard 
                event={event} 
                onClick={handleEventClick}
              />
            </Col>
          ))}
        </Row>

        {/* Load More Button (Optional) */}
        {eventsData.length > 6 && (
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Button
              size="large"
              style={{
                backgroundColor: "#ffff00",
                borderColor: "#ffff00",
                color: "#000",
                borderRadius: "24px",
                height: "48px",
                padding: "0 48px",
                fontWeight: "600",
                fontSize: "16px"
              }}
            >
              Load More Events
            </Button>
          </div>
        )}
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