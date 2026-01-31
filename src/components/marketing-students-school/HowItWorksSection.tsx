import React from 'react'
import { Button } from './ui/button'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'

const HowItWorksSection = () => {
  return (
    <div className="bg-[#FFFFE6]" style={{
      backgroundImage: "url('/banner1.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>

      <div className="container flex flex-col  items-center lg:gap-60  lg:flex-row ">
       
        <div className="lg:py-20 py-10 max-w-4xl text-center lg:text-left">
          <Button variant="secondary" size="sm" className="rounded-full bg-[#EBEBEB] mb-2 text-[#2B6BA1] backdrop-blur">
            <Sparkles className="mr-2 h-4 w-4" />
            Career Insight Tools
          </Button>
          <div className='mt-2'>
            <h3 className="text-2xl sm:text-[52px] lg:leading-[60px]  font-bold mb-4">The Starting Point Of Your <br /> Career Set Up In Minutes, <br /> <span className='text-[#E4E403]'>Transforming Ambition</span> Into <br /> Real Opportunity</h3>
            <p className='max-w-2xl text-[#5A5A5A]'>Aspiring Legal Network is a careers and education platform for  students of all ages. Through practical legal experiences, employer  led sessions, and AI powered tools, students develop real insight, skills, and confidence to progress across work experience, apprenticeships, and university pathways, with progress tracked in one place.</p>
          </div>
          <Button className="py-3 px-12 mt-6 rounded-full  bg-[#FFFF00] hover:bg-[ #FFFF00]/80 text-[#282828] font-bold">Create Your Resume</Button>
        </div>
       
        <div className="py-16 ">
          <Image
            src="/career.png"
            alt="How It Works"
            width={1200}
            height={600}
            className="w-full h-auto rounded-xl"
            priority
          />
        </div>
      </div>

    </div>
  )
}

export default HowItWorksSection