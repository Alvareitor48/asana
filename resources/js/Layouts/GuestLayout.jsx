import { BackgroundBeams } from '@/shared/components/BackgroundBeams'

export default function GuestLayout({ children }) {
  return (
    <div className="bg-auth w-full h-screen text-white overflow-x-hidden flex flex-col justify-center items-center">
      <BackgroundBeams />
      {children}
    </div>
  )
}
