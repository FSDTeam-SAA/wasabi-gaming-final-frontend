'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logo from "./logo/Logo";

interface NavItem {
  name: string;
  path: string;
}

const StudentNavbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "CV Builder", path: "/dashboard/cv-builder" },
    { name: "Cover Letter Builder", path: "/dashboard/cover-letter" },
    { name: "Psychometric Test", path: "/dashboard/psychometric-test" },
    { name: "Mock Interview", path: "/dashboard/mock-interview" },
    { name: "Courses", path: "/dashboard/courses" },
    { name: "AI Assessment Centre", path: "/dashboard/ai-assessment-centre" },
    { name: "Law Firm Profiles", path: "/dashboard/law-firm-profiles" },
    { name: "Application Tracker", path: "/dashboard/application-tracker" },
  ];

  const isActive = (path: string): boolean => {
    // For dashboard, only match exactly "/dashboard"
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }

    // For other items, check exact match or starts with path + "/"
    // Also handle specific route patterns
    if (path === "/dashboard/courses") {
      return (
        pathname === "/dashboard/courses" ||
        pathname.startsWith("/dashboard/course/") ||
        pathname.startsWith("/dashboard/payment/")
      );
    }

    if (path === "/dashboard/law-firm-profiles") {
      return (
        pathname === "/dashboard/law-firm-profiles" ||
        pathname.startsWith("/dashboard/law-firm-profile/")
      );
    }

    // For other routes, check exact match or sub-routes
    return (
      pathname === path || pathname.startsWith(path + "/")
    );
  };

  return (
    <nav className="w-full border border-[#E5E7EB]">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Logo height={120} mobileHeight={70} name="logo" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-2 flex-grow justify-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "yellow text-[#1E1E1E]"
                    : "text-[#505050] hover:text-black"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section - Desktop */}
        <Link
          href="/dashboard/setting"
          className={`px-4 py-2 rounded-2xl font-medium transition-all duration-200 ${
            isActive("/dashboard/setting")
              ? "bg-[#FFFF00] text-[#1E1E1E] border-2 border-[#E5E500]"
              : "text-[#505050] hover:text-black"
          }`}
        >
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 rounded-full size-10 text-sm text-[#505050] bg-[#E5E7EB] font-medium hover:text-black transition-colors">
              JD
            </button>
            <button className="py-2 rounded-full text-black font-semibold">
              Profile
            </button>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-black p-2"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FEF9BE] border-t border-[#E5E500] px-4 py-3">
          <ul className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    isActive(item.path)
                      ? "bg-[#FFFF00] text-black border-2 border-[#E5E500]"
                      : "text-[#505050] hover:text-black"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Right Section */}
          <Link
            href="/dashboard/setting"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              isActive("/dashboard/setting")
                ? "bg-[#FFFF00] text-black border-2 border-[#E5E500]"
                : "text-[#505050] hover:text-black"
            }`}
          >
            <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-[#E5E500]">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full size-10 text-sm text-[#505050] bg-[#E5E7EB] font-medium flex items-center justify-center">
                  JD
                </div>
                <span className="text-black font-semibold">Profile</span>
              </div>
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default StudentNavbar;
