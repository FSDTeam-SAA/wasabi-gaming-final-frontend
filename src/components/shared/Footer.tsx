'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/shared/logo/Logo";
import { useAppStore } from "@/store/useAppStore";
import { ActiveSection } from "@/constant/navConstant";

const Footer = () => {
    const pathname = usePathname();
    const activeSection = useAppStore((state) => state.activeSection);

    // Logic from legacy: isContactPage = location.pathname === "/" && activeSection === ActiveSection.Students
    // This logic applies yellow background.
    const isYellowBg = pathname === "/" && activeSection === ActiveSection.Students;

    return (
        <footer
            className={`text-[#1E1E1E] py-12 px-4 md:px-16 ${isYellowBg ? `bg-[#FEF9C2]` : "bg-white border-t"}`}
        >
            <div className="max-w-7xl mx-auto lg:flex justify-between items-start gap-12">
                {/* Left Section: Logo and Description */}
                <div className="space-y-6 flex-1">
                    {/* Logo */}
                    <Link href="/">
                        <Logo height={120} mobileHeight={70} name="logo" />
                    </Link>
                    <p className="max-w-[400px] text-[#4A5565] leading-relaxed">
                        Aspiring helps you create professional, job-ready resumes in
                        minutes. Build, customise, and share your CV with ease to take the
                        next step in your career.
                    </p>
                </div>

                {/* Right Section: Footer Links */}
                <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-12 flex-1 lg:justify-end mt-8 lg:mt-0">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-xl">About</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href={`/about-us/${activeSection === ActiveSection.Students
                                        ? "student"
                                        : "school"
                                        }`}
                                    className="text-[#4A5565] hover:text-black transition-colors"
                                >
                                    About us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact-us" className="text-[#4A5565] hover:text-black transition-colors">
                                    Contact us
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-[#4A5565] hover:text-black transition-colors">FAQ</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-xl">Legal</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/terms" className="text-[#4A5565] hover:text-black transition-colors">Terms and policies</Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-[#4A5565] hover:text-black transition-colors">Privacy policies</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Section */}
            <div className="max-w-7xl mx-auto border-t border-gray-200 mt-12 pt-6 text-[#5A5A5A] text-sm font-medium">
                <p>
                    © {new Date().getFullYear()} Aspiring. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
