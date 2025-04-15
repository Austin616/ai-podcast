import { SignUp } from '@clerk/nextjs'

const Page = () => {
  return (
    <div className="flex-center glassmorphism-auth h-screen w-full">
      <SignUp 
       
        signInUrl="/sign-in"
        />
    </div>
  )
}

export default Page