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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-[var(--foreground)]">
              Next.js App
            </h1>
          </div>

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
        </div>
      </div>
    </nav>
  );
};