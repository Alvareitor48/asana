import AuthLayout from '@/shared/layouts/AuthLayout'
import { router } from '@inertiajs/react'
import { useRef, useState } from 'react'
import { DeleteProjectModal } from '../components/DeleteProjectModal'
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

  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef(null)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const toggleSection = (sectionName) => {
    setCollapsedSections({
      ...collapsedSections,
      [sectionName]: !collapsedSections[sectionName],
    })
  }

  const handleSubmit = (projectId) => {
    router.delete(route('project.destroy', { id: projectId }), {
      onSuccess: () => {
        setIsModalOpen(false)
      },
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
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-md" style={{ backgroundColor: project.color_icon }} />
              <h1 className="text-xl font-bold text-white">{project.name}</h1>
              <button onClick={openModal}>❌</button>
            </div>
          </div>

          {/* body */}
          <div className="overflow-x-auto w-full h-full p-3 bg-black/60">
            <table className="w-full border-collapse">
              <Thead />
              <Tbody
                sections={sec}
                toggleSection={toggleSection}
                collapsedSections={collapsedSections}
                projectId={project.id}
              />
            </table>
          </div>
        </div>
      </AuthLayout>
      <DeleteProjectModal
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
        project={project}
        handleSubmit={handleSubmit}
      />
    </>
  )
}
