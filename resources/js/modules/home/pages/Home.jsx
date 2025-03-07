import GlassCard from '@/shared/components/GlassCard'
import AuthLayout from '@/shared/layouts/AuthLayout'

export default function Home({ auth }) {
  return (
    <>
      <AuthLayout>
        <div className="h-full w-full rounded-xl p-3 container-glass grid grid-cols-1 md:grid-cols-2 gap-4 min-h-fit">
          {/*  saludo */}
          <div className="md:col-span-2 w-full h-full flex justify-center items-center flex-col gap-4">
            <h1 className="text-6xl font-kalam text-center">Buenos días Señor Senior Alvaro 🫡</h1>
            <h3 className="text-3xl">Lunes 21 de Marzo del 2028</h3>
          </div>

          {/* mis tareas */}

          <GlassCard>
            <h3 className="text-3xl font-kalam">Mis Tareas</h3>
            <div className="w-full h-full border-t border-white p-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore qui ea corporis
              deserunt, at aut unde ex nihil corrupti molestias itaque quae illo ab eum quasi
              necessitatibus rem obcaecati accusamus.
            </div>
          </GlassCard>

          {/* personas */}
          <GlassCard>
            <h3 className="text-3xl font-kalam">Mis compañeros</h3>
            <div className="w-full h-full border-t border-white p-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore qui ea corporis
              deserunt, at aut unde ex nihil corrupti molestias itaque quae illo ab eum quasi
              necessitatibus rem obcaecati accusamus.
            </div>
          </GlassCard>

          {/* proyectos */}
          <GlassCard customClass="md:col-span-2">
            <h3 className="text-3xl font-kalam">Mis Proyectos</h3>
            <div className="w-full h-full border-t border-white p-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore qui ea corporis
              deserunt, at aut unde ex nihil corrupti molestias itaque quae illo ab eum quasi
              necessitatibus rem obcaecati accusamus.
            </div>
          </GlassCard>
        </div>
      </AuthLayout>
    </>
  )
}
