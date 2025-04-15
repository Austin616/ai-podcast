import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);

export default clerkMiddleware((auth, req) => {
  // If the user is not on a public route, check if they're authenticated
  if (!isPublicRoute(req) && !auth().userId) {
    // Redirect unauthenticated users to the custom sign-in page
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
  // If they're authenticated, proceed as normal
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
