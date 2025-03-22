import { SignInButton, SignOutButton } from "@clerk/nextjs";

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
          </div>
        </div>
      </div>
    </nav>
  );
};