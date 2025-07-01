'use client';
import { SessionProvider } from 'next-auth/react';
import SigInButton from '@/components/AuthComnponents/SignInComponent/SignInButton';
import { use } from 'react';
import router from 'next/router';
import { Button } from '@/components/ui/button';
import SignupButton from '@/components/AuthComnponents/SignUpComponents/SignupButton';
export default function Home() {
  
  return (
    // <SessionProvider>
    //   <SigInButton></SigInButton>
    // </SessionProvider>
    <div>
      <h1>SignUp
       <SignupButton/>
      </h1>
    </div>
  );
}
