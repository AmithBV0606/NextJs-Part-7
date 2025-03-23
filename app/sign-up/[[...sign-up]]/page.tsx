import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="h-screen w-full flex justify-center items-center py-8">
      <SignUp />
    </div>
  );
}