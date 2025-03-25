import { colorOptions } from '@/lib/utils'
import InputLabel from '@/modules/auth/components/InputLabel'
import TextInput from '@/modules/auth/components/TextInput'
import Modal from '../../../shared/components/Modal'

export const EditProjectModal = ({
  setData,
  processing,
  errors,
  isModalOpen,
  closeModal,
  handleSubmit,
  data,
  openDeleteProject,
  is_project_owner,
}) => {
  const handleColorChange = (e) => {
    const selectedColor = e.target.value

    setData('color_icon', selectedColor)
  }

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="text-white flex flex-col justify-start items-start w-full">
        <h2 className="self-center text-3xl">Editar Proyecto</h2>
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
            <label htmlFor="color_icon" className="text-white w-[100px]">
              Color
            </label>
            <div className="relative w-full">
              <input
                id="color_icon"
                name="color_icon"
                type="color"
                value={data.color_icon}
                onChange={handleColorChange}
                list="color-options"
                className="name mt-1 block w-full text-white bg-slate-400/30"
              />
              <datalist id="color-options">
                {colorOptions.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.label}
                  </option>
                ))}
              </datalist>
            </div>
          </div>
          {errors.color_icon && (
            <p className="text-red-500 text-center mb-3">{errors.color_icon}</p>
          )}
          <button
            disabled={processing}
            className="mb-2 w-fit content-end bg-white text-black rounded-md px-4 py-1 transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            {processing ? 'Actualizando...' : 'Actualizar'}
          </button>
          {is_project_owner && (
            <button
              onClick={openDeleteProject}
              type="button"
              className="mb-2 mx-2.5 w-fit bg-red-600 text-black rounded-md px-4 py-1.5 transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              Eliminar Proyecto
            </button>
          )}
        </form>
      </div>
    </Modal>
  )
}
