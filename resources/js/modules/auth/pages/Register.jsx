import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/modules/auth/components/InputError'
import InputLabel from '@/modules/auth/components/InputLabel'
import TextInput from '@/modules/auth/components/TextInput'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const submit = (e) => {
    e.preventDefault()

    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    })
  }

  return (
    <GuestLayout>
      <Head title="Register" />

      <section className="flex flex-col justify-center items-center gap-10 p-5">
        <header className="flex flex-col justify-center items-center gap-3">
          <h1 className="text-3xl">Te damos la bienvenida a tu </h1>
          <h2 className="text-2xl">Gestor de Proyectos</h2>

          <h3 className="text-lg  pt-4">Para comenzar, inicia sesión</h3>
        </header>
        <main className="container-glass rounded-xl p-10 w-fit h-fit border border-white">
          <form onSubmit={submit}>
            <div>
              <InputLabel className="text-white" htmlFor="name" value="Name" />

              <TextInput
                id="name"
                name="name"
                value={data.name}
                className="mt-1 block w-full text-black"
                autoComplete="name"
                isFocused={true}
                onChange={(e) => setData('name', e.target.value)}
                required
              />

              <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="mt-4">
              <InputLabel className="text-white" htmlFor="email" value="Email" />

              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full text-black"
                autoComplete="username"
                onChange={(e) => setData('email', e.target.value)}
                required
              />

              <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mt-4">
              <InputLabel className="text-white" htmlFor="password" value="Password" />

              <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full text-black"
                autoComplete="new-password"
                onChange={(e) => setData('password', e.target.value)}
                required
              />

              <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-4">
              <InputLabel
                className="text-white"
                htmlFor="password_confirmation"
                value="Confirm Password"
              />

              <TextInput
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                className="mt-1 block w-full text-black"
                autoComplete="new-password"
                onChange={(e) => setData('password_confirmation', e.target.value)}
                required
              />

              <InputError message={errors.password_confirmation} className="mt-2" />
            </div>

            <div className="mt-4 flex items-center flex-col">
              <button
                className="my-2 w-full bg-white text-black rounded-md px-4 py-1 transition-transform duration-200 hover:scale-105 active:scale-95"
                disabled={processing}
              >
                Registrarse
              </button>
              <Link href={route('login')} className="rounded-md text-sm hover:text-white/35">
                ¿Ya registrado?
              </Link>
            </div>
          </form>
        </main>
      </section>
    </GuestLayout>
  )
}
