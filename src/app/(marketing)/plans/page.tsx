'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { createPaymentSession } from '@/lib/api/subscriptionApi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function PlansPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null)
  const { data: session } = useSession()
  const router = useRouter()

  // Static Plans Data
  const staticPlans = [
    {
      _id: 'starter-plan',
      name: 'Starter Plan',
      description: 'Perfect for getting started on your legal journey',
      price: 0,
      subscriptionCategory: 'students',
      features: [
        'Community access',
        'Access to legal opportunities',
        'Limited law firm profiles',
        'Application tracker',
        'Unlimited CV builder',
        'Learning resources'
      ],
      buttonText: 'Get Started'
    },
    {
      _id: 'premium-plan',
      name: 'Premium Plan',
      description: 'Everything you need to secure competitive legal roles',
      price: isYearly ? 150 : 15, // Assuming £150 for yearly based on £15/mo
      type: isYearly ? 'yearly' : 'monthly',
      subscriptionCategory: 'students',
      isPremium: true,
      sections: [
        {
          title: 'Application Tools',
          features: ['Unlimited CV builder', 'Cover letter builder']
        },
        {
          title: 'Interview Preparation',
          features: [
            'Mock interview simulations',
            'Structured feedback and improvement guidance'
          ]
        },
        {
          title: 'Assessment Centre Training',
          features: [
            'In tray email exercises',
            'Written case studies',
            'Case law analysis tasks',
            'Video Presentation practice'
          ]
        },
        {
          title: 'Psychometric Test Suite',
          features: [
            'Watson Glaser style critical thinking tests',
            'Verbal reasoning',
            'Numerical reasoning',
            'Abstract reasoning',
            'Situational judgement'
          ]
        },
        {
          title: 'Firm Insights',
          features: [
            'Full law firm insights library',
            'Recruitment process breakdowns'
          ]
        },
        {
          title: 'Structured Learning',
          features: [
            'Step by step learning pathways',
            'Video lessons from legal professionals'
          ]
        }
      ],
      buttonText: 'Upgrade Now'
    },
    {
      _id: 'schools-plan',
      name: 'Schools Plan',
      description: 'Empower your students with The Aspiring Legal Network',
      price: 'Custom',
      subscriptionCategory: 'school',
      features: [
        'Everything included in the Premium plan',
        'School dashboard access',
        'Cohort management and analytics',
        'Student progress tracking',
        'School workshops and events',
        'Dedicated support'
      ],
      buttonText: 'Contact Us'
    }
  ]

  // Filter Logic (Optional: still keeping role-based filtering if needed, but the user asked for static)
  const plansToDisplay = staticPlans.filter(plan => {
    if (session?.user?.role) {
      if (
        session.user.role === 'student' &&
        plan.subscriptionCategory !== 'students'
      )
        return false
      if (
        session.user.role === 'school' &&
        plan.subscriptionCategory !== 'school'
      )
        return false
    }
    return true
  })

  const handleSubscribe = async (plan: any) => {
    if (plan.price === 'Custom') {
      router.push('/contact') // Or wherever school inquiries go
      return
    }

    if (!session) {
      router.push('/login')
      return
    }

    try {
      setProcessingPlanId(plan._id)
      // For static plans that aren't in the DB yet, this might fail unless backend handles them.
      // But user just wanted static content. 
      const response = await createPaymentSession(plan._id)

      if (response.success && response.data?.url) {
        window.location.href = response.data.url
      } else {
        toast.error(response.message || 'Failed to initiate payment')
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setProcessingPlanId(null)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-16 px-1 md:px-8 bg-gradient-to-b from-[#FEE64D] to-[#FFFFD4]">
      {/* Header */}
      <div className="text-center mb-12 space-y-4 container mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight">
          Unlock Your Legal Future With The Aspiring Legal Network
        </h1>
        <p className="text-lg text-gray-600">
          Smart tools and support for aspiring solicitors and apprentices
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center mt-8">
          <div className="bg-white rounded-[50px] border border-gray-200 flex items-center shadow-sm w-[360px] h-[50px] relative p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`flex-1 h-full rounded-[50px] text-sm font-semibold transition-all duration-200 z-10 ${!isYearly
                ? 'bg-transparent text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`flex-1 h-full rounded-[50px] text-sm font-semibold transition-all duration-200 z-10 ${isYearly
                ? 'bg-transparent text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              Yearly
            </button>

            {/* Animated Background Pill */}
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#f3db40] rounded-[50px] transition-transform duration-300 shadow-sm ${isYearly ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'
                }`}
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2 font-medium">
          Save 2 months when you buy a yearly membership
        </p>
      </div>

      {/* Content Area */}
      <div className="container mx-auto w-full min-h-[400px] flex items-center justify-center">
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl items-start py-12">
          {plansToDisplay.map((plan: any, index) => {
            const isSchool = plan.subscriptionCategory === 'school'
            const isHighlighted = plan.isPremium

            const categoryLabel =
              plan.subscriptionCategory === 'students'
                ? 'Student'
                : plan.subscriptionCategory === 'school'
                  ? 'School'
                  : 'Student'

            const isProcessing = processingPlanId === plan._id

            return (
              <div
                key={index}
                className={`relative flex flex-col p-5 lg:p-7 rounded-2xl transition-transform hover:-translate-y-1 duration-300 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] min-w-[300px] max-w-[380px] ${isHighlighted
                  ? 'bg-gradient-to-b from-[#FEE64D] to-[#FFFFD4] shadow-2xl z-10 border border-[#FEE64D]'
                  : isSchool
                    ? 'bg-slate-50 border border-slate-200 shadow-xl'
                    : 'bg-white border border-gray-200 shadow-xl'
                  }`}
              >
                {/* Category Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
                  <span
                    className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 ${isHighlighted
                      ? 'bg-black text-[#FEE64D] border border-[#FEE64D]'
                      : isSchool
                        ? 'bg-slate-800 text-white border border-slate-700'
                        : 'bg-[#FEE64D] text-black border border-white'
                      }`}
                  >
                    {categoryLabel}
                  </span>
                </div>

                {/* Plan Header */}
                <div className="text-center mb-5 mt-3">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-extrabold text-gray-900">
                      {typeof plan.price === 'number' && plan.price === 0
                        ? 'Free'
                        : typeof plan.price === 'number'
                          ? `£${plan.price}`
                          : plan.price}
                    </span>
                    {typeof plan.price === 'number' && plan.price > 0 && (
                      <span className="text-gray-600 text-xs font-medium">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 mt-2 text-[13px] leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <div className="flex-1 space-y-5">
                  {plan.sections ? (
                    plan.sections.map((section: any, si: number) => (
                      <div key={si} className="space-y-2">
                        <h4 className="font-bold text-[11px] text-gray-800 uppercase tracking-widest">
                          {section.title}
                        </h4>
                        <ul className="space-y-2">
                          {section.features.map((feature: string, fi: number) => (
                            <li
                              key={fi}
                              className="flex items-start gap-2.5 text-left"
                            >
                              <div
                                className={`mt-0.5 min-w-[16px] h-[16px] rounded-full flex items-center justify-center ${isHighlighted ? 'bg-green-700 text-[#FFFF00]' : 'bg-green-700 text-white'}`}
                              >
                                <Check size={8} strokeWidth={4} />
                              </div>
                              <span
                                className={`text-[13px] leading-tight ${isHighlighted ? 'text-gray-800 font-normal' : 'text-gray-600'}`}
                              >
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <ul className="space-y-3">
                      {plan.features?.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-left">
                          <div
                            className={`mt-0.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center ${isHighlighted ? 'bg-green-700 text-[#FFFF00]' : 'bg-green-700 text-white'}`}
                          >
                            <Check size={10} strokeWidth={3} />
                          </div>
                          <span
                            className={`text-[13px] leading-tight ${isHighlighted ? 'text-gray-800 font-normal' : isSchool ? 'text-slate-700 font-normal' : 'text-gray-600'}`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Button
                  className={`w-full rounded-full py-6 font-bold text-base mt-8 ${'bg-[#f3db40] text-black hover:bg-[#dfc836] border-2 border-[#f3db40]'}`}
                  onClick={() => handleSubscribe(plan)}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    plan.buttonText || 'Get Started'
                  )}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
