
'use client'

import React, { useEffect, useState } from 'react'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from './ui/select'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Star } from 'lucide-react'
import JoinCommunityModal from './JoinCommunityModal'
import { useRouter } from 'next/navigation'
import HeroDropDown from '../ui/HeroDropDown'

const jobTypeList = [
  { id: 1, name: "Apprenticeship", value: "Apprenticeship" },
  { id: 2, name: "Work Experience", value: "Work Experience" },
  { id: 3, name: "Training Contracts", value: "Training Contracts" },
  { id: 4, name: "Paralegal", value: "Paralegal" },
];

const locationList = [
  { id: 1, name: "London", value: "London" },
  { id: 2, name: "Manchester", value: "Manchester" },
  { id: 3, name: "Birmingham", value: "Birmingham" },
  { id: 4, name: "Leeds", value: "Leeds" },
  { id: 5, name: "Liverpool", value: "Liverpool" },
  { id: 6, name: "Cardiff", value: "Cardiff" },
];

const Hero = () => {
  const words = ['DREAMS', 'FUTURE', 'PASSION']
  const [index, setIndex] = useState(0)
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false)
    const [jobType, setJobType] = useState<string | undefined>("");
    const [location, setLocation] = useState<string | undefined>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

const handleSearch = () => {
  const filterData = {
    jobType,
    location,
    source: "hero",
  };

  localStorage.setItem("jobFilters", JSON.stringify(filterData));

  router.push("/dashboard/application-tracker");
};



  return (
    <section
      className="relative text-center py-16 sm:py-20 px-4 overflow-hidden"
      style={{
        backgroundImage: "url('/heroImage.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* FLOATING CARD */}
      <Card
        className="
          hidden lg:block rounded-[16px]
          lg:absolute lg:left-4 lg:top-12
          xl:left-12
          2xl:left-24
          bg-white border-none
          lg:w-56 py-2
          shadow-[0px_8px_16px_0px_#0000001F]
        "
      >
        <CardContent className="py-2 flex flex-col px-2 lg:px-4 items-start gap-2">
          {/* Avatars */}
          <div className="flex -space-x-2 sm:-space-x-3">
            {[
              '/star1.jpg',
              '/star2.jpg',
              '/star3.jpg',
              '/star4.jpg',
              '/star5.jpg',
            ].map((src, i) => (
              <Avatar
                key={i}
                className="h-8 w-8 xl:h-10 xl:w-10 border-2 border-white ring-1 ring-gray-100"
              >
                <AvatarImage src={src} alt={`Student ${i + 1}`} />
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
            ))}
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 text-[#FFC107]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3 w-3 xl:h-4 xl:w-4 2xl:h-5 2xl:w-5 fill-current"
              />
            ))}
          </div>

          <p className="text-xs w-full text-left font-medium text-gray-900">
            Joined by Students Nationwide
          </p>
        </CardContent>
      </Card>

      {/* HEADING */}
      <div className="flex justify-center">
        <div className="max-w-5xl">
          <h1
            className="
              text-3xl sm:text-5xl md:text-[52px]
              leading-tight sm:leading-[60px]
              font-bold text-gray-900 mb-6
            "
          >
            PURSUE YOUR LEGAL <br />
            <span className="text-[#E4E403]">{words[index]}</span> WITH 
            CONFIDENCE
          </h1>

          <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-12 max-w-3xl mx-auto">
            Your pathway into the legal profession starts here
          </p>
        </div>
      </div>

          {/* <Select>
            <SelectTrigger className="rounded-full py-3 px-4 border-0 bg-transparent focus:ring-0">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent className="bg-white border-none">
              <SelectItem value="type1">Type 1</SelectItem>
              <SelectItem value="type2">Type 2</SelectItem>
              <SelectItem value="type3">Type 3</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="rounded-full py-3 px-4 border-0 bg-transparent focus:ring-0">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent className="bg-white border-none">
              <SelectItem value="location1">Location 1</SelectItem>
              <SelectItem value="location2">Location 2</SelectItem>
              <SelectItem value="location3">Location 3</SelectItem>
            </SelectContent>
          </Select> */}

      {/* SEARCH BAR */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 w-full max-w-4xl mx-auto">
        <div
          className="
            flex flex-col sm:flex-row items-center gap-4 w-full
            sm:bg-white rounded-full py-4 px-4 sm:px-6
            sm:shadow-[0px_8px_16px_0px_#00000014,8px_0px_16px_0px_#00000014]
          "
        >
      

           {/* job type  */}
                  <div>
                    <HeroDropDown
                      list={jobTypeList}
                      selectedValue={jobType}
                      onValueChange={setJobType}
          
                      placeholderText="Select Type"
                    />
                  </div>
                  {/* job type  */}
                  <div>
                    <HeroDropDown
                      list={locationList}
                      selectedValue={location}
                      onValueChange={setLocation}
          
                      placeholderText="Select Location"
                    />
                  </div>

          <Button onClick={handleSearch} className="w-full h-[50px] sm:w-auto bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-[#131313] text-base border border-[#CACA00] font-medium py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            Search
          </Button>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10 sm:mt-12">
        <Button
          onClick={() => setOpenModal(true)}
          className="w-full sm:w-auto bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-[#1E1E1E] border border-[#CACA00] font-bold py-6 px-10 sm:px-16 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
        >
          Join the Community!
        </Button>
      </div>

      {/* MODAL */}
      <JoinCommunityModal open={openModal} onOpenChange={setOpenModal} />
    </section>
  )
}

export default Hero
