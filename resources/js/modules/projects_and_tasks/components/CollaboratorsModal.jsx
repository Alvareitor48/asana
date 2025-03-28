import Avatar from '@/shared/components/Avatar'
import Modal from '../../../shared/components/Modal'
import { CollaboratorDropdown } from './CollaboratorDropdown'

export const CollaboratorsModal = ({
  setData,
  processing,
  errors,
  isModalOpen,
  closeModal,
  handleSubmit,
  data,
  openDeleteProject,
  is_project_owner,
  collaborators,
  projectId,
}) => {
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="text-white flex flex-col justify-start items-start w-full h-[600px] overflow-y-scroll scrollbar-custom">
          <h2 className="self-center text-3xl">Colaboradores</h2>
          <hr />
          {/*  <form onSubmit={handleSubmit} className="w-full h-fit">
          <div className="flex-col justify-between items-center gap-10 my-5 w-full">
            <InputLabel
              className="text-white w-[100px]"
              htmlFor="responsable"
              value="Invitación por email"
            />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="mt-1 block w-full text-white bg-slate-400/30"
            />
          </div>
          {errors.email && <p className="text-red-500 text-center">{errors.email}</p>}
          <button
            disabled={processing}
            className="mb-2 w-fit content-end bg-white text-black rounded-md px-4 py-1 transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            {processing ? 'Invitando...' : 'Invitar'}
          </button>
        </form> */}

          <hr />
          <h3 className="self-center text-3xl">Miembros</h3>

          <div className="flex-col p-2 md:p-10 justify-between items-center my-5 w-full">
            {collaborators.map((collaborator) => {
              return (
                <div
                  key={collaborator.id}
                  className="flex w-full  space-y-5 justify-start items-center gap-10"
                >
                  <Avatar
                    clss="bg-green-500 min-w-[30px] size-[30px] text-2xl"
                    name={collaborator.name}
                  />
                  <div className="flex flex-col w-full">
                    <span>{collaborator.name}</span>
                    <span className="text-white/50">{collaborator.email}</span>
                  </div>

                  <CollaboratorDropdown closeModal={closeModal} collaboratorId={collaborator.id} />
                </div>
              )
            })}
          </div>
        </div>
      </Modal>
    </>
  )
}
