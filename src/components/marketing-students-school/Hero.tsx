// 'use client'

// import React, { useEffect, useState } from 'react'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from './ui/select'
// import { Button } from './ui/button'
// import { Card, CardContent } from './ui/card'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { Star } from 'lucide-react'

// const Hero = () => {
//   const words = ['DREAMS', 'FUTURE', 'PASSION']
//   const [index, setIndex] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex(prev => (prev + 1) % words.length)
//     }, 2000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <section
//       className="relative text-center py-16 sm:py-20 px-4 overflow-hidden"
//       style={{
//         backgroundImage: "url('/heroImage.png')",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       {/* Floating Card */}
//       <Card
//         className="mx-auto mb-6 w-56 sm:w-64 lg:w-72 lg:absolute lg:left-16 lg:top-12 xl:left-36 shadow-[0px_8px_16px_0px_#0000001F]"
//       >
//         <CardContent className="py-4 px-0 flex flex-col items-center gap-4">

//           {/* Avatars */}
//           <div className="flex -space-x-2 sm:-space-x-3">
//             {['/star1.jpg', '/star2.jpg', '/star3.jpg', '/star4.jpg'].map(
//               (src, i) => (
//                 <Avatar
//                   key={i}
//                   className="
//               h-8 w-8
//               sm:h-10 sm:w-10
//               md:h-12 md:w-12
//               border-2 border-white ring-1 ring-gray-100
//             "
//                 >
//                   <AvatarImage src={src} alt={`Student ${i + 1}`} />
//                   <AvatarFallback>ST</AvatarFallback>
//                 </Avatar>
//               )
//             )}
//           </div>

//           {/* Stars */}
//           <div className="flex items-center gap-1 text-[#FFC107]">
//             {Array.from({ length: 5 }).map((_, i) => (
//               <Star
//                 key={i}
//                 className="h-4 w-4 sm:h-5 sm:w-5 fill-current"
//               />
//             ))}
//           </div>

//           <p className="text-sm sm:text-base font-semibold text-gray-900">
//             Joined by 10K+ Students
//           </p>
//         </CardContent>
//       </Card>

//       {/* Heading */}
//       <div className="flex justify-center">
//         <div className="max-w-5xl">
//           <h1
//             className="
//               text-3xl sm:text-5xl md:text-[52px]
//               leading-tight sm:leading-[60px]
//               font-bold text-gray-900 mb-6
//             "
//           >
//             PURSUE YOUR LEGAL <br />
//             <span className="text-[#E4E403]">{words[index]}</span> WITH CONFIDENCE
//           </h1>

//           <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-12 max-w-3xl mx-auto">
//             Your pathway into the legal profession starts here
//           </p>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 w-full max-w-4xl mx-auto">
//         <div
//           className="
//       flex flex-col sm:flex-row items-center justify-center gap-4 w-full
//       sm:bg-white rounded-full py-4 px-4 sm:px-6
//       sm:shadow-[0px_8px_16px_0px_#00000014,8px_0px_16px_0px_#00000014]
//     "
//         >
//           {/* Type Select */}
//           <Select>
//             <SelectTrigger className="rounded-full py-3 px-4 border-0 bg-transparent text-gray-700 focus:ring-0">
//               <SelectValue placeholder="Select Type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="type1">Type 1</SelectItem>
//               <SelectItem value="type2">Type 2</SelectItem>
//               <SelectItem value="type3">Type 3</SelectItem>
//             </SelectContent>
//           </Select>

//           {/* Location Select */}
//           <Select>
//             <SelectTrigger className=" rounded-full py-3 px-4 border-0 bg-transparent text-gray-700 focus:ring-0">
//               <SelectValue placeholder="Select Location" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="location1">Location 1</SelectItem>
//               <SelectItem value="location2">Location 2</SelectItem>
//               <SelectItem value="location3">Location 3</SelectItem>
//             </SelectContent>
//           </Select>

//           {/* Search Button */}
//           <Button className="w-full sm:w-auto bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-gray-900 border border-[#CACA00] font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300">
//             Search
//           </Button>
//         </div>
//       </div>

//       {/* CTA */}
//       <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10 sm:mt-12">
//         <Button className="w-full sm:w-auto bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-[#1E1E1E] border border-[#CACA00] font-bold py-6 px-10 sm:px-16 rounded-full shadow-xl text-lg">
//           Join the Community!
//         </Button>
//       </div>
//     </section>
//   )
// }

// export default Hero

'use client'

import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Star } from 'lucide-react'

const Hero = () => {
  const words = ['DREAMS', 'FUTURE', 'PASSION']
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

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
      {/* FLOATING CARD */}
      <Card
        className="
    hidden xl:block
    lg:absolute left-6 lg:left-12 lg:top-12
    xl:left-16
    2xl:left-36
    bg-white border-none
    w-32 sm:w-64 lg:w-72
    shadow-[0px_8px_16px_0px_#0000001F]
  "
      >
        <CardContent className="py-4 px-0 flex flex-col items-center gap-4">
          {/* Avatars */}
          <div className="flex -space-x-2 sm:-space-x-3">
            {['/star1.jpg', '/star2.jpg', '/star3.jpg', '/star4.jpg'].map(
              (src, i) => (
                <Avatar
                  key={i}
                  className="
              h-8 w-8
              sm:h-10 sm:w-10
              md:h-12 md:w-12
              border-2 border-white ring-1 ring-gray-100
            "
                >
                  <AvatarImage src={src} alt={`Student ${i + 1}`} />
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
              ),
            )}
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 text-[#FFC107]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
            ))}
          </div>

          <p className="text-sm sm:text-base font-semibold text-gray-900">
            Joined by 10K+ Students
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

      {/* SEARCH BAR */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 w-full max-w-4xl mx-auto">
        <div
          className="
            flex flex-col sm:flex-row items-center gap-4 w-full
            sm:bg-white rounded-full py-4 px-4 sm:px-6
            sm:shadow-[0px_8px_16px_0px_#00000014,8px_0px_16px_0px_#00000014]
          "
        >
          <Select>
            <SelectTrigger className="rounded-full py-3 px-4 border-0 bg-transparent focus:ring-0">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="type1">Type 1</SelectItem>
              <SelectItem value="type2">Type 2</SelectItem>
              <SelectItem value="type3">Type 3</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="rounded-full py-3 px-4 border-0 bg-transparent focus:ring-0">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="location1">Location 1</SelectItem>
              <SelectItem value="location2">Location 2</SelectItem>
              <SelectItem value="location3">Location 3</SelectItem>
            </SelectContent>
          </Select>

          <Button className="w-full sm:w-auto bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-gray-900 border border-[#CACA00] font-bold py-3 px-6 rounded-full shadow-lg">
            Search
          </Button>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10 sm:mt-12">
        <Button className="w-full sm:w-auto bg-[#FFFF00] hover:bg-[#FFFF00]/90 text-[#1E1E1E] border border-[#CACA00] font-bold py-6 px-10 sm:px-16 rounded-full shadow-xl text-lg">
          Join the Community!
        </Button>
      </div>
    </section>
  )
}

export default Hero
