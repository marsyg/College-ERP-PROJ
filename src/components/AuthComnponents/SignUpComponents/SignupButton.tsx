// src/components/AuthComnponents/SignUpComponents/SignupButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function SignupButton() {
  const router = useRouter();
  
  return (
    <Button onClick={() => router.push('/auth/signup')}>SignUp</Button>
  );
}