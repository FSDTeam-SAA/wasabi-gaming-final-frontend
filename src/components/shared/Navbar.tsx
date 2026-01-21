'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Logo from '@/components/shared/logo/Logo'
import { useAppStore } from '@/store/useAppStore'
import { ActiveSection } from '@/constant/navConstant'
import { Building2 } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const isContactPage = pathname === '/contact-us'

  const { activeSection, setActiveSection } = useAppStore()
  const { data: session } = useSession()
  const isLoggedIn = !!session

  // Local state for UI toggles
  const [cvBuilderSelection, setCvBuilderSelection] = useState('CV Builder')
  const [isCvBuilderOpen, setIsCvBuilderOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Initialize from storage if needed? useAppStore persists 'activeSection'.
  // We can persist cvBuilderSelection in local state or another store if needed.
  // Original code persisted it. Let's persist it in useEffect for client-side only if critical.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCV = localStorage.getItem('cvBuilderSelection')
      if (savedCV) setCvBuilderSelection(savedCV)
    }
  }, [])

  const handleCvSelection = (option: string) => {
    setCvBuilderSelection(option)
    if (typeof window !== 'undefined')
      localStorage.setItem('cvBuilderSelection', option)

    setIsCvBuilderOpen(false)
    if (option === 'CV Builder') {
      router.push('/dashboard/cv-builder')
    } else if (option === 'Cover Letter Builder') {
      router.push('/dashboard/cover-letter')
    }
  }

  const handleMobileCvSelection = (option: string) => {
    setCvBuilderSelection(option)
    if (typeof window !== 'undefined')
      localStorage.setItem('cvBuilderSelection', option)

    setIsCvBuilderOpen(false)
    setIsMobileMenuOpen(false)

    if (option === 'CV Builder') {
      router.push('/dashboard/cv-builder')
    } else if (option === 'Cover Letter Builder') {
      router.push('/dashboard/cover-letter')
    }
  }

  const handleLogout = () => {
    signOut()
    setIsMobileMenuOpen(false)
  }

  const showProfileButton = isLoggedIn && activeSection === ActiveSection.School

  const navItemsData =
    activeSection === ActiveSection.Students
      ? [
        {
          name: 'Application Tracker',
          to: '/dashboard/student/application-tracker',
        },
        { name: 'Law Firm Profiles', to: '/dashboard/law-firm-profiles' },
        { name: 'Portfolio', to: '/portfolio' },
        { name: 'Courses', to: '/dashboard/courses' },
        { name: 'Mock Interviews', to: '/dashboard/mock-interview' },
      ]
      : [
        { name: 'Manage Students', to: '/manage-students' },
        { name: 'Invite Students', to: '/invite-students' },
        { name: 'Premium Features', to: '/premium-features' },
      ]

  const moreItems = [
    {
      name: 'About us',
      to: `/about-us/${activeSection === ActiveSection.Students ? 'student' : 'school'
        }`,
    },
    { name: 'Contact us', to: '/contact-us' },
  ]

  return (
    <nav className="relative z-50 w-full">
      {/* Top Section */}
      <div
        className={`flex items-center justify-center md:justify-start ${isContactPage ? '' : 'bg-gradient-to-r from-[#FEE900] to-[#FEE900]'
          } p-1 sm:p-2 md:p-3 lg:p-3 xl:p-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl neuton`}
      >
        <Link href="/">
          <button
            className={`py-1 md:py-2 lg:py-2 px-3 md:px-4 lg:px-4 xl:px-4 ${activeSection === ActiveSection.Students
                ? 'border-b-2 border-[#FDC700] font-semibold'
                : 'text-gray-700'
              }`}
            onClick={() => setActiveSection(ActiveSection.Students)}
          >
            Students
          </button>
        </Link>
        <span className="mx-1 sm:mx-2 md:mx-2 lg:mx-2 xl:mx-2 text-gray-500">
          |
        </span>
        <Link href="/">
          <button
            className={`px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 lg:px-4 lg:py-2 ${activeSection === ActiveSection.School
                ? 'border-b-2 border-[#FDC700] font-semibold'
                : 'text-gray-700'
              }`}
            onClick={() => setActiveSection(ActiveSection.School)}
          >
            School
          </button>
        </Link>
      </div>

      {/* Main Navbar */}
      <div
        className={`flex items-center justify-between p-2 md:p-3 lg:p-4 px-4 md:px-8 lg:px-2 xl:px-16 ${isContactPage
            ? ''
            : activeSection === ActiveSection.Students &&
            `bg-gradient-to-r from-[#FEF26D] to-[#FEF9C2]`
          }`}
      >
        {/* Logo */}
        <Link href="/">
          <div className="w-auto">
            <Logo height={120} mobileHeight={80} name="logo" />
          </div>
        </Link>

        {/* Desktop Navbar Items */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <div className="flex items-center space-x-2 lg:space-x-3 xl:space-x-6">
            <div
              className={`flex items-center border border-[#E6E6E6] rounded-full px-3 lg:px-4 xl:px-6 py-2 ${isContactPage ? `lg:bg-[#bababb8e]` : `lg:bg-[#FEFACA]`
                }`}
            >
              {navItemsData.map(item => {
                const isActive = pathname === item.to
                return (
                  <Link
                    key={item.name}
                    href={item.to}
                    className={`
                    px-2 lg:px-3 xl:px-4 text-center py-1 font-medium transition-colors duration-200 
                    text-xs sm:text-base md:text-lg lg:text-sm xl:text-lg
                    ${isActive
                        ? 'bg-[#FFFF03] text-black rounded-3xl px-3 lg:px-4 xl:px-4 py-2' // .yellow class replacement
                        : isContactPage
                          ? 'text-black'
                          : 'text-[#505050] hover:text-black'
                      }
                  `}
                  >
                    {item.name}
                  </Link>
                )
              })}

              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`flex items-center px-2 lg:px-3 xl:px-4 py-1 ${isContactPage ? `text-black` : `text-[#505050]`
                    } font-medium transition-colors duration-200 text-xs lg:text-sm xl:text-lg`}
                >
                  More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    className={`ml-1 lg:ml-2 transform transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''
                      }`}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11.475 14.475L7.84995 10.85C7.79995 10.8 7.76262 10.746 7.73795 10.688C7.71328 10.63 7.70062 10.5673 7.69995 10.5C7.69995 10.3667 7.74595 10.25 7.83795 10.15C7.92995 10.05 8.05062 10 8.19995 10H15.8C15.95 10 16.071 10.05 16.163 10.15C16.255 10.25 16.3006 10.3667 16.3 10.5C16.3 10.5333 16.25 10.65 16.15 10.85L12.525 14.475C12.4416 14.5583 12.3583 14.6167 12.275 14.65C12.1916 14.6833 12.1 14.7 12 14.7C11.9 14.7 11.8083 14.6833 11.725 14.65C11.6416 14.6167 11.5583 14.5583 11.475 14.475Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                {isMoreOpen && (
                  <div className="absolute top-full right-0 mt-2 lg:mt-4 xl:mt-2 w-40 lg:w-44 xl:w-48 z-10 flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow-lg">
                    {moreItems.map((item, idx) => {
                      const isActive = pathname === item.to
                      return (
                        <React.Fragment key={item.name}>
                          <Link
                            href={item.to}
                            onClick={() => setIsMoreOpen(false)}
                            className={`w-full text-left px-3 lg:px-4 xl:px-4 py-2 text-[#505050] font-medium transition-colors duration-200 text-xs lg:text-sm xl:text-base ${isActive
                                ? 'bg-[#FFFF85] border-b-[1px] border-b-[#E6E6E6]'
                                : 'hover:bg-gray-100'
                              }`}
                          >
                            {item.name}
                          </Link>
                          {idx < moreItems.length - 1 && (
                            <div className="w-full border-b border-gray-200" />
                          )}
                        </React.Fragment>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center space-x-2 lg:space-x-3 xl:space-x-3">
          {/* CV Builder */}
          <div className="relative neuton">
            <button
              className="flex items-center space-x-1 lg:space-x-2 bg-[#FFFF00] border-2 border-[#E5E500] text-black px-2 lg:px-3 xl:px-4 py-1 lg:py-2 rounded-full font-semibold text-xs lg:text-sm xl:text-base"
              onClick={() => setIsCvBuilderOpen(!isCvBuilderOpen)}
            >
              <span className="truncate max-w-[80px] lg:max-w-[90px] xl:max-w-none">
                {cvBuilderSelection}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                className="lg:w-4 lg:h-4 xl:w-4 xl:h-4 ml-1 transform transition-transform duration-200"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.475 14.475L7.84995 10.85C7.79995 10.8 7.76262 10.746 7.73795 10.688C7.71328 10.63 7.70062 10.5673 7.69995 10.5C7.69995 10.3667 7.74595 10.25 7.83795 10.15C7.92995 10.05 8.05062 10 8.19995 10H15.8C15.95 10 16.071 10.05 16.163 10.15C16.255 10.25 16.3006 10.3667 16.3 10.5C16.3 10.5333 16.25 10.65 16.15 10.85L12.525 14.475C12.4416 14.5583 12.3583 14.6167 12.275 14.65C12.1916 14.6833 12.1 14.7 12 14.7C11.9 14.7 11.8083 14.6833 11.725 14.65C11.6416 14.6167 11.5583 14.5583 11.475 14.475Z"
                  fill="#000000"
                />
              </svg>
            </button>
            {isCvBuilderOpen && (
              <div className="absolute top-full right-0 mt-2 w-36 lg:w-40 xl:w-48 z-10 flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow-lg">
                {['CV Builder', 'Cover Letter Builder'].map((option, idx) => (
                  <React.Fragment key={option}>
                    <button
                      className={`w-full text-left px-3 lg:px-4 xl:px-4 py-2 text-[#505050] font-medium transition-colors duration-200 text-xs lg:text-sm xl:text-base ${cvBuilderSelection === option
                          ? 'bg-[#FFFF85]'
                          : 'hover:bg-gray-100'
                        }`}
                      onClick={() => handleCvSelection(option)}
                    >
                      {option}
                    </button>
                    {idx === 0 && (
                      <div className="w-full border-b border-gray-200" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* School Profile */}
          {showProfileButton && (
            <Link href="/school-profile">
              <button
                className="
                  flex items-center gap-1 lg:gap-2
                  px-2 lg:px-3 xl:px-3 py-1 lg:py-1.5 xl:py-1.5
                  rounded-full
                  border border-[#E5E5E5]
                  bg-white
                  text-[#1F2937]
                  text-xs lg:text-sm xl:text-sm
                  font-medium
                  shadow-sm
                  hover:bg-gray-50
                  hover:shadow-md
                  transition-all
                  duration-200
                  min-w-[fit-content]
                "
              >
                <div className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 rounded-full bg-[#FFFF00] flex items-center justify-center flex-shrink-0">
                  <Building2
                    size={12}
                    className="lg:w-4 lg:h-4 xl:w-4 xl:h-4 text-black"
                  />
                </div>

                <span className="whitespace-nowrap truncate max-w-[80px] lg:max-w-[90px] xl:max-w-none">
                  School Profile
                </span>
              </button>
            </Link>
          )}

          {/* Auth Buttons */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="border-2 border-[#E5E500] text-[#A6A600] px-2 lg:px-3 xl:px-4 py-1 lg:py-2 rounded-full font-semibold neuton hover:bg-[#ffff00]/10 transition text-xs lg:text-sm xl:text-base"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login">
                <button className="border-2 border-[#E5E500] text-[#A6A600] px-2 lg:px-3 xl:px-4 py-1 lg:py-2 rounded-full font-semibold neuton text-xs lg:text-sm xl:text-base">
                  Login
                </button>
              </Link>
              <Link href="/signUp">
                <button className="bg-[#FFFF00] border-2 border-[#E5E500] text-black px-2 lg:px-3 xl:px-4 py-1 lg:py-2 rounded-full font-semibold neuton text-xs lg:text-sm xl:text-base">
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button
            className="text-black p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu implementation simplified ... */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FEF9BE] p-4 flex flex-col space-y-3">
          {/* ... similar items mapping ... */}
          {navItemsData.map(item => (
            <Link
              key={item.name}
              href={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 text-[#505050] font-medium hover:bg-gray-100 rounded transition-colors duration-200 text-sm"
            >
              {item.name}
            </Link>
          ))}
          {/* ... Mobile auth buttons ... */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="border-2 border-[#E5E500] text-[#A6A600] px-4 py-2 rounded-full font-semibold w-full hover:bg-[#ffff00]/10 transition text-sm"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="border-2 border-[#E5E500] text-black px-4 py-2 rounded-full font-semibold w-full text-sm">
                  Login
                </button>
              </Link>
              <Link href="/signUp" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="bg-[#FFFF00] border-2 border-[#E5E500] text-black px-4 py-2 rounded-full font-semibold w-full text-sm">
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
