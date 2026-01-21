'use client';

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
            className={`text-[#1E1E1E] py-8 px-16 ${isYellowBg ? `bg-[#FEF9C2]` : ""
                }`}
        >
            <div className="lg:flex justify-between items-center">
                {/* Left Section: Logo and Description */}
                <div className="space-y-4 flex-1">
                    {/* Logo */}
                    <Link href="/">
                        <Logo height={120} mobileHeight={70} name="logo" />
                    </Link>
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
                                    href={`/about-us/${activeSection === ActiveSection.Students
                                            ? "student"
                                            : "school"
                                        }`}
                                    className="hover:underline"
                                >
                                    About us
                                </Link>
                            </li>
                            <li>
                                <Link href={"/contact-us"} className="hover:underline">
                                    Contact us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">FAQ</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal and Accessibility Section */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-xl">Legal and Accessibility</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="#" className="hover:underline">Terms and policies</Link>
                            </li>
                            <li>
                                <Link href="/privacy-policies" className="hover:underline">Privacy policies</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Section */}
            <div className="border-t border-gray-300 mt-6 pt-4 text-[#5A5A5A] font-bold">
                <p>
                    @copyright aspiringlegalwork.{new Date().getFullYear()} . All rights
                    reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;
