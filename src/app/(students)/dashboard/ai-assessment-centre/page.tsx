// 'use client'

// import Link from 'next/link'
// import { useRouter } from 'next/navigation'

// import { BookOpen, Brain, Mail, Scale, CheckCircle2 } from 'lucide-react'
// // import Navbar from './_components/navbar'
// import { AssessmentCard } from './_components/assessment-card'
// import Footer from './_components/footer'

// const assessments = [
//   {
//     id: 'written-case',
//     title: 'Written Case Study',
//     description: 'Test your ability to interpret and analyse written information.',
//     icon: <Brain className="w-6 h-6" />,
//     duration: '15-20 minutes',
//     status: 'completed' as const,
//   },
//   {
//     //  id: 'presentation',
//     title: 'Written Presentation Task',
//     description: 'Test your ability to communicate complex information effectively.',
//     icon: <BookOpen className="w-6 h-6" />,
//     score: { current: 85, total: 100 },
//     status: 'completed' as const,
//   },
//   {
//     // id: 'email-exercise',
//     id: 'presentation',
//     title: 'In-Tray Email Exercise',
//     description: 'Test your ability to prioritise, analyse, and respond under pressure.',
//     icon: <Mail className="w-6 h-6" />,
//     score: { current: 92, total: 100 },
//     status: 'completed' as const,
//   },
//   {
//     id: 'case-study',
//     title: 'Case Law Summary',
//     description: 'Test your ability to interpret and summarise key legal judgments.',
//     icon: <Scale className="w-6 h-6" />,
//     duration: '15-20 minutes',
//     status: 'available' as const,
//   }
  
// ]

// export default function Home() {
//   const router = useRouter()

//   const handleStartAssessment = (id: string) => {
//     router.push(`/dashboard/ai-assessment-centre/${id}`)
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-background">
//       {/* <Navbar /> */}

//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
//           <div className="space-y-2 mb-8">
//             <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
//               AI Assessment Centre
//             </h1>
//             <p className="text-lg text-muted-foreground">
//               Discover your cognitive strengths and ideal career paths.
//             </p>
//           </div>

//           {/* Assessment Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
//             {assessments.map((assessment) => (
//               <AssessmentCard
//                 key={assessment.id}
//                 title={assessment.title}
//                 description={assessment.description}
//                 icon={assessment.icon}
//                 duration={assessment.duration}
//                 score={assessment.score}
//                 status={assessment.status}
//                 onAction={() => handleStartAssessment(assessment.id)}
//                 actionLabel={assessment.status === 'completed' ? 'View Details' : 'Start Test'}
//               />
//             ))}
//           </div>

//           {/* Benefits Section */}
//           <section className="bg-accent/10 border border-accent/20 rounded-lg p-8">
//             <div className="flex items-start gap-4">
//               <Brain className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
//               <div>
//                 <h2 className="text-2xl font-bold text-foreground mb-4">
//                   Why Use Our AI Assessment Centre Suite?
//                 </h2>
//                 <ul className="space-y-3">
//                   <li className="flex items-center gap-3">
//                     <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
//                     <span className="text-foreground">
//                       Experience realistic law firm assessment tasks powered by AI
//                     </span>
//                   </li>
//                   <li className="flex items-center gap-3">
//                     <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
//                     <span className="text-foreground">
//                       Strengthen your problem-solving, analysis, and communication skills
//                     </span>
//                   </li>
//                   <li className="flex items-center gap-3">
//                     <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
//                     <span className="text-foreground">
//                       Stand out to employers with verified test scores on your profile
//                     </span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </section>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   )
// }






'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { Navbar } from '@/components/navbar'
import { BookOpen, Brain, Mail, Scale, CheckCircle2 } from 'lucide-react'
import Footer from './_components/footer'
import { AssessmentCard } from './_components/assessment-card'

const assessments = [
  {
    id: 'presentation',
    title: 'Written Presentation Task',
    description: 'Test your ability to communicate complex information effectively.',
    icon: <BookOpen className="w-6 h-6" />,
    duration: '15-20 minutes',
    status: 'available' as const,
  },
  {
    id: 'email-exercise',
    title: 'In-Tray Email Exercise',
    description: 'Test your ability to prioritise, analyse, and respond under pressure.',
    icon: <Mail className="w-6 h-6" />,
    score: { current: 92, total: 100 },
    status: 'completed' as const,
  },
  {
    id: 'case-study',
    title: 'Duty of Care Analysis',
    description: 'Test your ability to apply legal principles to fictional scenarios.',
    icon: <Scale className="w-6 h-6" />,
    duration: '15-20 minutes',
    status: 'available' as const,
  },
  {
    id: 'written-case',
    title: 'Written Case Study',
    description: 'Test your ability to interpret and analyse written information.',
    icon: <Brain className="w-6 h-6" />,
    score: { current: 85, total: 100 },
    status: 'completed' as const,
  },
]

export default function Home() {
  const router = useRouter()

  const handleStartAssessment = (id: string) => {
    router.push(`/dashboard/ai-assessment-centre/${id}`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* <Navbar /> */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="space-y-2 mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              AI Assessment Centre
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover your cognitive strengths and ideal career paths.
            </p>
          </div>

          {/* Assessment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {assessments.map((assessment) => (
              <AssessmentCard
                key={assessment.id}
                title={assessment.title}
                description={assessment.description}
                icon={assessment.icon}
                duration={assessment.duration}
                score={assessment.score}
                status={assessment.status}
                onAction={() => handleStartAssessment(assessment.id)}
                actionLabel={assessment.status === 'completed' ? 'View Details' : 'Start Test'}
              />
            ))}
          </div>

          {/* Benefits Section */}
          <section className="bg-accent/10 border border-accent/20 rounded-lg p-8">
            <div className="flex items-start gap-4">
              <Brain className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Why Use Our AI Assessment Centre Suite?
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">
                      Experience realistic law firm assessment tasks powered by AI
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">
                      Strengthen your problem-solving, analysis, and communication skills
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">
                      Stand out to employers with verified test scores on your profile
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  )
}
