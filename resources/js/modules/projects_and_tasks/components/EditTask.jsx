import InputLabel from '@/modules/auth/components/InputLabel'
import TextInput from '@/modules/auth/components/TextInput'
import Modal from '@/shared/components/Modal'
import { usePage } from '@inertiajs/react'

const EditTask = ({
  errors,
  collaborators,
  data,
  isModalOpen,
  setIsModalOpen,
  setSelectedTask,
  reorderedSections,
  setData,
  reset,
}) => {
  const { filters: projectFilters } = usePage().props
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        setIsModalOpen(false)
        setSelectedTask(null)
        reset()
      }}
    >
      <div className="text-white flex flex-col justify-start items-start w-full">
        <h2 className="self-center text-3xl">Editar Tarea</h2>
        {/* nombre tarea */}
        <div className="flex justify-between items-center gap-10 my-5 w-full">
          <TextInput
            id="title"
            type="text"
            name="title"
            className="name mt-1 block w-full text-white bg-slate-400/30"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            error={errors.title}
          />
        </div>

        {/* responsable */}
        <div className="flex justify-between items-center gap-10 my-5 w-full">
          <InputLabel className="text-white w-[100px]" htmlFor="responsable" value="Responsable" />
          <select
            id="assigned_to"
            name="assigned_to"
            value={data.assigned_to ?? ''}
            onChange={(e) => setData('assigned_to', e.target.value === '' ? null : e.target.value)}
            className="name mt-1 block w-full text-white bg-slate-400/30 rounded-md border-white/80"
          >
            <option value="">Sin asignar</option>
            {collaborators.map((collaborator) => (
              <option className="bg-gray-700" key={collaborator.id} value={collaborator.id}>
                {collaborator.name} | {collaborator.email}
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
            id="due_date"
            type="date"
            name="due_date"
            className="name mt-1 block w-full text-white bg-slate-400/30"
            value={data.due_date}
            onChange={(e) => setData('due_date', e.target.value)}
          />
        </div>

        {/* secciones asignables */}
        <div className="flex justify-between items-center gap-10 my-5 w-full">
          <InputLabel className="text-white w-[100px]" htmlFor="section" value="Sección" />
          <select
            id="section_id"
            name="section_id"
            value={data.section_id}
            onChange={(e) => setData('section_id', e.target.value)}
            className="name mt-1 block w-full text-white bg-slate-400/30 rounded-md border-white/80"
          >
            {reorderedSections.map((section) => (
              <option className="bg-gray-700" key={section.section.id} value={section.section.id}>
                {section.section.name}
              </option>
            ))}
          </select>
        </div>

        {/* filtros de la tarea */}
        <div className="flex flex-col gap-4 w-full my-5">
          <h3 className="text-xl text-white font-semibold self-start">Filtros</h3>

          {data.filters.map((filter, index) => (
            <div
              key={filter.filter_id}
              className="grid grid-cols-2 gap-4 items-center bg-slate-500/20 p-2 rounded-md"
            >
              <span className="text-white">{filter.filter_name}</span>

              {/* Input dinámico según tipo */}
              {(() => {
                switch (filter.filter_type) {
                  case 'texto':
                    return (
                      <input
                        type="text"
                        className="w-full bg-slate-400/30 text-white p-1 rounded"
                        value={filter.value || ''}
                        onChange={(e) => {
                          const newFilters = [...data.filters]
                          newFilters[index].value = e.target.value
                          setData('filters', newFilters)
                        }}
                      />
                    )

                  case 'numero':
                    return (
                      <input
                        type="number"
                        className="w-full bg-slate-400/30 text-white p-1 rounded"
                        value={filter.value || ''}
                        onChange={(e) => {
                          const newFilters = [...data.filters]
                          newFilters[index].value = Number(e.target.value)
                          setData('filters', newFilters)
                        }}
                      />
                    )

                  case 'fecha':
                    return (
                      <input
                        type="date"
                        className="w-full bg-slate-400/30 text-white p-1 rounded"
                        value={filter.value || ''}
                        onChange={(e) => {
                          const newFilters = [...data.filters]
                          newFilters[index].value = e.target.value
                          setData('filters', newFilters)
                        }}
                      />
                    )

                  case 'persona':
                    return (
                      <select
                        className="w-full bg-slate-400/30 text-white p-1 rounded"
                        value={filter.value || ''}
                        onChange={(e) => {
                          const newFilters = [...data.filters]
                          newFilters[index].value = e.target.value
                          setData('filters', newFilters)
                        }}
                      >
                        <option value="">Sin asignar</option>
                        {collaborators.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name} | {user.email}
                          </option>
                        ))}
                      </select>
                    )

                  case 'unica':
                    const currentFilterSingle = projectFilters.find(
                      (f) => f.id === filter.filter_id
                    )
                    return (
                      <select
                        className="w-full bg-slate-400/30 text-white p-1 rounded"
                        value={filter.value || ''}
                        onChange={(e) => {
                          const newFilters = [...data.filters]
                          newFilters[index].value = e.target.value
                          setData('filters', newFilters)
                        }}
                      >
                        {(currentFilterSingle?.options || []).map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )

                  case 'multiple':
                    const currentFilterMultiple = projectFilters.find(
                      (f) => f.id === filter.filter_id
                    )
                    return (
                      <select
                        multiple
                        className="w-full bg-slate-400/30 text-white p-1 rounded"
                        value={filter.value || []}
                        onChange={(e) => {
                          const options = Array.from(e.target.selectedOptions).map((o) => o.value)
                          const newFilters = [...data.filters]
                          newFilters[index].value = options
                          setData('filters', newFilters)
                        }}
                      >
                        {(currentFilterMultiple?.options || []).map((option, idx) => (
                          <option key={idx} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )

                  default:
                    return <span className="text-gray-300">Tipo no soportado</span>
                }
              })()}
            </div>
          ))}
        </div>

        {/* description  */}
        <div className="flex justify-between items-center gap-10 my-5  w-full">
          <InputLabel className="text-white w-[100px]" htmlFor="description" value="description" />
          <textarea
            id="description"
            name="description"
            rows="5"
            cols="33"
            className="name mt-1 block w-full text-white bg-slate-400/30 h-[100px]"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            aria-invalid={errors.description ? 'true' : 'false'}
          />
        </div>
      </div>
    </Modal>
  )
}

export default EditTask
