'use client';

import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import RoleSelectionModal from './RoleSelectionModal';

export default function GoogleLoginButton() {
  const router = useRouter();
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [tempToken, setTempToken] = useState<string | null>(null);

  const handleLogin = async ({ idToken, tempToken: existingTemp, role }: { idToken?: string, tempToken?: string, role?: string }) => {
    try {
      const result = await signIn('google-login', {
        idToken,
        tempToken: existingTemp,
        role,
        redirect: false,
      });

      if (result?.error) {
        // Try to parse the error to see if it's the ROLE_REQUIRED case
        try {
          const errorData = JSON.parse(result.error);
          if (errorData.code === "ROLE_REQUIRED") {
            setTempToken(errorData.tempToken);
            setShowRoleModal(true);
            return;
          }
        } catch (e) {
          // Not a JSON error, proceed to show string error
        }

        toast.error(result.error);
      } else {
        toast.success('Login successful!');
        window.location.href = result?.url || '/dashboard';
      }
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred during Google Login');
    }
  };

  const onRoleSelect = (role: 'student' | 'school') => {
    if (tempToken) {
      console.log('🎯 Role selected, completing registration...', role);
      handleLogin({ tempToken, role });
      setShowRoleModal(false);
    }
  }

  return (
    <>
      <div className="w-full flex justify-center">
        <GoogleLogin
          onSuccess={credentialResponse => {
            if (credentialResponse.credential) {
              handleLogin({ idToken: credentialResponse.credential });
            } else {
              toast.error("Failed to retrieve Google Token");
            }
          }}
          onError={() => {
            toast.error('Google Login Failed');
          }}
          useOneTap={false}
          theme="outline"
          shape="rectangular"
          text="continue_with"
          width="400"
        />
      </div>

      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => {
          setShowRoleModal(false);
          setTempToken(null);
        }}
        onSelectRole={onRoleSelect}
      />
    </>
  );
}
