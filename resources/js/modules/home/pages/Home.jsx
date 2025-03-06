import AuthLayout from '@/shared/layouts/AuthLayout'

export default function Home({ auth }) {
  return (
    <>
      <AuthLayout>
        <div className="h-full w-full rounded-xl bg-layout-gray/20 p-3 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-lg">
          Main
        </div>
      </AuthLayout>
    </>
  )
}
