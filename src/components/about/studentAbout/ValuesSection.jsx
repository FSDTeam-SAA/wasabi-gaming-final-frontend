import {
  FaUsers,
  FaHandshake,
  FaSeedling,
  FaBalanceScale,
} from "react-icons/fa";
import { IoTrophyOutline } from "react-icons/io5";
const values = [
  {
    id: 1,
    icon: <FaBalanceScale />,
    title: "Equal Access",
    description:
      "We believe everyone deserves a fair start. Aspiring breaks down barriers by making guidance and opportunities simple, clear, and accessible to all.",
    gradient: "linear-gradient(135deg, #858AFF, #505399)", // BLUE-PURPLE
  },
  {
    id: 2,
    icon: <FaHandshake />,
    title: "Mutual Respect",
    description:
      "We value every user equally. Respect means listening, protecting your privacy, and creating a safe space for everyone to grow.",
    gradient: "linear-gradient(135deg, #009F64, #00754A)", // GREEN gradient
  },
  {
    id: 3,
    icon: <FaUsers />,
    title: "Strong Community",
    description:
      "We thrive as a community. Collaboration, shared insights, and feedback drive us forward and make every journey stronger.",
    gradient: "linear-gradient(135deg, #8326FF, #4F1799)", // PURPLE gradient
  },
  {
    id: 4,
    icon: <IoTrophyOutline />,
    title: "Growth & Empowerment",
    description:
      "We empower you to grow with confidence. Aspiring helps you build skills, showcase your strengths, and move closer to your goals.",
    gradient: "linear-gradient(135deg, #EECC0E, #BAA00B)", // YELLOW-ORANGE gradient
  },
];

export default function ValuesSection() {
  return (
    <div className="py-16 neuton">
      {/* Heading */}
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h2 className="text-3xl font-bold">Our Values</h2>
        <p className="max-w-2xl mx-auto text-base text-[#5A5A5A] pt-7">
          At The Aspiring Legal Network, we're guided by values that go beyond
          career tools — they define how we empower, connect, and support every
          individual on their journey into law.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 mx-auto max-w-7xl sm:grid-cols-2">
        {values.map((item) => (
          <div
            key={item.id}
            className="p-6 transition bg-white border shadow-sm rounded-xl hover:shadow-md"
          >
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full"
              style={{
                background: item.gradient,
              }}
            >
              <span className="text-xl text-white">{item.icon}</span>
            </div>
            <h3 className="mt-4 text-2xl font-bold">{item.title}</h3>
            <p className="mt-2 text-[#5A5A5A] inter">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
