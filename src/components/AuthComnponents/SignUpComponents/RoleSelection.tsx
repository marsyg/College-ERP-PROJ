'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export type RoleType = {
  value: 'student' | 'faculty' | 'admin';
  label: string;
  description: string;
  nextPath: string;
}

const roles: RoleType[] = [
  {
    value: 'student',
    label: 'Student',
    description: 'Register as a student to access student resources',
    nextPath: '/auth/signup/student'
  },
  {
    value: 'faculty',
    label: 'Faculty',
    description: 'Register as faculty to access faculty resources',
    nextPath: '/auth/signup/faculty'
  },
  {
    value: 'admin',
    label: 'Admin',
    description: 'Register as admin to access administrative tools',
    nextPath: '/auth/signup/admin'
  }
];

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const router = useRouter();

  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      router.push(selectedRole.nextPath);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Choose Your Role</h2>
      <div className="space-y-4">
        {roles.map((role) => (
          <div
            key={role.value}
            onClick={() => handleRoleSelect(role)}
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              selectedRole?.value === role.value
                ? 'bg-blue-100 border-blue-500 border-2'
                : 'hover:bg-gray-50'
            }`}
          >
            <h3 className="font-semibold">{role.label}</h3>
            <p className="text-gray-600">{role.description}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleContinue}
        disabled={!selectedRole}
        className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
