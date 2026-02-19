'use client'

import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import RoleSelectionModal from './RoleSelectionModal'

export default function GoogleLoginButton() {
  const handleLogin = async ({ idToken }: { idToken?: string }) => {
    try {
      const result = await signIn('google', {
        idToken,
        redirect: false,
      })

      console.log('google id ', idToken)

      if (result?.error) {
        console.error('❌ Google Login Error:', result.error)
        toast.error(result.error)
      } else {
        toast.success('Login successful!')
        window.location.href = result?.url || '/dashboard'
      }
    } catch (error) {
      console.error(error)
      toast.error('An unexpected error occurred during Google Login')
    }
  }

  return (
    <div className="w-full relative flex justify-center group">
      {/* Custom Button UI */}
      <div className="w-full max-w-[400px] h-[50px] bg-[#FFFF00] rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-transform active:scale-95 border border-transparent group-hover:shadow-md">
        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-[#FFFF00] font-bold text-sm">
          G
        </div>
        <span className="text-black font-bold text-lg">
          Continue with google
        </span>
      </div>

      {/* Invisible Google Button Overlay */}
      <div className="absolute inset-0 w-full h-full opacity-0 overflow-hidden flex justify-center items-center z-10">
        <GoogleLogin
          onSuccess={credentialResponse => {
            if (credentialResponse.credential) {
              handleLogin({ idToken: credentialResponse.credential })
            } else {
              toast.error('Failed to retrieve Google Token')
            }
          }}
          onError={() => {
            toast.error('Google Login Failed')
          }}
          useOneTap={false}
          theme="outline"
          shape="rectangular"
          text="continue_with"
          width="400"
          containerProps={{
            style: { width: '100%', height: '100%', display: 'block' },
          }}
        />
      </div>
    </div>
  )
}
