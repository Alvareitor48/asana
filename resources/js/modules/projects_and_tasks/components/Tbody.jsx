import useContextMenu from '@/hooks/useContextMenu'
import CardNav from '@/shared/components/CardNav'
import Add from '@/shared/icons/Add'
import ArrowDown from '@/shared/icons/ArrowDown'
import ArrowUp from '@/shared/icons/ArrowUp'
import { initEcho } from '@/utils/echo'
import { router, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'
import EditTask from './EditTask'
import SectionContextMenu from './SectionContextMenu'
import Task from './Task'

const Tbody = ({ sections, collapsedSections, toggleSection, projectId, filters }) => {
  const { collaborators, pusher } = usePage().props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [updatedSections, setSections] = useState(sections)
  const timeoutRef = useRef(null)
  const [closeContextMenu, handleContextMenu, contextMenu] = useContextMenu()

  const openModal = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

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
      status: selectedTask.status || false,
      assigned_to: selectedTask.assigned_to ?? '',
      due_date: selectedTask.due_date || '',
      section_id: selectedTask.section_id || '',
      description: selectedTask.description || '',
      filters: selectedTask.filters || [],
    })
  }, [selectedTask])

  const { data, setData, patch, processing, errors, reset } = useForm({
    title: '',
    status: false,
    assigned_to: '',
    due_date: '',
    section_id: '',
    description: '',
    filters: [],
  })

  useEffect(() => {
    if (!selectedTask) return

    const original = {
      title: selectedTask.title || '',
      status: selectedTask.status || false,
      assigned_to: selectedTask.assigned_to ?? '',
      due_date: selectedTask.due_date || '',
      section_id: selectedTask.section_id || '',
      description: selectedTask.description || '',
      filters: selectedTask.filters || [],
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

      echo.channel('tasks').listen('.task.deleted', (event) => {
        setSections((prevSections) =>
          prevSections.map((section) => {
            if (section.section.id !== event.sectionId) return section

            const updatedTasks = section.tasks.filter((task) => task.id !== event.taskId)

            return { ...section, tasks: updatedTasks }
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

  const handleDeleteTask = () => {
    router.delete(route('tasks.destroy', { project: projectId, task: selectedTask?.id }), {
      preserveScroll: true,
    })
    setIsModalOpen(false)
  }

  const updateTaskInSection = (updatedTask) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (!section.tasks.some((t) => t.id === updatedTask.id)) return section

        return {
          ...section,
          tasks: section.tasks.map((t) => (t.id === updatedTask.id ? { ...t, ...updatedTask } : t)),
        }
      })
    )
  }

  const handleData = (task, key, value) => {
    let dataToSend = {
      title: task.title || '',
      status: task.status || false,
      assigned_to: task.assigned_to ?? '',
      due_date: task.due_date || '',
      section_id: task.section_id || '',
      description: task.description || '',
      filters: task.filters || [],
    }

    dataToSend[key] = value

    router.patch(
      route('tasks.update', {
        project: projectId,
        task: task.id, // <- Ojo: aquí usas task.id, no selectedTask.id
      }),
      {
        ...dataToSend,
        preserveScroll: true,
      }
    )
  }

  return (
    <tbody ref={containerRef}>
      {updatedSections.map((section) => (
        <React.Fragment key={section.section.id}>
          {/* Fila de encabezado de sección (colapsable) */}
          <tr
            className="bg-gray-800 border-b border-gray-700 cursor-pointer hover:bg-gray-700"
            onClick={() => toggleSection(section.section.id)}
            onContextMenu={(e) => handleContextMenu(e, section.section.id)}
          >
            <td className="px-2 py-2 font-semibold flex items-center text-white">
              {collapsedSections[section.section.id] ? (
                <ArrowUp height="25px" width="25px" color="white" />
              ) : (
                <ArrowDown height="25px" width="25px" color="white" />
              )}
              <span>{section.section.name} 🔥</span>
            </td>
            <td colSpan={filters?.length + 3}></td>
          </tr>

          {/* Filas de tareas (visibles cuando la sección no está colapsada) */}
          {!collapsedSections[section.section.id] && (
            <Task
              collaborators={collaborators}
              tasks={section.tasks}
              projectId={projectId}
              openModal={openModal}
              handleData={handleData}
              updateTaskInSection={updateTaskInSection}
            />
          )}

          {/* Fila para agregar tarea (visible cuando la sección no está colapsada) */}
          {!collapsedSections[section.section.id] && (
            <tr
              className="border-b border-gray-700 text-gray-400  hover:bg-gray-800 cursor-pointer"
              onClick={() => handleCreateTask(section.section.id)}
            >
              <td className="px-2 py-2 pl-10">Agegar Tarea...</td>
              <td colSpan={filters.length + 3}></td>
            </tr>
          )}
        </React.Fragment>
      ))}

      {/* new section */}
      <tr className="border-b border-gray-700 hover:bg-gray-800">
        <td className="w-full">
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
        handleDeleteTask={handleDeleteTask}
      />
      {contextMenu.visible && (
        <SectionContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          sectionId={contextMenu.element}
          onClose={closeContextMenu}
          projectId={projectId}
        />
      )}
    </tbody>
  )
}

export default Tbody
