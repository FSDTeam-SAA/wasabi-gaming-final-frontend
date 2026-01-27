import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

const achievements = [
  {
    title: 'Negotiation Workshop with White & Case',
    description:
      'Students learned how negotiations work in practice, how to prepare effectively, and how to communicate their position clearly.',
    image: '/network1.jpg',
    badgeColor: 'bg-yellow-400',
  },
  {
    title: 'Think Like a Lawyer with Broadfield',
    description:
      'Students worked through legal problems and learned how lawyers analyse information and build arguments.',
    image: '/network2.jpg',
    badgeColor: 'bg-yellow-400',
  },
  {
    title: 'Think Like a Legal Recruiter with Lawyer with Freshfields',
    description:
      'Students learned how law firms assess candidates, what recruiters look for, and how the role of a lawyer works in practice.',
    image: '/network3.jpg',
    badgeColor: 'bg-yellow-400',
  },
  {
    title: 'Think Like a Legal Recruiter with DWF',
    description:
      'Students gained practical guidance on applications, assessment centres and standing out as a candidate.',
    image: '/network4.jpg',
    badgeColor: 'bg-yellow-400',
  },
]

const AchievementsSection = () => {
  return (
    <section className="main-bg-color py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2
          className="text-4xl md:text-5xl max-w-5xl mx-auto lg:text-[52px] font-bold text-gray-900 text-center mb-12 md:mb-16"
          style={{ fontFamily: "'Neuton', serif" }}
        >
          The Aspiring Legal Network recent achievements
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg  transition-all duration-300 hover:shadow-2xl border-none group"
            >
              {/* Image */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={achievement.image}
                  alt={achievement.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Content */}
              <CardContent className="p-6">
                <h3
                  className="text-xl text-gray-900 font-semibold mb-3 min-h-[60px]"
                  style={{ fontFamily: "'Neuton', serif" }}
                >
                  {achievement.title}
                </h3>

                <p className="text-gray-700 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AchievementsSection
