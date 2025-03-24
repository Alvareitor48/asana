import { formatFilterValue } from '@/lib/filterDetail'
import { monthName } from '@/lib/utils'
import { useState } from 'react'
import TaskContextMenu from './TaskContextMenu'

const Task = ({ tasks, openModal, collaborators }) => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    task: null,
  })

  const handleContextMenu = (e, task) => {
    e.preventDefault()

    // Obtener las coordenadas del clic
    let x = e.clientX - 250
    let y = e.clientY - 100

    // Obtener dimensiones de la ventana
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    // Tamaño estimado del menú (ajusta estos valores según tu diseño)
    const menuWidth = 250
    const menuHeight = 300

    // Ajustar posición si el menú se saldría de la pantalla
    if (x + menuWidth > windowWidth) {
      x = windowWidth - menuWidth - 10
    }

    if (y + menuHeight > windowHeight) {
      y = windowHeight - menuHeight - 10
    }

    setContextMenu({
      visible: true,
      x: x,
      y: y,
      task: task,
    })
  }

  const closeContextMenu = () => {
    setContextMenu({
      ...contextMenu,
      visible: false,
    })
  }

  return (
    <>
      {tasks.map((task) => {
        const firstLetter = collaborators.find((owner) => owner.id === task.assigned_to)

        const dueDate = task.due_date ? new Date(task.due_date) : null
        const dayAndMonth = dueDate
          ? `${dueDate.getDate()} de ${monthName(dueDate.getMonth() + 1)}`
          : ''

        return (
          <tr
            key={task.id}
            onContextMenu={(e) => handleContextMenu(e, task)}
            className="border-b border-gray-700 hover:bg-gray-800"
          >
            <td className="px-2 py-2 pl-10 text-gray-300 flex items-center cursor-pointer">
              <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center mr-2">
                {!!task.status && '✔'}
              </div>
              <span onClick={() => openModal(task)}>{task.title}</span>
            </td>
            <td className="px-2 py-2">
              <div className="w-8 h-8 rounded-full bg-blue-900/70 flex items-center justify-center text-white">
                <span>{firstLetter?.name?.charAt(0) ?? ''}</span>
              </div>
            </td>
            <td className="px-2 py-2 text-sm">
              {dayAndMonth ? (
                <span>{dayAndMonth}</span>
              ) : (
                <div className="w-8 h-8 border rounded-full border-white/40" />
              )}
            </td>
            {task?.filters?.map((filter) => (
              <td className="px-2 py-2">
                <div className="w-full flex h-full p-2  line-clamp-1   items-center justify-center text-white">
                  {formatFilterValue(filter, collaborators)}
                </div>
              </td>
            ))}
          </tr>
        )
      })}
      {contextMenu.visible && (
        <TaskContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          task={contextMenu.task}
          onClose={closeContextMenu}
        />
      )}
    </>
  )
}

export default Task
