import { Col, Row, Typography } from "antd";


const { Title, Text } = Typography;

 const defaultContent = `
    <h1>Privacy Policy</h1>
    <p class="last-updated"><strong>Last updated: September 2025</strong></p>
    
    <h2>1. Who We Are</h2>
    <p>The Aspiring Legal Network (ALN) is committed to protecting your privacy and handling your personal data securely and responsibly. Our website address is: https://aspiringlegalnetwork.co.uk. If you have any questions about this policy or how we handle your data, please contact us at info@aspiringlegalnetwork.co.uk.</p>
    
    <h2>2. Information We Collect</h2>
    <p>We may collect and process the following information when you interact with our website:</p>
    <ul>
      <li>Information you provide directly, such as when you create an account, register for events, or leave a comment (for example, your name and email address).</li>
      <li>Cookies and usage data, which help us improve your experience on the website.</li>
      <li>Uploaded content, such as images or documents you choose to share on our platform.</li>
      <li>If you leave a comment, an anonymised string (hash) created from your email address may be sent to the Gravatar service to check if you are using it. The Gravatar privacy policy is available at https://automattic.com/privacy/</li>
    </ul>
    
    <h2>3. How We Use Your Data</h2>
    <p>We process your personal data to:</p>
    <ul>
      <li>Provide and improve our services.</li>
      <li>Manage your account and support you as a community member.</li>
      <li>Communicate with you about events, opportunities, and updates where you have given consent.</li>
      <li>Comply with legal or regulatory obligations.</li>
    </ul>
    
    <h2>4. Legal Basis for Processing Data</h2>
    <p>Under UK GDPR, we must have a lawful reason for processing your data. ALN relies on the following legal bases:</p>
    <ul>
      <li>Consent: For example, when you sign up to receive email updates.</li>
      <li>Contract: When we provide services you have requested, such as event registrations.</li>
      <li>Legal obligation: Where we are required to keep certain data by law.</li>
      <li>Legitimate interests: For example, improving our website and services, provided these interests do not override your privacy rights.</li>
    </ul>
    
    <h2>5. Cookies</h2>
    <p>Cookies are small text files stored on your device to help our site function properly and improve your experience.</p>
    <p>Examples of how we use cookies:</p>
    <ul>
      <li>To remember your login details and preferences.</li>
      <li>To save form information so you do not need to re-enter it later.</li>
      <li>To monitor website performance and improve our services.</li>
      <li>You can manage or disable cookies in your browser settings, but some features of the site may not work correctly without them.</li>
    </ul>
  `;

const PrivacyPolicies = ({ content }) => {
  // Default content in case backend content is not available
 
const privacyContent = content || defaultContent;

  // Function to render HTML content safely
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <div
    className="container mx-auto poppins"
    >

      {/* Main Content */}
      <Row justify="center" style={{ paddingTop: "48px", paddingBottom: "48px" }}>
        <Col span={20}>
          <Title 
            level={1} 
            style={{ 
              textAlign: "center",
              fontSize: "48px",
              fontWeight: "bold",
              marginBottom: "48px",
              color: "#1e1e1e"
            }}
          >
            Privacy policies
          </Title>

          {/* Dynamic Content from Backend */}
          <div 
            className="privacy-content"
            style={{
              margin: "0 auto",
              fontFamily: "inherit"
            }}
            dangerouslySetInnerHTML={createMarkup(privacyContent)}
          />
        </Col>
      </Row>

      {/* Add CSS for rich text content */}
      <style jsx>{`
        .privacy-content {
          font-family: -apple-system, BlinkMacSystemFont, Poppins, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        .privacy-content h1 {
          font-size: 32px;
          font-weight: bold;
          color: #1e1e1e;
          margin-bottom: 16px;
          margin-top: 32px;
        }
        
        .privacy-content h2 {
          font-size: 24px;
          font-weight: bold;
          color: #1e1e1e;
          margin-bottom: 16px;
          margin-top: 24px;
        }
        
        .privacy-content h3 {
          font-size: 20px;
          font-weight: bold;
          color: #1e1e1e;
          margin-bottom: 12px;
          margin-top: 20px;
        }
        
        .privacy-content p {
          font-size: 16px;
          line-height: 1.6;
          color: #333;
          margin-bottom: 16px;
        }
        
        .privacy-content .last-updated {
          color: #666;
          margin-bottom: 32px;
        }
        
        .privacy-content ul {
          margin-bottom: 24px;
          padding-left: 20px;
        }
        
        .privacy-content li {
          font-size: 16px;
          line-height: 1.6;
          color: #333;
          margin-bottom: 8px;
        }
        
        .privacy-content strong {
          font-weight: bold;
        }
        
        .privacy-content a {
          color: #1890ff;
          text-decoration: underline;
        }
        
        .privacy-content a:hover {
          color: #40a9ff;
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicies;