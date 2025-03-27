import { EditProjectModal } from '@/modules/projects_and_tasks/components/EditProjectModal'
import AuthLayout from '@/shared/layouts/AuthLayout'
import { router, useForm, usePage } from '@inertiajs/react'
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
  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false)
  const containerRef = useRef(null)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const openEditProjectModal = () => setIsEditProjectModalOpen(true)
  const closeEditProjectModal = () => setIsEditProjectModalOpen(false)

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

  const { data, setData, processing, errors, patch } = useForm({
    name: project.name,
    description: project.description,
    color_icon: project.color_icon,
  })

  const handleEditProjectSubmit = (e) => {
    e.preventDefault()

    patch(route('project.update', { id: project.id }), {
      onSuccess: () => {
        closeEditProjectModal()
      },
    })
  }

  return (
    <>
      <AuthLayout>
        <div
          ref={containerRef}
          className="w-full flex flex-col justify-start items-start  rounded-xl container-glass gap-4 h-full"
        >
          {/* header */}
          <div className="flex items-center justify-between p-4 w-full bg-gray-900 ">
            <div className="flex items-center gap-3">
              <div
                onClick={openEditProjectModal}
                className="min-w-5 size-5 rounded-md cursor-pointer"
                style={{ backgroundColor: project.color_icon }}
              />
              <h1 className="text-xl font-bold text-white">{project.name}</h1>

              <button
                className="hidden md:block my-2 w-fit bg-blue-900/80 text-white rounded-md px-4 py-1 transition-transform duration-200 hover:scale-105 active:scale-95"
                onClick={openEditProjectModal}
              >
                Editar
              </button>
            </div>
          </div>

          {/* body */}
          <div className="overflow-x-scroll scrollbar-custom w-full h-full p-3 bg-black/60">
            <table className="overflow-x-scroll scrollbar-custom w-full border-collapse">
              <Thead filters={filters} projectId={project.id} />
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

      <EditProjectModal
        isModalOpen={isEditProjectModalOpen}
        openModal={openEditProjectModal}
        closeModal={closeEditProjectModal}
        handleSubmit={handleEditProjectSubmit}
        setData={setData}
        processing={processing}
        data={data}
        errors={errors}
        openDeleteProject={openModal}
        is_project_owner={is_project_owner}
      />

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
