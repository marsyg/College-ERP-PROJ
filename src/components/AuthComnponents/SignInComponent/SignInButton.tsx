'use client'; // Mark this as a Client Component
import { signIn, signOut, useSession } from 'next-auth/react';
import SignInForm from './SignInForm';

export default function SignInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded">
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn('google')} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
        Sign in with Google
      </button>
      <SignInForm />
    </>
  );
}
