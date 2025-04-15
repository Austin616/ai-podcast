import { SignIn } from '@clerk/nextjs';

const Page = () => {
  return (
    <div className="flex-center glassmorphism-auth h-screen w-full flex-col gap-4">
      <SignIn
        signUpUrl="/sign-up" 
      />
    </div>
  );
};

export default Page;
