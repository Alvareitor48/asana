import { monthName } from '@/lib/utils'
import CardNav from '@/shared/components/CardNav'
import Add from '@/shared/icons/Add'
import ArrowDown from '@/shared/icons/ArrowDown'
import ArrowUp from '@/shared/icons/ArrowUp'
import { initEcho } from '@/utils/echo'
import { router, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'
import EditTask from './EditTask'

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
      description: selectedTask.description || '',
    })
  }, [selectedTask])

  const { data, setData, patch, processing, errors, reset } = useForm({
    title: '',
    assigned_to: '',
    due_date: '',
    section_id: '',
    description: '',
  })

  useEffect(() => {
    if (!selectedTask) return

    const original = {
      title: selectedTask.title || '',
      assigned_to: selectedTask.assigned_to ?? '',
      due_date: selectedTask.due_date || '',
      section_id: selectedTask.section_id || '',
      description: selectedTask.description || '',
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
            onClick={() => toggleSection(section.section.id)}
          >
            <td className="px-4 py-2 font-semibold flex items-center text-white">
              {collapsedSections[section.section.id] ? (
                <ArrowUp height="25px" width="25px" color="white" />
              ) : (
                <ArrowDown height="25px" width="25px" color="white" />
              )}
              <span>{section.section.name} 🔥</span>
            </td>
            <td colSpan={4}></td>
          </tr>

          {/* Filas de tareas (visibles cuando la sección no está colapsada) */}
          {!collapsedSections[section.section.id] &&
            section.tasks.map((task) => {
              const firstLetter = collaborators.find((owner) => owner.id === task.assigned_to)

              const dueDate = task.due_date ? new Date(task.due_date) : null
              const dayAndMonth = dueDate
                ? `${dueDate.getDate()} de ${monthName(dueDate.getMonth() + 1)}`
                : ''

              return (
                <tr key={task.id} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="px-4 py-2 pl-10 text-gray-300 flex items-center cursor-pointer">
                    <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center mr-2">
                      {!!task.status && '✔'}
                    </div>
                    <span onClick={() => openModal(task)}>{task.title}</span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-blue-900/70 flex items-center justify-center text-white">
                      <span>{firstLetter?.name?.charAt(0) ?? ''}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {dayAndMonth ? (
                      <span>{dayAndMonth}</span>
                    ) : (
                      <div className="w-8 h-8 border rounded-full border-white/40" />
                    )}
                  </td>
                </tr>
              )
            })}

          {/* Fila para agregar tarea (visible cuando la sección no está colapsada) */}
          {!collapsedSections[section.section.id] && (
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

      <EditTask
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setSelectedTask={setSelectedTask}
        reorderedSections={reorderedSections}
        data={data}
        errors={errors}
        collaborators={collaborators}
        setData={setData}
        reset={reset}
      />
    </tbody>
  )
}

export default Tbody
