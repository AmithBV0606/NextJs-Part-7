# Next-Js by Codevolution : Part-7 (last part)

### Topics Covered :

- Authentication
- Clerk Setup
- Sign in and Sign out
- Profile Settings
- Conditional UI Rendering
- Protecting Routes
- Read Session and User Data
- Role Based Access Control
- Customizing Clerk Components

## Authentication

- Most apps revolve around users.

- When building for users, we need to consider three fundamental concepts :

    - **Identity** : Verifying who someone is, through authentication.
    - **Sessions** : Keep track of a user's logged-in state across requests.
    - **Access** : Controls what they can do.

- In developers term, we call these authentication, session management and authorization.

- With React single-page apps, you're only dealing with client-side code.

- With Next.js, you've got to protect your app from three different angles: client-side, server-side and API routes.

- When implementing authentication, you will typically want to :

    1. Let users sign up
    2. Give them a way to sign in
    3. Enable them to manage their account (password changes, email updates, etc.)
    4. Show or hide UI elements based on whether they're logged in
    5. Protect certain routes depending on authentication status
    6. Access session and user data when needed
    7. Set up role-based access control (admin, editor, viewer, and so on)
    8. Provide a way to sign out

## Clerk Setup

- Visit `https://clerk.com/` and create an account if you don't have already one.

- Create an application by entering the application name and the methods through which you want your users to login/signup through (GitHub, Google, Email, username, etc).

- After creating an application, choose the framework in which you are building the project on.

- In this case I've selected Next.js

### Steps to integrate Clerk with Next.js

1. Install `@clerk/nextjs` : Run the following command to install the SDK :

```bash
npm install @clerk/nextjs
```

2. **Set your Clerk API keys :** Add these keys to your `.env` or create the file if it doesn't exist. Retrieve these keys anytime from the API keys page.

<img src="./assets/Pic-1.png" />

3. **Update `middleware.ts` :**

- Update your middleware file, or create one at the root of your project, or the `src/ directory` if you're using a `src/ directory` structure.

- The clerkMiddleware helper enables authentication and is where you'll configure your protected routes.

```ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

4. **Add ClerkProvider to your app :**

- The `ClerkProvidercomponent` provides Clerk's authentication context to your app. It's recommended to wrap your entire app at the entry point with `ClerkProvider` to make authentication globally accessible.

- Copy and paste the following file into your layout.tsx file. This creates a header with Clerk's prebuilt components to allow users to sign in and out.

```tsx
import { type Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Clerk Next.js Quickstart',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
```

5. **Create your first user :**

- Run your project. Then, visit your app's homepage at http://localhost:3000 and sign up to create your first user.

```bash
npm run dev
```

## Sign in and Sign out

- The good thing about clerk is that it provides pre-built components that handle all the authentication flows for us.

- You can use `SignInButton` and `SignOutButton` component to Signin or Signout the user.

- Refer `components/navigation.tsx` and `/app/layout.tsx` files.

## Profile Settings 

- We have signin button and signout button components for signing in and signing out.

- But for signing out clerk prrovides even more nicer component called `UserButton` component.

- This component creates an user avatar, by clicking on which it opens a modal, using which we can edit our profiles/account.

- If we want to have a seperate profile page settings page and not a modal, clerk provides us a profile component that we can embed in optional catch-all routes.

### Demo 

```js
// components/navigation.tsx

import { SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const Navigation = () => {
  return (
    <nav className="bg-[var(--background)] border-b-2 border-[var(--foreground)]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-[var(--foreground)]">
              Next.js App
            </h1>
          </div>

          <div className="flex items-center gap-4 cursor-pointer">
            {/* Signin button goes here */}
            <SignInButton mode="modal" />
            <SignOutButton />
            <UserButton />
            <Link href={"/user-profile"}>Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
```

```js
// app/user-profile/[[...user-profile]]/page.tsx

import { UserProfile } from "@clerk/nextjs";

export default function UserProfilePage() {
  return (
    <div className="flex justify-center items-center py-8">
      <UserProfile path="/user-profile" />
    </div>
  );
}
```

## Conditional UI Rendering

- Here we'll be learning how to conditionally render UI elements, based on the user's authentication state.

- Clerk makes this super easy with two special components `SignedIn` and `Signedout` elements.

- Refer `components/navigation.tsx`.

```js
import {
  SignInButton,
  SignOutButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Link from "next/link";

export const Navigation = () => {
  return (
    <nav className="bg-[var(--background)] border-b-2 border-[var(--foreground)]/20">
        <div className="flex items-center gap-4 cursor-pointer">
            {/* Signin button goes here */}
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>

            <SignedIn>
              <SignOutButton />
              <UserButton />
              <Link href={"/user-profile"}>Profile</Link>
            </SignedIn>
          </div>
    </nav>
  );
};
```

## Protecting Routes

- Here we'll be protecting the routes by restricting the access of unauthenticated users.

- For example if the user is logged out, he/she shouldn't be able to access any routes, unless they login back.

- We'll be writting this logic in `middleware.ts` file.

```ts
// middleware.ts

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Matcher for the routes you want to protect
const isProtectedRoute = createRouteMatcher(["/user-profile"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
```

## Read Session and User Data

- When building web applications we often need to access user and session data, to personalize experiences and track user actions with their account.

- To read user and session data Clerk provides 2 helper methods i.e "auth" and "currentUser". These methods only works in server components and not on client components.

```ts
// dashboard/page.tsx

import { auth, currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const authObj = await auth();
  const userObj = await currentUser();

  console.log("Auth Object", authObj);
  console.log("User Object", userObj);

  return <div>Dashboard page!!</div>;
}
```

- In-order to read the same data given by "auth" and "currentUser", we have hooks such as `useAuth` and `useUser` hooks.

```ts
"use client";

import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

export const Counter = () => {
  const [count, setCount] = useState(0);

  //   const { isLoaded, userId, sessionId, getToken } = useAuth();

  //   if (!isLoaded || !userId) {
  //     return null;
  //   }

  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div>
      <p>Count : {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

```

- `useAuth` : You can rely on this hook when you just need user ID to personalize the experiences or associate data with the user.

- `useUser` : use this hook only when you need full user object.

- Refer `app/dashboard/page.tsx`, `components/counter.tsx` and `app/page.tsx` files.

## Role Based Access Control

### User roles and permissions

- Most apps need more than just checking if someone's logged in or not.

- They need different permission levels for different users.

- How to implement role-based access control(RBAC) using clerk?

<ins>**Configure the session token**</ins> : Configuring Clerk to make user roles available in our session token  

  - Clerk gives us something called user metadata, which is like a storage space for extra user information.
  - We'll use it to store user roles.
  - publicMetadata because it's read-only in the browser, making it super secure for storing sensitive information like user roles.
  - To build a basic RBAC system, we need to make sure this publicMetadata is readily available in the session token.
  - We can quickly check user roles without having to make extra network requests every time we need this information.

### Demo

**Step 1** : Open the Clerk dashboard and select "Sessions" under onfigure section.

**Step 2** : Under the "Customize session token" block, clieck "Edit" button.

**Step 3** : In the modal that opens after clicking the "Edit" button, Add the json with the following key and value and click on "Save" button : 

```json
{ 
  "metadata": "{{user.public_metadata}}" 
}
```

**Step 4** : We need to create a global typescript definition to work with roles. In the root directory, create a folder named `types` and a file called `global.d.ts`.

```ts
// This makes this file a module
export {};

// Define the roles available in your app. For example a social media app where moderators can moderate thr content and the admin can manage moderators.
export type Roles = "admin" | "moderator";

// Extend clerk's session token type globally : This will provide auto completion and prevent typescript errors, when working with roles throughout our application.
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
```

**Step 5** : We have to manually add the admin role to our own user or to yourself.

  - In the Clerk's dashboard, navigate to users tab. 
  - Click on the user you've chosen to make admin.
  - You'll be redirected to a page with all the information about the user that you've chosen.
  - Under the "Metadata" section, Click "Edit" button next to "public" option.
  - Update the JSON to `{ "role": "admin" }` and click on "Save" button.

**Step 6** : Define and protect a new admin route `app/admin/page.tsx`.

```ts
export default function Admin() {
    return <h1>Admins only page</h1>
}
```

**Step 7** To view this page i.e `app/admin/page.tsx`, you not only have to be signed in, but alos needs to be admin. To protect this route we need to apply Role Based Access Control(RBAC) in our `middlewarw.ts` file.

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (
    isAdminRoute(req) &&
    (await auth()).sessionClaims?.metadata?.role !== "admin"
  ) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
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
```

**NOTE :** To check if the RBAC is working properly, Change the role of the user, who was previously made "admin", from "admin" to "moderator" in Clerk dashboard, under users section. The try to access `app/admin/page.tsx` route, you'll be redirected to home page.

**Step 8** : OffCourse manually adding roles to users is not scalable. In real world application an admin will want to be able to manage the user roles. So we need to create **Server Actions** to manage user roles. `Create action.ts` file inside `admin` folder.

```ts
"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { Roles } from "@/types/globals";
import { revalidatePath } from "next/cache";

export async function setRole(formData: FormData) {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Not authorized!!");
  }

  const client = await clerkClient();
  const id = formData.get("id") as string;
  const role = formData.get("role") as Roles;

  try {
    await client.users.updateUser(id, {
      publicMetadata: { role },
    });
    revalidatePath("/admin");
  } catch {
    throw new Error("Failed to set role");
  }
}

export async function removeRole(formData: FormData) {
  const { sessionClaims } = await auth();

  if (sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Not authorized!!");
  }

  const client = await clerkClient();
  const id = formData.get("id") as string;

  try {
    await client.users.updateUser(id, {
      publicMetadata: { role: null },
    });
    revalidatePath("/admin");
  } catch {
    throw new Error("Failed to remove role");
  }
}
```

**Step 9** : Flush out the `admin/page.tsx` page to let admins manage user roles from the User Interface(UI).

- Refer `admin/page.tsx` file.