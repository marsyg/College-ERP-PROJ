export type RoleValue = 'student' | 'faculty' | 'admin';

export interface RoleType {
  value: RoleValue;
  label: string;
  description: string;
  nextPath: string;
}

export const roles: RoleType[] = [
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
