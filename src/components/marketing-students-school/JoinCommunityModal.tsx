'use client'

import React, { useState } from 'react'
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
import { Loader2 } from 'lucide-react' // optional: for loading spinner

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

const JoinCommunityModal = ({ open, onOpenChange }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    age: '',
    cityOrTown: '',
    phoneNumber: '',
    yearGroup: '',
  })

  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  const mutation = useMutation({
    mutationFn: async (data: FormData & { status: 'active' }) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/community`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to join community')
      }

      return response.json()
    },

    onSuccess: () => {
      setSubmitStatus('success')
      // Auto-close modal and redirect after 2.5 seconds
      setTimeout(() => {
        onOpenChange(false)
        window.open(
          'https://chat.whatsapp.com/KBRYa3agEg70ixLXiWu42z',
          '_blank',
          'noopener,noreferrer'
        )
      }, 2500)
    },

    onError: () => {
      setSubmitStatus('error')
    },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }
  ) => {
    const name = 'target' in e ? e.target.name : e.name
    const value = 'target' in e ? e.target.value : e.value

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
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

    mutation.mutate({
      ...formData,
      age: formData.age, // API expects number, but we send string → backend should handle
      status: 'active' as const,
    })
  }

  const isLoading = mutation.isPending
  const whatsappLink = 'https://chat.whatsapp.com/KBRYa3agEg70ixLXiWu42z'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl !rounded-[12px] bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Join the Community
          </DialogTitle>
        </DialogHeader>

        {submitStatus === 'success' ? (
          <div className="py-10 text-center">
            <h3 className="text-xl font-bold text-green-600 mb-4">
              Thank you for joining!
            </h3>
            <p className="mb-6">
              Redirecting you to our WhatsApp community...
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700"
            >
              Join WhatsApp Group Now
            </a>
            <p className="text-sm text-gray-500 mt-4">
              (Closing in a few seconds...)
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="border border-[#0000001A] rounded-[8px] h-[44px]"
                required
              />

              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="border border-[#0000001A] rounded-[8px] h-[44px]"
                required
              />

              <Input
                name="age"
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="border border-[#0000001A] rounded-[8px] h-[44px]"
                required
              />

              <Input
                name="cityOrTown"
                placeholder="City or Town"
                value={formData.cityOrTown}
                onChange={handleChange}
                className="border border-[#0000001A] rounded-[8px] h-[44px]"
                required
              />

              <Input
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="border border-[#0000001A] rounded-[8px] h-[44px]"
                required
              />

              <Select
                value={formData.yearGroup}
                onValueChange={(value) =>
                  handleChange({ name: 'yearGroup', value })
                }
              >
                <SelectTrigger className="border h-[44px] border-[#0000001A] rounded-[8px]">
                  <SelectValue placeholder="Select Year Group" />
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
                    Joining...
                  </>
                ) : (
                  'Join the Network'
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default JoinCommunityModal