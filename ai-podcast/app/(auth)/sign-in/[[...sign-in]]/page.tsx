import { SignIn } from '@clerk/nextjs';

const Page = () => {
  return (
    <div className="flex-center glassmorphism-auth h-screen w-full flex-col gap-4">
      <SignIn
        path="/sign-in" // Ensure the correct path for the sign-in page
        routing="path"  // Use path routing
        signUpUrl="/sign-up"  // Set the local sign-up page URL
      />
    </div>
  );
};

export default Page;
