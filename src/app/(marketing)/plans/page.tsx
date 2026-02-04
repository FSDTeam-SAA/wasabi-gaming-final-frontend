'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Check, AlertCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { getAllPremiums, createPaymentSession } from '@/lib/api/subscriptionApi'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function PlansPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null)
  const { data: session } = useSession()
  const router = useRouter()

  // Determine interval string for API
  const typeQuery = isYearly ? 'yearly' : 'monthly&type=weekly'

  // Fetch premiums with query param
  const { data: apiResponse, isLoading, isError } = useQuery({
    queryKey: ['premiums', typeQuery],
    queryFn: () => getAllPremiums(typeQuery),
    retry: 1,
  })

  const apiPlans = apiResponse?.data || []

  // Filter Logic
  const filteredPlans = apiPlans.filter((plan) => {
    if (session?.user?.role) {
      if (session.user.role === 'student' && plan.subscriptionCategory !== 'students') return false
      if (session.user.role === 'school' && plan.subscriptionCategory !== 'school') return false
    }
    return true
  })

  // Combine for display
  const plansToDisplay = filteredPlans

  const handleSubscribe = async (plan: any) => {
    if (!session) {
      router.push('/login')
      return
    }

    /* 
    // Removed client-side free plan check to allow backend to handle all "purchases" / subscriptions 
    // including free trials or zero-cost plans via the same checkout flow if configured.
    if (plan.price === 0 || plan.price === 'Free') {
       toast.info('Free plan selected')
       // If we wanted to bypass payment for free plans entirely on client side, we'd do it here.
       // But user requested "direct payment" flow for logged in users.
       // We will proceed to createPaymentSession.
    } 
    */

    try {
      setProcessingPlanId(plan._id)
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
      <div className="text-center mb-12 space-y-4 max-w-7xl mx-auto">
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
        {isLoading ? (
          // Skeleton Loading
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="relative flex flex-col p-8 rounded-2xl bg-white border border-gray-200 shadow-xl h-[600px]">
                <div className="text-center mb-6 space-y-3">
                  <Skeleton className="h-6 w-24 mx-auto rounded-full" />
                  <Skeleton className="h-8 w-1/2 mx-auto" />
                  <Skeleton className="h-12 w-1/3 mx-auto" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-4 flex-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="flex gap-3">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-5 w-3/4" />
                    </div>
                  ))}
                </div>
                <Skeleton className="h-14 w-full rounded-full mt-auto" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-100 max-w-md">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Unable to load plans</h3>
            <p className="text-gray-600 mb-6">We encountered an issue while retrieving the subscription plans.</p>
            <Button onClick={() => window.location.reload()} variant="outline" className="border-gray-300 hover:bg-gray-50">Reload Page</Button>
          </div>
        ) : plansToDisplay.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-lg">No subscription plans available for this category/period.</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 w-full max-w-7xl items-start">
            {plansToDisplay.map((plan: any, index) => {
              const isSchool = plan.subscriptionCategory === 'school'
              const isHighlighted = !isSchool && ((plan.name || '').toLowerCase().includes('premium') || (plan.name || '').toLowerCase().includes('pro'))

              const categoryLabel = plan.subscriptionCategory === 'students' ? 'Student' :
                plan.subscriptionCategory === 'school' ? 'School' :
                  'Student'

              const isProcessing = processingPlanId === plan._id

              return (
                <div
                  key={index}
                  className={`relative flex flex-col p-2 lg:p-8 rounded-2xl transition-transform hover:-translate-y-1 duration-300 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] min-w-[300px] max-w-[400px] ${isHighlighted
                    ? 'bg-gradient-to-b from-[#FEE64D] to-[#FFFFD4] shadow-2xl scale-105 z-10 border border-[#FEE64D]'
                    : isSchool
                      ? 'bg-slate-50 border border-slate-200 shadow-xl'
                      : 'bg-white border border-gray-200 shadow-xl'
                    }`}
                >
                  {/* Category Badge */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 ${isHighlighted
                      ? 'bg-black text-[#FEE64D] border border-[#FEE64D]'
                      : isSchool
                        ? 'bg-slate-800 text-white border border-slate-700'
                        : 'bg-[#FEE64D] text-black border border-white'
                      }`}>
                      {categoryLabel}
                    </span>
                  </div>

                  {/* Plan Header */}
                  <div className="text-center mb-6 mt-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-extrabold text-gray-900">
                        {typeof plan.price === 'number' && plan.price === 0 ? 'Free' : (typeof plan.price === 'number' ? `£${plan.price}` : plan.price)}
                      </span>
                      {(plan.type === 'monthly' || plan.type === 'yearly' || plan.type === 'weekly') && (
                        <span className="text-gray-700 font-medium">/{plan.type === 'monthly' ? 'month' : plan.type === 'yearly' ? 'year' : 'weekly'}</span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-3 text-sm min-h-[40px]">
                      {plan.description || (plan.name === 'Free Plan' ? 'Perfect for getting started on your legal journey' : 'Unlock your full potential with our premium features')}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features?.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-left">
                        <div className={`mt-1 min-w-[20px] h-[20px] rounded-full flex items-center justify-center ${isHighlighted ? 'bg-black text-[#FFFF00]' : 'bg-slate-700 text-white'}`}>
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className={`text-sm ${isHighlighted ? 'text-gray-900 font-medium' : isSchool ? 'text-slate-800 font-medium' : 'text-gray-600'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full rounded-full py-6 font-bold text-base mt-auto ${isHighlighted ? 'bg-black text-white hover:bg-gray-800' : 'bg-[#f3db40] text-black hover:bg-[#dfc836] border-2 border-[#f3db40]'}`}
                    onClick={() => handleSubscribe(plan)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (plan.price === 0 || plan.price === 'Free' ? 'Get Started' : 'Purchase Plan')}
                  </Button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
