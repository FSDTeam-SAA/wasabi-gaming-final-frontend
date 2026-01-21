   
    
export const aiAssessmentData = {
  tests: [
    {
      id: 1,
      name: "Written Case Study",
      description: "Test your ability to interpret and analyse written information.",
      duration: "15–20 minutes",
      status: "available",
      score: null,
      icon: "📝",
      type: "written",
      content: {
        caseStudy: {
          title: "Case Study",
          description: "You are an analyst at a consulting firm. Your manager has requested a brief email about a recent client case:",
          client: "Ventara Automotive",
          scenario: "Our client, Ventara, is experiencing delays in the launch of their new electric vehicle. The main issues include supply chain disruptions and technical challenges with the battery system. This could affect their position in the market and profitability.",
          instructions: [
            "Summarize the main issues",
            "Explain potential impact on client relationship",
            "Suggest two next steps"
          ]
        },
        writingTask: {
          title: "Case Study",
          description: "Write an internal email to your manager",
          greeting: "Dear [Manager],",
          wordLimit: 300,
          requirements: [
            "Use at least 300 words",
            "Use a professional or concise tone",
            "Structure your response clearly"
          ]
        }
      }
    },
    {
      id: 2,
      name: "In-Tray Email Exercise",
      description: "Test your ability to prioritize, analyze, and respond under pressure.",
      duration: "15–20 minutes",
      status: "available",
      score: null,
      icon: "📧",
      type: "email",
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
            content: `Hi,

We have received the disclosure documents for the Riverside Developments vs Newton Homes matter by 3 p.m, for a client call. The client has specifically asked that we flag any key discrepancies between the parties disputes.

- Prioritize the mail thread "Construction Delays-2023"- writing a note of no more than 150 words outlining key points and potential risks; send your summary back to me for review before 2:30 p.m.`
          },
          {
            subject: "Draft Witness statement-Follow Up",
            priority: "MEDIUM",
            time: "09:30",
            content: "Follow up on the witness statement draft for the upcoming court hearing next week. We need to ensure all witness testimonies are properly documented and aligned with the case strategy."
          },
          {
            subject: "Billing Query-Newton Homes Matter",
            priority: "LOW",
            time: "09:15",
            content: "Query regarding the recent billing for the Newton Homes matter - client has requested a detailed breakdown of charges and justification for the hourly rates applied."
          }
        ],
        requirements: {
          wordLimit: 150,
          instructions: [
            "Write a note of no more than 150 words",
            "Outline key points and potential risks",
            "Submit before 2:30 p.m.",
            "Use professional business language"
          ]
        }
      }
    },
    {
      id: 3,
      name: "Write in Presentation Task",
      description: "Test your ability to communicate complex information effectively.",
      duration: "15–20 minutes",
      status: "completed",
      score: 85,
      icon: "📊",
      type: "presentation",
      content: {
        caseStudy: {
          title: "Presentation Task",
          description: "You need to create an executive summary presentation for a quarterly business review:",
          client: "Global Tech Solutions",
          scenario: "The company has shown mixed results this quarter: 15% growth in European markets but a 5% decline in North America. New product launch is delayed by 2 months, but customer satisfaction scores are at an all-time high.",
          instructions: [
            "Create a structured presentation outline",
            "Highlight key achievements and challenges",
            "Propose strategic recommendations",
            "Design 3-5 key slides with talking points"
          ]
        },
        writingTask: {
          title: "Presentation Development",
          description: "Create an executive presentation outline",
          greeting: "Executive Summary:",
          wordLimit: 350,
          requirements: [
            "Use at least 350 words",
            "Structure content for senior leadership",
            "Use clear, impactful language",
            "Include data-driven insights"
          ]
        }
      }
    },
    {
      id: 4,
      name: "Legal Case Study",
      description: "Test your ability to interpret and summarise key legal judgments.",
      duration: "15–20 minutes",
      status: "available",
      score: null,
      icon: "⚖️",
      type: "legal",
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
    },   
    {
      id: 5,
      name: "In-Tray Email Exercise",
      description: "Test your ability to prioritize, analyze, and respond under pressure.",
      duration: "15–20 minutes",
      status: "completed",
      score: 92,
      icon: "📧",
      type: "email",
      content: {
        caseStudy: {
          title: "In-Tray Exercise",
          description: "You have returned from vacation to find 25 emails in your inbox. You need to prioritize and respond to the most critical ones first:",
          client: "Various Clients & Internal Teams",
          scenario: "Your inbox contains emails ranging from urgent client requests to internal meeting invites and newsletter subscriptions. You have limited time and need to demonstrate effective prioritization and decision-making skills.",
          instructions: [
            "Identify the 5 most urgent emails",
            "Draft brief responses for each",
            "Explain your prioritization criteria",
            "Suggest delegation where appropriate"
          ]
        },
        writingTask: {
          title: "Email Response Exercise",
          description: "Prioritize and respond to critical emails",
          greeting: "Response Drafts:",
          wordLimit: 400,
          requirements: [
            "Use at least 400 words in total",
            "Demonstrate clear prioritization logic",
            "Use professional email etiquette",
            "Address time-sensitive matters first"
          ]
        }
      }
    },
  ],
  benefits: [
    "Experience realistic law firm assessment tasks powered by AI",
    "Strengthen your problem-solving, analysis, and communication skills",
    "Stand out to employers with verified test scores on your profile"
  ]
};