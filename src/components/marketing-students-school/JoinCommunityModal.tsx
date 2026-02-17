'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Loader2, X, Check } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/utils/cn'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  fullName: string
  email: string
  age: string
  cityOrTown: string
  phoneNumber: string
  yearGroup: string
}

type Status = 'idle' | 'success' | 'error'

type Community = {
  id: string
  name: string
  badgeLeft?: string // e.g. "Full", "Active"
  badgeRight?: string // e.g. "Capacity reached", "Most popular"
  filled?: boolean
  whatsappLink?: string
}

const JoinCommunityModal = ({ open, onOpenChange }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    age: '',
    cityOrTown: '',
    phoneNumber: '',
    yearGroup: '',
  })

  const [submitStatus, setSubmitStatus] = useState<Status>('idle')

  // ✅ second modal state
  const [communityModalOpen, setCommunityModalOpen] = useState(false)

  // ✅ you can manage multiple communities here
  const communities: Community[] = useMemo(
    () => [
    
      {
        id: 'c2',
        name: 'Community 1',
        badgeLeft: 'Active',
        badgeRight: 'Most popular',
        filled: false,
        whatsappLink: 'https://chat.whatsapp.com/EuKQPgsyLF22yy1IbcH9Zn',
      },
    ],
    []
  )

  const mutation = useMutation({
    mutationFn: async (data: FormData & { status: 'active' }) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/community`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to join community')
      }

      return response.json()
    },
    onSuccess: () => {
      setSubmitStatus('success')

      // ✅ Close first modal, open second modal
      // small delay so user sees success state if you want (optional)
      setTimeout(() => {
        onOpenChange(false)
        setCommunityModalOpen(true)
      }, 300)
    },
    onError: () => setSubmitStatus('error'),
  })

  // Reset when modal is opened fresh
  useEffect(() => {
    if (open) {
      setSubmitStatus('idle')
    }
  }, [open])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }
  ) => {
    const name = 'target' in e ? e.target.name : e.name
    const value = 'target' in e ? e.target.value : e.value
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.age.trim() ||
      !formData.cityOrTown.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.yearGroup
    ) {
      setSubmitStatus('error')
      return
    }

    setSubmitStatus('idle')
    mutation.mutate({
      ...formData,
      status: 'active' as const,
    })
  }

  const isLoading = mutation.isPending

  // ✅ shared classes
  const labelClass = 'text-sm font-semibold text-[#0A0A23]'
  const inputClass = 'border border-[#0000001A] rounded-[8px] h-[44px]'
  const helperEnter = (text: string) => `Enter ${text}`

  const openWhatsApp = (link?: string) => {
    if (!link) return
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      {/* -------------------- 1) FORM MODAL -------------------- */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-3xl !rounded-[12px] bg-[#FFFEF0] p-6 border-2 border-[#FFFF00]">
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="Join Community"
              width={1000}
              height={1000}
              className="w-[66px] h-[40px] mb-3"
            />
          </div>

          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Join the Community
            </DialogTitle>
          </DialogHeader>

          {submitStatus === 'success' ? (
            <div className="py-10 text-center">
              <h3 className="text-xl font-bold text-green-600 mb-3">
                Submitted successfully ✅
              </h3>
              <p className="text-sm text-gray-600">
                Next step: choose your WhatsApp community…
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className={labelClass} htmlFor="fullName">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder={helperEnter('your full name')}
                    value={formData.fullName}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className={labelClass} htmlFor="email">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={helperEnter('your email address')}
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                {/* Age */}
                <div className="space-y-1">
                  <label className={labelClass} htmlFor="age">
                    Age
                  </label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder={helperEnter('your age')}
                    value={formData.age}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                {/* City/Town */}
                <div className="space-y-1">
                  <label className={labelClass} htmlFor="cityOrTown">
                    City or Town
                  </label>
                  <Input
                    id="cityOrTown"
                    name="cityOrTown"
                    placeholder={helperEnter('your city or town')}
                    value={formData.cityOrTown}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className={labelClass} htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="Number"
                    placeholder={helperEnter('your phone number')}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>

                {/* Year Group */}
                <div className="space-y-1">
                  <label className={labelClass}>Year Group</label>

                  <Select
                    value={formData.yearGroup}
                    onValueChange={(value) =>
                      handleChange({ name: 'yearGroup', value })
                    }
                  >
                    <SelectTrigger className="border h-[44px] border-[#0000001A] rounded-[8px]">
                      <SelectValue placeholder="Select year group" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-none">
                      <SelectItem value="year10">Year 10</SelectItem>
                      <SelectItem value="year11">Year 11</SelectItem>
                      <SelectItem value="year12">Year 12</SelectItem>
                      <SelectItem value="year13">Year 13</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {submitStatus === 'error' && (
                <p className="text-red-600 text-center mt-4">
                  {mutation.error?.message || 'Please fill all fields correctly'}
                </p>
              )}

              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-[300px] mt-6 bg-[#FFFF00] text-black rounded-[14px] font-bold hover:bg-[#FFFF00]/90 disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* -------------------- 2) COMMUNITY SELECT MODAL -------------------- */}
      <Dialog open={communityModalOpen} onOpenChange={setCommunityModalOpen}>
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden !rounded-[18px] border border-[#FFFF00] bg-[#FFFEF0]">
          {/* header */}
          <div className="relative px-6 pt-6 pb-4 border-b border-white/10">
            <button
              type="button"
              onClick={() => setCommunityModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 hover:bg-white/10 text-white/80"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="text-[#1E1E1E] text-xl font-semibold">
                Join  Community
              </div>
            </div>
            <p className="text-[#1E1E1E] text-sm mt-1">
              Empowering young professionals across the UK 🇬🇧
            </p>
          </div>

          <div className="p-6">
            {/* welcome card */}
            <div className="rounded-2xl border border-white/10 bg-[#FFFF00] px-5 py-6 text-center">
              <div className="mx-auto mb-3 h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="text-xl">🎉</span>
              </div>
              <h3 className="text-[#1E1E1E] text-lg font-semibold">
                Welcome to the Network!
              </h3>
              <p className="text-[#1E1E1E] text-sm mt-1">
                Your details have been registered. Join a community group below to get started.
              </p>
            </div>

            <div className="mt-6">
              <p className="text-[#1E1E1E] text-xs font-semibold tracking-wider">
                SELECT A WHATSAPP COMMUNITY
              </p>

              <div className="mt-3 space-y-3">
                {communities.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-2xl border border-white/10 bg-[#FFF7ED] px-4 py-4 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-[#1E1E1E] font-semibold">{c.name}</div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-[#1E1E1E]/60">
                        {c.badgeLeft && (
                          <span
                            className={cn(
                              'px-2 py-0.5 rounded-full border',
                              c.filled
                                ? 'border-[#FEF9C2] bg-[#FEF9C2] text-[#1E1E1E]'
                                : 'border-[#FFDF20] bg-[#FEF9C2] text-[#894B00]'
                            )}
                          >
                            {c.badgeLeft}
                          </span>
                        )}
                        {c.badgeRight && <span>{c.badgeRight}</span>}
                      </div>
                    </div>

                    {c.filled ? (
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">
                          Filled
                        </span>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => openWhatsApp(c.whatsappLink)}
                        className="bg-[#FFFF00] text-black font-semibold rounded-xl hover:bg-[#FFFF00]/80"
                      >
                        Join Group →
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-[#1E1E1E] text-xs">
                <Check className="h-4 w-4" />
                Redirecting to external WhatsApp application
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default JoinCommunityModal
