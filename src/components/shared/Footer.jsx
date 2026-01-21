import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./logo/Logo";
import { ActiveSection } from "../../constant/navConstant";
import { secureStorage } from "../../utils/secureStorage";

const Footer = () => {
  const location = useLocation();
  const activeSection =
    secureStorage.getItem("activeSection") || ActiveSection.Students;
  const isContactPage =
    location.pathname === "/" && activeSection === ActiveSection.Students;

  return (
    <footer
      className={`text-[#1E1E1E] py-8 px-16 ${
        isContactPage ? `bg-[#FEF9C2]` : ""
      }`}
    >
      <div className="lg:flex justify-between items-center">
        {/* Left Section: Logo and Description */}
        <div className="space-y-4 flex-1">
          {/* Logo */}
          <NavLink to="/">
            <Logo height={120} mobileHeight={70} name="logo" />
          </NavLink>
          <p className="max-w-[400px]">
            Aspiring helps you create professional, job-ready resumes in
            minutes. Build, customise, and share your CV with ease to take the
            next step in your career.
          </p>
        </div>

        {/* Right Section: Footer Links */}
        <div className="flex space-x-12 flex-1 gap-20 mt-8 lg:mt-0">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-xl">About</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to={`/about-us${
                    activeSection === ActiveSection.Students
                      ? "/student"
                      : "/school"
                  }`}
                  className="hover:underline"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link to={"/contact-us"} className="hover:underline">
                  Contact us
                </Link>
              </li>
              <li>
                <Link className="hover:underline">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Legal and Accessibility Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-xl">Legal and Accessibility</h3>
            <ul className="space-y-4">
              <li>
                <Link className="hover:underline">Terms and policies</Link>
              </li>
              <li>
                <Link className="hover:underline">Privacy policies</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-gray-300 mt-6 pt-4 text-[#5A5A5A font-bold">
        <p>
          @copyright aspiringlegalwork.{new Date().getFullYear()} . All rights
          reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
