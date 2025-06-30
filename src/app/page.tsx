'use client';
import { SessionProvider } from 'next-auth/react';
import SigInButton from '@/components/SignInButton';
import { use } from 'react';

export default function Home() {
  return (
    <SessionProvider>
      <SigInButton></SigInButton>
    </SessionProvider>
  );
}
