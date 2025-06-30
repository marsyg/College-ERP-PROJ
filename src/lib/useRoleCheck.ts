import { useSession } from 'next-auth/react';

export function useRoleCheck(requiredRoles: string[]) {
  const { data: session } = useSession();
  
  // Check if user has any of the required roles
  const hasRequiredRole = session?.user?.role && 
    requiredRoles.includes(session.user.role);
  
  return {
    hasRequiredRole,
    isLoading: !session,
    role: session?.user?.role
  };
}
