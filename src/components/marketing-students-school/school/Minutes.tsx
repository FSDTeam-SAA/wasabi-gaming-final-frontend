import React from 'react'
import { Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'

const Minutes = () => {
  return (
    <div className="bg-[#FFFFE6]" style={{
      backgroundImage: "url('/banner1.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>

      <div className="container flex flex-col items-center lg:gap-60 lg:flex-row ">
        <div className="py-20 max-w-4xl text-center lg:text-left">
          <Button variant="secondary" size="sm" className="rounded-full bg-[#EBEBEB] mb-2 text-[#2B6BA1] backdrop-blur">
            <Sparkles className="mr-2 h-4 w-4" />
            Set up in minutes
          </Button>
          <div className='mt-2'>
            <h3 className="text-2xl sm:text-[52px] leading-9 lg:leading-[60px]  font-bold mb-4">The Starting Point Of Your  Career, <span className='text-[#E4E403]'>Transforming Ambition</span> Into Real Opportunity</h3>
            <p className='max-w-2xl text-[#5A5A5A]'>Aspiring Legal Network is a careers and education platform for <br className='sm:block hidden' /> students of all ages. Through practical legal experiences, employer <br className='sm:block hidden'/> led sessions, and AI powered tools, students develop real insight,<br className='sm:block hidden'/> skills, and confidence to progress across work experience,<br className='sm:block hidden'/> apprenticeships, and university pathways, with progress tracked in <br className='sm:block hidden'/> one place.</p>
          </div>
          <div className='lg:mt-10 mt-4 '>
            <h3 className='text-[#131313] font-bold text-[64px]'>10K+</h3>
            <p>Students Using The Aspiring Legal Network</p>
          </div>
        </div>
        <div className="lg:py-16 py-4">
          <Image
            src="/career.png"
            alt="How It Works"
            width={1200}
            height={600}
            className=""
            priority
          />
        </div>
      </div>

    </div>
  )
}

export default Minutes