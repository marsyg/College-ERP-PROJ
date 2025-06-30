import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Get the token from the request
  const token = await getToken({ req: request });

  // Define role-based route protection
  const roleProtectedRoutes = {
    '/admin': ['admin'],
    '/dashboard': ['user', 'admin'],
    '/settings': ['admin']
  };

  // Get the current path
  const path = request.nextUrl.pathname;

  // Check if the route is protected
  if (roleProtectedRoutes[path]) {
    // If no token, redirect to sign in
    if (!token) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // If token exists but role doesn't match, show error
    if (!roleProtectedRoutes[path].includes(token.role)) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return NextResponse.next();
}

// Define which routes to protect
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
