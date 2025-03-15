import InputLabel from '@/modules/auth/components/InputLabel'
import TextInput from '@/modules/auth/components/TextInput'
import Modal from '@/shared/components/Modal'
import AuthLayout from '@/shared/layouts/AuthLayout'
import { usePage } from '@inertiajs/react'
import { useRef, useState } from 'react'
import Tbody from '../components/Tbody'
import Thead from '../components/Thead'

export default function Project({ project, sections: sec }) {
  const [collapsedSections, setCollapsedSections] = useState(() => {
    const initialState = []

    sec.map((section) => {
      initialState[section.section.name] = false
    })

    return initialState
  })

  const containerRef = useRef(null)
  const { collaborators } = usePage().props
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const sections = [
    {
      id: 'ready-to-start',
      name: 'Listo para empezar 🔥',
      tasks: [
        {
          id: 1,
          name: 'loading cuando carga alguna sección',
          assignee: 'g',

          complete: false,
        },
        { id: 2, name: 'modal editar tarea', assignee: 'g', complete: false },
        { id: 3, name: 'modal crear proyecto', assignee: 'g', complete: false },
        { id: 4, name: 'modal crear tarea', assignee: 'g', complete: false },
        {
          id: 5,
          name: 'animaicon aparece y deaparece proyectos',
          assignee: 'al',

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

          complete: false,
        },
        {
          id: 7,
          name: 'Optimización de rendimiento',
          assignee: 'al',

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

          complete: false,
        },
        {
          id: 9,
          name: 'Integración con API backend',
          assignee: 'al',

          complete: false,
        },
      ],
    },
    {
      id: 'in-review',
      name: 'En revisión',
      icon: '🔍',
      tasks: [
        { id: 10, name: 'Diseño responsive', assignee: 'g', complete: false },
        { id: 11, name: 'Validación de datos', assignee: 'al', complete: false },
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

          complete: false,
        },
        { id: 13, name: 'Menú de navegación', assignee: 'al', complete: false },
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

          complete: true,
        },
        { id: 15, name: 'Wireframes iniciales', assignee: 'al', complete: true },
      ],
    },
  ]

  const toggleSection = (sectionName) => {
    setCollapsedSections({
      ...collapsedSections,
      [sectionName]: !collapsedSections[sectionName],
    })
  }

  return (
    <>
      <AuthLayout>
        <div
          ref={containerRef}
          className="w-full flex flex-col justify-start items-start  rounded-xl  container-glass gap-4 h-full"
        >
          {/* header */}
          <div className="flex items-center justify-between p-4 w-full bg-gray-900 ">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">{project.name}</h1>
            </div>
          </div>

          {/* body */}
          <div className="overflow-x-auto w-full h-full p-3 bg-black/60">
            <table className="w-full border-collapse">
              <Thead />
              <Tbody
                openModal={openModal}
                sections={sec}
                toggleSection={toggleSection}
                collapsedSections={collapsedSections}
              />
            </table>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="text-white flex flex-col justify-start items-start w-full">
            <h2 className="self-center text-3xl">Nueva Tarea</h2>
            {/* nombre tarea */}
            <div className="flex justify-between items-center gap-10 my-5 w-full">
              <TextInput
                id="name"
                type="text"
                name="password"
                className="name mt-1 block w-full text-white bg-slate-400/30"
              />
            </div>

            {/* responsable */}
            <div className="flex justify-between items-center gap-10 my-5 w-full">
              <InputLabel
                className="text-white w-[100px]"
                htmlFor="responsable"
                value="Responsable"
              />
              <select
                id="responsable"
                name="responsable"
                className="name mt-1 block w-full text-white bg-slate-400/30 rounded-md border-white/80"
              >
                {collaborators.map((collaborator) => (
                  <option className="bg-gray-700" key={collaborator.id} value={collaborator.id}>
                    {collaborator.name}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {collaborator.email}
                  </option>
                ))}
              </select>
            </div>

            {/* fecha entrga */}
            <div className="flex justify-between items-center gap-10 my-5 w-full">
              <InputLabel
                className="text-white w-[100px]"
                htmlFor="responsable"
                value="Fecha de entrega"
              />
              <TextInput
                id="name"
                type="date"
                name="date"
                className="name mt-1 block w-full text-white bg-slate-400/30"
              />
            </div>

            {/* secciones asignables */}
            <div className="flex justify-between items-center gap-10 my-5 w-full">
              <InputLabel className="text-white w-[100px]" htmlFor="section" value="Sección" />
              <select
                id="section"
                name="section"
                className="name mt-1 block w-full text-white bg-slate-400/30 rounded-md border-white/80"
              >
                {sec.map((section) => (
                  <option
                    className="bg-gray-700"
                    key={section.section.id}
                    value={section.section.id}
                  >
                    {section.section.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Modal>
      </AuthLayout>
    </>
  )
}
