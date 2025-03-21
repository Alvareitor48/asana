import InputLabel from '@/modules/auth/components/InputLabel'
import TextInput from '@/modules/auth/components/TextInput'
import Modal from './Modal'

export const PorjectModal = ({
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
        <h2 className="self-center text-3xl">Nuevo Proyecto</h2>
        {/* nombre tarea */}
        <form onSubmit={handleSubmit} className="w-full h-fit">
          <div className="flex justify-between items-center gap-10 my-5 w-full">
            <InputLabel
              className="text-white w-[100px]"
              htmlFor="responsable"
              value="Nombre del proyecto"
            />
            <TextInput
              id="name"
              type="text"
              name="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="name mt-1 block w-full text-white bg-slate-400/30"
            />
          </div>
          {errors.name && <p className="text-red-500 text-center">{errors.name}</p>}
          <div className="flex justify-between items-center gap-10 my-5 w-full">
            <InputLabel
              className="text-white w-[100px]"
              htmlFor="responsable"
              value="Descripción"
            />
            <TextInput
              id="name"
              type="text"
              name="name"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              className="name mt-1 block w-full text-white bg-slate-400/30"
            />
          </div>
          {errors.description && (
            <p className="text-red-500 text-center mb-3">{errors.description}</p>
          )}

          {/* color picker */}
          <div className="flex justify-between items-center gap-10 my-5 w-full">
            <InputLabel className="text-white w-[100px]" htmlFor="color_icon" value="Color" />
            <TextInput
              id="color_icon"
              type="text"
              name="color_icon"
              value={data.color_icon}
              onChange={(e) => setData('color_icon', e.target.value)}
              className="name mt-1 block w-full text-white bg-slate-400/30"
            />
          </div>
          {errors.color_icon && (
            <p className="text-red-500 text-center mb-3">{errors.color_icon}</p>
          )}
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
