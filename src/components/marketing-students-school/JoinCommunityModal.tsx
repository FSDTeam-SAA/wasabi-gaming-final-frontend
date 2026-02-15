'use client'

import React from 'react'
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

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const JoinCommunityModal = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl !rounded-[12px] bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Join the Community
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* Full Name */}
          <Input placeholder="Full Name" className='border border-[#0000001A] rounded-[8px] h-[44px]' />

          {/* Email */}
          <Input type="email" placeholder="Email Address" className='border border-[#0000001A] rounded-[8px] h-[44px]' />

          {/* Age */}
          <Input placeholder="Age" className='border border-[#0000001A] rounded-[8px] h-[44px]' />

          {/* Location */}
          <Input placeholder="City or Town" className='border border-[#0000001A] rounded-[8px] h-[44px]' />

          {/* Phone */}
          <Input placeholder="Phone Number" className='border border-[#0000001A] rounded-[8px] h-[44px]' />
          {/* Year Group */}
          <Select >
            <SelectTrigger className='border h-[44px] border-[#0000001A] rounded-[8px]'>
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
        <div className='flex justify-center'>
        <Button className="w-[300px] mt-6 bg-[#FFFF00] text-black rounded-[14px] font-bold hover:bg-[#FFFF00]/90">
          Join the Network
        </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default JoinCommunityModal
