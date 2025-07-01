'use client';

import BaseSignUpForm from '@/components/AuthComnponents/SignUpComponents/BaseSignUpForm';
import { roles } from '@/types/role.types';

export default function StudentSignUpForm() {
  const studentFields = (
    <div>
      <label htmlFor="studentId" className="block text-sm font-medium mb-1">
        Student ID
      </label>
      <input
        type="text"
        id="studentId"
        name="studentId"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );

  return (
    <BaseSignUpForm
      role={roles.find(r => r.value === 'student')!}
      additionalFields={studentFields}
    />
  );
}