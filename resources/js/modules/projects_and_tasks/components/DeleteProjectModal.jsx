import Modal from '@/shared/components/Modal'

export const DeleteProjectModal = ({ isModalOpen, closeModal, project, handleSubmit }) => {
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="text-white flex flex-col justify-start items-start w-full">
        <h2 className="self-center text-3xl">¿Deseas eliminar el proyecto "{project.name}"?</h2>
        <br />

        <p>Esta acción eliminará el proyecto, junto con lo siguiente:</p>
        <ul className="list-disc list-inside pl-5">
          <li>Tareas sin asignar que pertenecen únicamente a este proyecto</li>
          <li>Campos personalizados que pertenecen exclusivamente a este proyecto</li>
        </ul>
        <br />

        <div className="flex gap-4 mb-4">
          <button
            onClick={closeModal}
            className="px-3 py-1 rounded-lg border border-white/40 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
          >
            Cancelar
          </button>
          <button
            onClick={() => handleSubmit(project.id)}
            className="px-3 py-1 rounded-lg border border-white/40 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 bg-red-500"
          >
            Eliminar
          </button>
        </div>
        {/* nombre tarea */}
      </div>
    </Modal>
  )
}
