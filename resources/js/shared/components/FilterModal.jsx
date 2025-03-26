import InputLabel from '@/modules/auth/components/InputLabel'
import TextInput from '@/modules/auth/components/TextInput'
import Modal from './Modal'

export const FilterModal = ({
  isModalOpen,
  processing,
  data,
  errors,
  closeModal,
  handleSubmit,
  setData,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="text-white flex flex-col justify-start items-start w-full">
        <h2 className="self-center text-3xl">Nuevo Filtro</h2>
        {/* nombre de la tarea */}
        <form onSubmit={handleSubmit} className="w-full h-fit">
          <div className="flex justify-between items-center gap-10 my-5 w-full">
            <InputLabel className="text-white w-[100px]" htmlFor="name" value="Nombre del Filtro" />
            <TextInput
              id="name"
              type="text"
              name="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="mt-1 block w-full text-white bg-slate-400/30"
            />
          </div>
          {errors.name && <p className="text-red-500 text-center">{errors.name}</p>}
          {/* tipo de filtro */}
          <div className="flex justify-between items-center gap-10 my-5 w-full">
            <InputLabel className="text-white w-[100px]" htmlFor="type" value="Tipos de filtros" />
            <select
              className="w-full bg-slate-400/30 text-white p-1 rounded"
              value={data.type}
              onChange={(e) => setData('type', e.target.value)}
            >
              <option className="bg-gray-700" value="unica">
                Selección Única
              </option>
              <option className="bg-gray-700" value="multiple">
                Selección Múltiple
              </option>
              <option className="bg-gray-700" value="fecha">
                Fecha
              </option>
              <option className="bg-gray-700" value="persona">
                Persona
              </option>
              <option className="bg-gray-700" value="numero">
                Número
              </option>
              <option className="bg-gray-700" value="texto">
                Texto
              </option>
            </select>
          </div>
          {errors.description && <p className="text-red-500 text-center mb-3">{errors.type}</p>}

          <button
            disabled={processing}
            className="mb-2 w-full bg-white text-black rounded-md px-4 py-1 transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            {processing ? 'Creando...' : 'Crear'}
          </button>
        </form>
      </div>
    </Modal>
  )
}
