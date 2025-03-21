import InputLabel from '@/modules/auth/components/InputLabel'
import TextInput from '@/modules/auth/components/TextInput'
import CardNav from '@/shared/components/CardNav'
import Modal from '@/shared/components/Modal'
import Add from '@/shared/icons/Add'
import ArrowDown from '@/shared/icons/ArrowDown'
import ArrowUp from '@/shared/icons/ArrowUp'
import { initEcho } from '@/utils/echo'
import { router, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'

const Tbody = ({ sections, collapsedSections, toggleSection, projectId }) => {
  const { collaborators, pusher } = usePage().props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [updatedSections, setSections] = useState(sections)
  const timeoutRef = useRef(null)

  const openModal = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }
  const closeModal = () => setIsModalOpen(false)
  console.log(collaborators)

  const handleCreateTask = (sectionId) => {
    sectionId && router.post(route('tasks.store', { project: projectId, section: sectionId }))
  }

  const handleCreateSection = () => {
    router.post(route('section.store', { project: projectId }), { name: 'section' })
  }
  useEffect(() => {
    if (!selectedTask) return

    setData({
      title: selectedTask.title || '',
      assigned_to: selectedTask.assigned_to ?? '',
      due_date: selectedTask.due_date || '',
      section_id: selectedTask.section_id || '',
    })
  }, [selectedTask])

  const { data, setData, patch, processing, errors, reset } = useForm({
    title: '',
    assigned_to: '',
    due_date: '',
    section_id: '',
  })

  useEffect(() => {
    if (!selectedTask) return
    console.log(selectedTask)

    const original = {
      title: selectedTask.title || '',
      assigned_to: selectedTask.assigned_to ?? '',
      due_date: selectedTask.due_date || '',
      section_id: selectedTask.section_id || '',
    }

    const hasChanged = Object.keys(original).some((key) => data[key] !== original[key])
    if (!hasChanged) return

    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      patch(
        route('tasks.update', {
          project: projectId,
          task: selectedTask.id,
        }),
        {
          preserveScroll: true,
        }
      )
    }, 500)

    return () => clearTimeout(timeoutRef.current)
  }, [data, selectedTask?.id])

  const reorderedSections = [
    ...sections.filter((s) => s.section.id === data.section_id),
    ...sections.filter((s) => s.section.id !== data.section_id),
  ]

  useEffect(() => {
    if (pusher) {
      const echo = initEcho(pusher)
      echo.channel('tasks').listen('.task.updated', (event) => {
        setSections((prevSections) =>
          prevSections.map((section) => {
            const isTargetSection = section.section.id === event.task.section_id

            // Filtra la tarea en todas las secciones
            const filteredTasks = section.tasks.filter((t) => t.id !== event.task.id)

            return {
              ...section,
              tasks: isTargetSection ? [...filteredTasks, event.task] : filteredTasks,
            }
          })
        )
      })

      echo.channel('sections').listen('.section.updated', (event) => {
        setSections((prevSections) =>
          prevSections.some((s) => s.section.id === event.section.id)
            ? prevSections.map((s) =>
                s.section.id === event.section.id ? { ...s, section: event.section } : s
              )
            : [...prevSections, { section: event.section, tasks: [] }]
        )
      })

      return () => {
        echo.channel('tasks').stopListening('.task.updated')
        echo.channel('sections').stopListening('.section.updated')
      }
    }
  }, [pusher])

  return (
    <tbody ref={containerRef}>
      {updatedSections.map((section) => (
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
            <tr
              className="border-b border-gray-700 text-gray-400  hover:bg-gray-800 cursor-pointer"
              onClick={() => handleCreateTask(section.section.id)}
            >
              <td className="px-4 py-2 pl-10">Agegar Tarea...</td>
              <td colSpan={4}></td>
            </tr>
          )}
        </React.Fragment>
      ))}

      {/* new section */}
      <tr className="border-b border-gray-700 hover:bg-gray-800">
        <td>
          <CardNav
            name={'Añadir nueva sección'}
            className="hover:bg-gray-800 cursor-pointer"
            onClick={() => handleCreateSection()}
          >
            <Add width="20" height="20" color="white" />
          </CardNav>
        </td>
      </tr>

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
            <InputLabel
              className="text-white w-[100px]"
              htmlFor="responsable"
              value="Responsable"
            />
            <select
              id="assigned_to"
              name="assigned_to"
              value={data.assigned_to ?? ''}
              onChange={(e) =>
                setData('assigned_to', e.target.value === '' ? null : e.target.value)
              }
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
        </div>
      </Modal>
    </tbody>
  )
}

export default Tbody
