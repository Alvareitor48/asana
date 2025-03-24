import { EditProjectModal } from '@/shared/components/EditProjectModal'
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

  const { data, setData, processing, errors, reset } = useForm({
    name: '',
    description: '',
    color_icon: '#000',
  })

  const handleEditProjectSubmit = (e) => {
    e.preventDefault()

    /*  post(route('project.store'), {
      onSuccess: () => {
        reset()
        setIsModalOpen(false)
      },
    }) */
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

              <button
                className='<button className="my-2 w-fit bg-blue-900/80 text-white rounded-md px-4 py-1 transition-transform duration-200 hover:scale-105 active:scale-95">'
                onClick={openEditProjectModal}
              >
                Editar
              </button>
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

      <EditProjectModal
        isModalOpen={isEditProjectModalOpen}
        openModal={openEditProjectModal}
        closeModal={closeEditProjectModal}
        project={project}
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
