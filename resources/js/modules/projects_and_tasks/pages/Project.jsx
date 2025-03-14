import AuthLayout from '@/shared/layouts/AuthLayout'
import { useState } from 'react'
import Tbody from '../components/Tbody'
import Thead from '../components/Thead'

export default function Project({ project }) {
  const [collapsedSections, setCollapsedSections] = useState({
    'ready-to-start': false,
    'not-started': true,
    'in-progress': true,
    'in-review': true,
    'needs-changes': true,
    completed: true,
  })

  const sections = [
    {
      id: 'ready-to-start',
      name: 'Listo para empezar',
      icon: '🔥',
      tasks: [
        {
          id: 1,
          name: 'loading cuando carga alguna sección',
          assignee: 'g',
          priority: 'Baja',
          complete: false,
        },
        { id: 2, name: 'modal editar tarea', assignee: 'g', priority: 'Alta', complete: false },
        { id: 3, name: 'modal crear proyecto', assignee: 'g', priority: 'Baja', complete: false },
        { id: 4, name: 'modal crear tarea', assignee: 'g', priority: 'Media', complete: false },
        {
          id: 5,
          name: 'animaicon aparece y deaparece proyectos',
          assignee: 'al',
          priority: 'Sin prioridad',
          complete: false,
        },
      ],
    },
    {
      id: 'not-started',
      name: 'No empezar',
      icon: '🔴',
      tasks: [
        {
          id: 6,
          name: 'Implementación de animaciones avanzadas',
          assignee: 'g',
          priority: 'Baja',
          complete: false,
        },
        {
          id: 7,
          name: 'Optimización de rendimiento',
          assignee: 'al',
          priority: 'Media',
          complete: false,
        },
      ],
    },
    {
      id: 'in-progress',
      name: 'En proceso',
      icon: '🚀',
      tasks: [
        {
          id: 8,
          name: 'Desarrollo de componentes UI',
          assignee: 'g',
          priority: 'Alta',
          complete: false,
        },
        {
          id: 9,
          name: 'Integración con API backend',
          assignee: 'al',
          priority: 'Alta',
          complete: false,
        },
      ],
    },
    {
      id: 'in-review',
      name: 'En revisión',
      icon: '🔍',
      tasks: [
        { id: 10, name: 'Diseño responsive', assignee: 'g', priority: 'Media', complete: false },
        { id: 11, name: 'Validación de datos', assignee: 'al', priority: 'Alta', complete: false },
      ],
    },
    {
      id: 'needs-changes',
      name: 'Requieren cambios',
      icon: '🔧',
      tasks: [
        {
          id: 12,
          name: 'Modal de autenticación',
          assignee: 'g',
          priority: 'Alta',
          complete: false,
        },
        { id: 13, name: 'Menú de navegación', assignee: 'al', priority: 'Media', complete: false },
      ],
    },
    {
      id: 'completed',
      name: 'Completado',
      icon: '✅',
      tasks: [
        {
          id: 14,
          name: 'Configuración de repositorio Git',
          assignee: 'g',
          priority: 'Alta',
          complete: true,
        },
        { id: 15, name: 'Wireframes iniciales', assignee: 'al', priority: 'Media', complete: true },
      ],
    },
  ]

  const toggleSection = (sectionId) => {
    setCollapsedSections({
      ...collapsedSections,
      [sectionId]: !collapsedSections[sectionId],
    })
  }

  return (
    <>
      <AuthLayout>
        <div className="w-full flex flex-col justify-start items-start  rounded-xl  container-glass gap-4 h-full">
          {/* header */}
          <div className="flex items-center justify-between p-4 w-full bg-gray-900">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">{project.name}</h1>
            </div>
          </div>

          {/* body */}
          <div className="overflow-x-auto w-full h-full p-3 bg-black/60">
            <table className="w-full border-collapse">
              <Thead />
              <Tbody
                sections={sections}
                toggleSection={toggleSection}
                collapsedSections={collapsedSections}
              />
            </table>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}
