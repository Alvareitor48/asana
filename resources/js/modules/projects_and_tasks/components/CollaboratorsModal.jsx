import Avatar from '@/shared/components/Avatar'
import { router, usePage } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'
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
  const { props } = usePage()
  const sessionResults = props.searchResults || []
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (sessionResults.length > 0) {
      setResults(sessionResults)
    }
  }, [sessionResults])

  const handleSearch = (e) => {
    const query = e.target.value
    setSearch(query)

    clearTimeout(timeoutRef.current)

    if (query.length > 1) {
      timeoutRef.current = setTimeout(() => {
        router.post(
          route('users.search', { project: projectId }),
          { search: query },
          {
            preserveScroll: true,
          }
        )
      }, 300)
    } else {
      setResults([])
    }
  }

  const handleAddCollaborator = (userId) => {
    router.post(
      route('project.collaborators.add', { project: projectId }),
      { user_id: userId },
      {
        preserveScroll: true,
        onSuccess: () => {
          setSearch('')
          setResults([])
        },
      }
    )
  }
  const handleRemoveCollaborator = (userId) => {
    router.delete(
      route('project.collaborators.remove', {
        project: projectId,
        user: userId,
      }),
      {
        preserveScroll: true,
      }
    )
  }
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="text-white flex flex-col justify-start items-start w-full h-[600px] overflow-y-scroll scrollbar-custom">
          <h2 className="self-center text-3xl">Colaboradores</h2>
          <hr />

          <div className="w-full my-4">
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Buscar usuario por nombre o email..."
              className="w-full px-3 py-2 rounded bg-slate-700 text-white border border-gray-500"
            />

            {results.length > 0 && (
              <div className="mt-2 bg-slate-800 border border-gray-600 rounded-md">
                {results.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between items-center p-2 hover:bg-slate-700 cursor-pointer"
                    onClick={() => handleAddCollaborator(user.id)}
                  >
                    <div>
                      <span className="block text-white">{user.name}</span>
                      <span className="text-sm text-white/50">{user.email}</span>
                    </div>
                    <button className="text-green-400">Añadir</button>
                  </div>
                ))}
              </div>
            )}
          </div>

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

                  <CollaboratorDropdown
                    closeModal={closeModal}
                    handleRemove={() => handleRemoveCollaborator(collaborator.id)}
                    collaboratorId={collaborator.id}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </Modal>
    </>
  )
}
