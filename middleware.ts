import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Matcher for the routes you want to protect
// const isProtectedRoute = createRouteMatcher(["/user-profile"]);

// Matcher for the routes you want to make public.
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

// export default clerkMiddleware(async (auth, req) => {
//   // if (!isProtectedRoute(req)) await auth.protect();
//   if (!isPublicRoute(req)) await auth.protect();
// });

export default clerkMiddleware(async (auth, req) => {
  console.log("Auth :", auth)
  const { userId, redirectToSignIn } = await auth();
  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};