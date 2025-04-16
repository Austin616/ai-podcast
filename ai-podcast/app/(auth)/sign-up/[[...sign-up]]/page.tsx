import { SignUp } from '@clerk/nextjs'

const Page = () => {
  return (
    <div className="flex-center glassmorphism-auth h-screen w-full">
      <SignUp 
        path="/sign-up" 
        signInUrl="/sign-in"  // Set the local sign-in page URL
        />
    </div>
  )
}

export default Page