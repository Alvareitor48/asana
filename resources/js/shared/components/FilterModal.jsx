import InputLabel from '@/modules/auth/components/InputLabel'
import TextInput from '@/modules/auth/components/TextInput'
import { useEffect, useState } from 'react'
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
  const [optionInput, setOptionInput] = useState('')
  useEffect(() => {
    if (['unica', 'multiple'].includes(data.type)) {
      setData('options', data.options ?? [])
    } else {
      setData('options', null)
    }
  }, [data.type])
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
          {['unica', 'multiple'].includes(data.type) && (
            <div className="my-4 w-full">
              <InputLabel className="text-white mb-1" value="Opciones" />

              <div className="flex gap-2">
                <input
                  type="text"
                  value={optionInput}
                  onChange={(e) => setOptionInput(e.target.value)}
                  placeholder="Añadir opción"
                  className="bg-slate-400/30 text-white p-1 rounded w-full"
                />
                <button
                  type="button"
                  className="bg-white text-black rounded px-2 py-1"
                  onClick={() => {
                    if (optionInput.trim()) {
                      setData('options', [...(data.options || []), optionInput.trim()])
                      setOptionInput('')
                    }
                  }}
                >
                  Añadir
                </button>
              </div>

              {data.options?.length > 0 && (
                <ul className="mt-2 text-sm text-white list-disc pl-5">
                  {data.options.map((opt, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>{opt}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setData(
                            'options',
                            data.options.filter((_, i) => i !== idx)
                          )
                        }}
                        className="ml-2 text-red-500 hover:text-red-700 text-xs"
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
