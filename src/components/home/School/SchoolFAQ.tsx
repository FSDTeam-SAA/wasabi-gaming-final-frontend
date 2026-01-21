import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Title from "../../shared/title/Title";

const faqData = [
  {
    question: "How does the Aspiring Legal Network support schools and students?",
    answer:
      "The Aspiring Legal Network supports schools by providing accessible and practical exposure to legal careers. We work with schools to deliver age appropriate workshops, mock trials, careers talks and skills sessions, helping students understand legal pathways from an early stage through to post eighteen options such as apprenticeships and university.",
  },
  {
    question: "Which students is the Aspiring Legal Network suitable for?",
    answer:
      "Our programmes are designed for students from Year 5 through to university level. Sessions are tailored by age group, ensuring content is engaging and understandable whether students are being introduced to law for the first time or preparing applications.",
  },
  {
    question: "What types of activities do you offer for schools?",
    answer:
      "We offer a range of activities including interactive law workshops for younger students, mock trials, negotiation exercises, careers talks, and application support sessions for older students. All activities are designed to build confidence, awareness and practical skills.",
  },
  {
    question: "Can activities be delivered in school or online?",
    answer:
      "Yes. Activities can be delivered in school, at external venues such as universities or professional spaces, or online. This flexibility allows us to support schools across different regions and circumstances.",
  },
  {
    question: "Do students need prior legal knowledge?",
    answer:
      "No. No prior legal knowledge is required. All sessions are designed to meet students at their current level and introduce concepts in a clear and engaging way.",
  },
  {
    question: "How do schools get involved or book a session?",
    answer:
      "Schools can contact us via our website or email to discuss their students’ needs. We work collaboratively with schools to design sessions that align with their careers programme and curriculum.",
  },
];

const SchoolFAQ = () => {
  return (
    <div className="bg-[#FFFEF0] py-5 md:py-8 lg:py-20 px-4 lg:px-0">
      <Title
        heading="Got questions?"
        description="Find answers to commonly asked questions about the Aspiring Legal Network"
      />
      <div className="md:max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-3xl shadow-sm mt-8">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-base font-semibold text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default SchoolFAQ;
