import AuthLayout from '@/shared/layouts/AuthLayout'
import { router, usePage } from '@inertiajs/react'
import { useRef, useState } from 'react'
import { DeleteProjectModal } from '../components/DeleteProjectModal'
import Tbody from '../components/Tbody'
import Thead from '../components/Thead'

export default function Project({ project, sections: sec }) {
  const { is_project_owner, filters } = usePage().props
  const [collapsedSections, setCollapsedSections] = useState(() => {
    const initialState = []

    sec.map((section) => {
      initialState[section.section.id] = false
    })

    return initialState
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef(null)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const toggleSection = (sectionId) => {
    setCollapsedSections({
      ...collapsedSections,
      [sectionId]: !collapsedSections[sectionId],
    })
  }

  const handleSubmit = (projectId) => {
    is_project_owner &&
      router.delete(route('project.destroy', { id: projectId }), {
        onSuccess: () => {
          setIsModalOpen(false)
        },
        onError: () => {
          setIsModalOpen(false)
        },
      })
  }

  console.log(sec)

  return (
    <>
      <AuthLayout>
        <div
          ref={containerRef}
          className="w-full flex flex-col justify-start items-start  rounded-xl  container-glass gap-4 h-full"
        >
          {/* header */}
          <div className="flex items-center justify-between p-4 w-full bg-gray-900 ">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-md" style={{ backgroundColor: project.color_icon }} />
              <h1 className="text-xl font-bold text-white">{project.name}</h1>
              {is_project_owner && <button onClick={openModal}>❌</button>}
            </div>
            <button className="my-2 w-fit bg-white/60 text-black rounded-md px-4 py-1 transition-transform duration-200 hover:scale-105 active:scale-95">
              Añadir Filtro
            </button>
          </div>

          {/* body */}
          <div className="overflow-x-scroll w-full h-full p-3 bg-black/60">
            <table className="w-full border-collapse">
              <Thead filters={filters} />
              <Tbody
                filters={filters}
                sections={sec}
                toggleSection={toggleSection}
                collapsedSections={collapsedSections}
                projectId={project.id}
              />
            </table>
          </div>
        </div>
      </AuthLayout>
      {is_project_owner && (
        <DeleteProjectModal
          isModalOpen={isModalOpen}
          openModal={openModal}
          closeModal={closeModal}
          project={project}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  )
}
