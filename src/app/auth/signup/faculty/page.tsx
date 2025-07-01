'use client';

import BaseSignUpForm from '@/components/AuthComnponents/SignUpComponents/BaseSignUpForm';
import { roles } from '@/types/role.types';
import { useState } from 'react';

export default function FacultySignUpForm() {
    const [facultyId, setFacultyId] = useState('');

  const facultyFields = (
    <div>
      <label htmlFor="facultyId" className="block text-sm font-medium mb-1">
        Faculty ID
      </label>
      <input
        type="text"
        id="facultyId"
        name="facultyId"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        value={facultyId}
        onChange={(e) => setFacultyId(e.target.value)}
      />
    </div>
  );

  return (
    <BaseSignUpForm
      role={roles.find(r => r.value === 'faculty')!}
      additionalFields={{facultyId}}
    />
  );
}