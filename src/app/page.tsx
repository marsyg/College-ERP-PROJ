'use client';
import { SessionProvider } from 'next-auth/react';
import SigInButton from '@/components/SignInButton';
import { use } from 'react';
import SignUpForm from '@/components/SignUpForm';

export default function Home() {
  return (
    <SessionProvider>
      <SigInButton></SigInButton>
      <SignUpForm></SignUpForm>
    </SessionProvider>
  );
}
