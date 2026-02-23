'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserProfile } from '@/hooks/useUserProfile'
import { toast } from 'sonner'

interface SubscriptionGuardProps {
    children: React.ReactNode
    requireSubscription?: boolean
    requireLogin?: boolean
}

export default function SubscriptionGuard({
    children,
    requireSubscription = true,
    requireLogin = true,
}: SubscriptionGuardProps) {
    const router = useRouter()
    const { isAuthenticated, hasActiveSubscription, isLoading } = useUserProfile()

    useEffect(() => {
        // Wait for loading to complete
        if (isLoading) return

        // Check login requirement
        if (requireLogin && !isAuthenticated) {
            toast.error('Please login to access this page')
            router.push('/login')
            return
        }

        // Check subscription requirement
        if (requireSubscription && isAuthenticated && !hasActiveSubscription) {
            toast.error('This feature requires an active subscription')
            router.push('/plans')
            return
        }
    }, [isAuthenticated, hasActiveSubscription, isLoading, requireLogin, requireSubscription, router])

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    // Don't render children if requirements not met
    if (requireLogin && !isAuthenticated) {
        return null
    }

    if (requireSubscription && !hasActiveSubscription) {
        return null
    }

    return <>{children}</>
}
