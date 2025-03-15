import InputLabel from '@/modules/auth/components/InputLabel'
import TextInput from '@/modules/auth/components/TextInput'
import CardNav from '@/shared/components/CardNav'
import Modal from '@/shared/components/Modal'
import Add from '@/shared/icons/Add'
import ArrowDown from '@/shared/icons/ArrowDown'
import ArrowUp from '@/shared/icons/ArrowUp'
import { usePage } from '@inertiajs/react'
import React, { useRef, useState } from 'react'

const Tbody = ({ sections, collapsedSections, toggleSection }) => {
  const { collaborators } = usePage().props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef(null)
  const [selectedTask, setSelectedTask] = useState(null)

  const openModal = (task) => {
    setIsModalOpen(true)
    setSelectedTask(task)
  }
  const closeModal = () => setIsModalOpen(false)

  return (
    <tbody ref={containerRef}>
      {sections.map((section) => (
        <React.Fragment key={section.section.id}>
          {/* Fila de encabezado de sección (colapsable) */}
          <tr
            className="bg-gray-800 border-b border-gray-700 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSection(section.section.name)}
          >
            <td className="px-4 py-2 font-semibold flex items-center text-white">
              {collapsedSections[section.section.name] ? (
                <ArrowUp height="25px" width="25px" color="white" />
              ) : (
                <ArrowDown height="25px" width="25px" color="white" />
              )}
              <span>{section.section.name} 🔥</span>
            </td>
            <td colSpan={4}></td>
          </tr>

          {/* Filas de tareas (visibles cuando la sección no está colapsada) */}
          {!collapsedSections[section.section.name] &&
            section.tasks.map((task) => (
              <tr key={task.id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="px-4 py-2 pl-10 text-gray-300 flex items-center cursor-pointer">
                  <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center mr-2">
                    {!!task.status && '✔'}
                  </div>
                  <span onClick={() => openModal(task)}>{task.title}</span>
                </td>
                <td className="px-4 py-2">
                  <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white">
                    <span>A</span>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="w-6 h-6 rounded-full border border-gray-400"></div>
                </td>
              </tr>
            ))}

          {/* Fila para agregar tarea (visible cuando la sección no está colapsada) */}
          {!collapsedSections[section.section.name] && (
            <tr className="border-b border-gray-700 text-gray-400  hover:bg-gray-800 cursor-pointer">
              <td className="px-4 py-2 pl-10">
                <button>Agegar Tarea...</button>
              </td>
              <td colSpan={4}></td>
            </tr>
          )}
        </React.Fragment>
      ))}

      {/* new section */}
      <tr className="border-b border-gray-700 hover:bg-gray-800">
        <td>
          <CardNav name={'Añadir nueva sección'} className="hover:bg-gray-800 cursor-pointer">
            <Add width="20" height="20" color="white" />
          </CardNav>
        </td>
      </tr>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="text-white flex flex-col justify-start items-start w-full">
          <h2 className="self-center text-3xl">Editar Tarea</h2>
          {/* nombre tarea */}
          <div className="flex justify-between items-center gap-10 my-5 w-full">
            <TextInput
              id="name"
              type="text"
              name="password"
              className="name mt-1 block w-full text-white bg-slate-400/30"
              value={selectedTask?.title}
            />
          </div>

          {/* responsable */}
          <div className="flex justify-between items-center gap-10 my-5 w-full">
            <InputLabel
              className="text-white w-[100px]"
              htmlFor="responsable"
              value="Responsable"
            />
            <select
              id="responsable"
              name="responsable"
              className="name mt-1 block w-full text-white bg-slate-400/30 rounded-md border-white/80"
            >
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
              id="name"
              type="date"
              name="date"
              className="name mt-1 block w-full text-white bg-slate-400/30"
            />
          </div>

          {/* secciones asignables */}
          <div className="flex justify-between items-center gap-10 my-5 w-full">
            <InputLabel className="text-white w-[100px]" htmlFor="section" value="Sección" />
            <select
              id="section"
              name="section"
              className="name mt-1 block w-full text-white bg-slate-400/30 rounded-md border-white/80"
            >
              {sections.map((section) => (
                <option className="bg-gray-700" key={section.section.id} value={section.section.id}>
                  {section.section.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </tbody>
  )
}

export default Tbody
