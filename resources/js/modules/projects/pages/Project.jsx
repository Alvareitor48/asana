import GlassCard from '@/shared/components/GlassCard'
import AuthLayout from '@/shared/layouts/AuthLayout'

export default function Project({ project }) {
  return (
    <>
      <AuthLayout>
        <div className="h-full w-full rounded-xl p-3 container-glass grid grid-cols-1 md:grid-cols-2 gap-4 min-h-fit">
          {/*  saludo */}
          <div className="md:col-span-2 w-full h-full flex justify-center items-center flex-col gap-4">
            <h1 className="text-6xl font-kalam text-center">Pestaña projecto</h1>
            <h3 className="text-3xl">Lunes 21 de Marzo del 2028</h3>
          </div>

          {/* mis tareas */}
          {project.map((section) => (
            <GlassCard>
              <h3 className="text-3xl font-kalam">{section.section}</h3>
              <div className="w-full h-full border-t border-white p-2">
                {section.tasks.map((task) => (
                  <div
                    key={`task-${task.id}-${task.title}`}
                    className="w-full h-fit border-b border-white p-2"
                  >
                    <h3 className="text-xl font-kalam">{task.title}</h3>
                    <p className="text-sm">{task.description}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </AuthLayout>
    </>
  )
}
