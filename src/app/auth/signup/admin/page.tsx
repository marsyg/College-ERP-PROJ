'use client';

import { useState } from 'react';

import BaseSignUpForm from '@/components/AuthComnponents/SignUpComponents/BaseSignUpForm';
import { roles } from '@/types/role.types';

export default function AdminSignUpForm() {
    const [adminId, setAdminId] = useState('');

  const adminFields = (
    <div>
      <label htmlFor="adminId" className="block text-sm font-medium mb-1">
        Admin ID
      </label>
      <input
        type="text"
        id="adminId"
        name="adminId"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        value={adminId}
        onChange={(e) => setAdminId(e.target.value)}
      />
    </div>
  );

  return (
    <BaseSignUpForm
      role={roles.find(r => r.value === 'admin')!}
      additionalFields={{adminId}}
    />
  );
}