import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Award, BookOpen, CircleCheckBig, GraduationCap, Search, Star, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import CourseCard from './course-card'

export const metadata = {
    title: 'CourseHub - Learn from Expert-Led Courses',
    description:
        'Access high-quality courses designed to help you land your dream job.',
}

export default function AllCourse() {
    const stats = [
        { label: 'Total Courses', value: 6, icon: BookOpen, bg: "#DBEAFE", textCOlor: "#155DFC" },
        { label: 'Enrolled', value: 4, icon: CircleCheckBig, bg: "#DCFCE7", textCOlor: "#00A63E" },
        { label: 'Videos Completed', value: 1, icon: TrendingUp, bg: "#F3E8FF", textCOlor: "#9810FA" },
        { label: 'Certificates', value: 0, icon: Award, bg: "#FEF9C2", textCOlor: "#D08700" },
    ]

    const courses = [
        {
            id: 1,
            title: 'Resume Writing Mastery',
            category: 'Career Development',
            level: 'Beginner',
            duration: '2h 30m',
            rating: 4.8,
            progress: 33,
            tag: 'FREE',
            image:
                'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
        },
        {
            id: 2,
            title: 'Interview Skills Bootcamp',
            category: 'Interview Prep',
            level: 'Intermediate',
            duration: '3h 45m',
            rating: 4.9,
            progress: 0,
            tag: 'FREE',
            image:
                'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500&h=300&fit=crop',
        },
        {
            id: 3,
            title: 'LinkedIn Profile Optimization',
            category: 'Personal Branding',
            level: 'Beginner',
            duration: '2h 10m',
            rating: 4.7,
            progress: 0,
            tag: 'FREE',
            image:
                'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop',
        },
    ]

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-10">

                {/* HERO */}
                <section className="mb-10">
                    <div className="rounded-2xl border-2 border-[#FFFF00] bg-[linear-gradient(135deg,#FEFCE8_0%,#FFFFFF_50%,#FAF5FF_100%)]  p-14">
                        <span className="inline-flex  rounded-full bg-[#FFFF00] px-3 py-2 items-center gap-3 text-xs font-semibold text-[#1E1E1E] mb-4 ">
                            <GraduationCap size={20} />  Professional Development
                        </span>

                        <h1 className="text-3xl text-[#1E1E1E] md:text-4xl pt-4  mb-3">
                            Advance Your Career with Expert-Led Courses
                        </h1>

                        <p className="text-[#4A5565] pt-4 max-w-2xl mb-6">
                            Access high-quality courses designed to help you land your dream job.
                            Learn at your own pace with interactive video lessons and practical exercises.
                        </p>

                        <div className="flex flex-wrap gap-6 text-sm">
                            <span className='flex items-center gap-2'><Award className='text-[#FFFF00]' size={20} /> 3 Free Courses</span>
                            <span className='flex items-center gap-2'><Users className='text-[#FFFF00]' size={20} /> 5,000+ Students</span>
                            <span className='flex items-center gap-2'><Star className='text-[#FFFF00]' size={20} /> 4.8 Average Rating</span>
                        </div>
                    </div>
                </section>

                {/* STATS */}
                <section className="mb-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((s, i) => (
                            <div
                                key={i}
                                className={`rounded-xl border p-6 flex items-center gap-3 `}
                            >
                                <div
                                    className="h-9 w-9 flex items-center justify-center rounded-full"
                                    style={{ backgroundColor: s.bg }}
                                >
                                    {s.icon && <s.icon style={{ color: s.textCOlor }} size={20} />}
                                </div>

                                <div>
                                    <p className="text-lg ">{s.value}</p>
                                    <p className="text-xs text-muted-foreground">{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SEARCH + FILTER */}
                <section className="mb-8">
                    <div className="flex flex-col md:flex-row gap-3 items-center">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                placeholder="Search courses..."
                                className="w-full bg-[#F3F3F5] rounded-full border px-10 py-2 text-sm outline-none"
                            />
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            {['All', 'Career Development', 'Interview Prep', 'Personal Branding'].map(
                                (t, i) => (
                                    <button
                                        key={i}
                                        className={`px-4 py-1.5 rounded-full text-xs border
                    ${i === 0
                                                ? 'bg-[#FFFF00] border-[#FFFF00]'
                                                : 'bg-white'
                                            }`}
                                    >
                                        {t}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </section>

                {/* COURSES */}
                <CourseCard/>
            </main>
        </div>
    )
}
