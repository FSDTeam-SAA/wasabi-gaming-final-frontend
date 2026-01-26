"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { useState } from "react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Application Tracker", href: "#" },
  { label: "Law Firm Profiles", href: "#" },
  { label: "Event", href: "#" },
  { label: "Courses", href: "#" },
  { label: "Mock Interviews", href: "#" },
]

const moreItems = [
  { label: "Resources", href: "#" },
  { label: "Blog", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Contact", href: "#" },
]

export default function Navbar() {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Logo"
              width={108}
              height={64}
              className="w-[108px] h-[64px] object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 justify-center bg-[#EBEBEB] py-4 px-8 rounded-[24px]">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[18px] text-[#505050] hover:text-[#505050]/80 font-semibold transition"
              >
                {item.label}
              </Link>
            ))}

            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-[18px] text-[#505050] hover:text-[#505050]/80 font-semibold flex items-center gap-1 px-2"
                >
                  More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="min-w-[160px]">
                {moreItems.map((item) => (
                  <DropdownMenuItem key={item.label}>
                    <Link href={item.href} className="w-full text-base">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button className="bg-[#FFFF00] hover:bg-[#E5E500] text-black font-bold text-[18px] h-[48px] rounded-[40px] px-7">
              CV Builder
            </Button>
            <Button
              variant="outline"
              className="border-2 border-[#A6A600] text-[#A6A600] hover:bg-[#A6A600]/10 hover:border-[#A6A600]/80 hover:text-[#A6A600] font-bold text-[18px] h-[48px] rounded-[40px] px-7"
            >
              Login
            </Button>
            <Button className="bg-[#FFFF00] hover:bg-[#E5E500] text-black font-bold text-[18px] h-[48px] rounded-[40px] px-7">
              Sign up
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu size={28} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold">Menu</SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-6 mt-10">
                {/* Main Nav Items */}
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setSheetOpen(false)}
                    className="text-[18px] text-[#505050] hover:text-black font-semibold transition"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* More Section */}
                <div className="border-t pt-6">
                  {moreItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setSheetOpen(false)}
                      className="block text-[18px] text-[#505050] hover:text-black font-semibold mb-4 transition"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Mobile Buttons - Exactly same as desktop */}
                <div className="flex flex-col gap-4 mt-10">
                  <Button className="w-full bg-[#FFFF00] hover:bg-[#E5E500] text-black font-bold text-[18px] h-[48px] rounded-[40px]">
                    CV Builder
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#A6A600] text-[#A6A600] hover:bg-[#A6A600]/10 hover:border-[#A6A600]/80 hover:text-[#A6A600] font-bold text-[18px] h-[48px] rounded-[40px]"
                  >
                    Login
                  </Button>
                  <Button className="w-full bg-[#FFFF00] hover:bg-[#E5E500] text-black font-bold text-[18px] h-[48px] rounded-[40px]">
                    Sign up
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}