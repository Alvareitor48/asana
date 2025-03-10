import Checkbox from '@/Components/Checkbox'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const submit = (e) => {
    e.preventDefault()

    post(route('login'), {
      onFinish: () => reset('password'),
    })
  }

  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

      <section className="flex flex-col justify-center items-center gap-10 p-5">
        <header className="flex flex-col justify-center items-center gap-3">
          <h1 className="text-3xl">Te damos la bienvenida a tu </h1>
          <h2 className="text-2xl">Gestor de Proyectos</h2>

          <h3 className="text-lg  pt-4">Para comenzar, inicia sesión</h3>
        </header>

        <main className="container-glass rounded-xl p-10 w-fit h-fit border border-white">
          <form onSubmit={submit}>
            <div>
              <InputLabel className="text-white" htmlFor="email" value="Correo electrónico" />

              <TextInput
                id="email"
                type="email"
                name="email"
                value={data.email}
                className="mt-1 block w-full text-black"
                autoComplete="username"
                isFocused={true}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="pepemayol@hot..."
              />

              <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mt-4">
              <InputLabel className="text-white" htmlFor="password" value="Contraseña" />

              <TextInput
                id="password"
                type="password"
                name="password"
                value={data.password}
                className="mt-1 block w-full text-black"
                autoComplete="current-password"
                onChange={(e) => setData('password', e.target.value)}
              />

              <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-4 block">
              <label className="flex items-center">
                <Checkbox
                  name="remember"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                />
                <span className="ms-2 text-sm text-white/50">Recuerdame</span>
              </label>
            </div>

            <div className="mt-4 flex items-center flex-col">
              <button
                className="mb-2 w-full bg-white text-black rounded-md px-4 py-1 transition-transform duration-200 hover:scale-105 active:scale-95"
                disabled={processing}
              >
                Iniciar sesión
              </button>

              {canResetPassword && (
                <Link
                  href={route('password.request')}
                  className="rounded-md text-sm text-white underline hover:text-white/35 focus:outline-none"
                >
                  ¿Contraseña olvidada?
                </Link>
              )}
              <Link
                href={route('register')}
                className=" pt-3 rounded-md text-sm text-white underline hover:text-white/35 focus:outline-none"
              >
                ¿Primera vez?
              </Link>
            </div>
          </form>
        </main>
      </section>
    </GuestLayout>
  )
}
