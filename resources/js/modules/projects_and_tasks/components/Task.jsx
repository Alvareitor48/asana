import useContextMenu from '@/hooks/useContextMenu'
import { formatFilterValue } from '@/lib/filterDetail'
import { monthName } from '@/lib/utils'
import TaskContextMenu from './TaskContextMenu'

const Task = ({ tasks, openModal, collaborators, projectId }) => {
  const [closeContextMenu, handleContextMenu, contextMenu] = useContextMenu()

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
            className="border-b w-full border-gray-700 hover:bg-gray-800"
          >
            <td className="px-2 py-2 pl-10 text-gray-300 flex items-center cursor-pointer w-full h-fit">
              <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center mr-2">
                {!!task.status && '✔'}
              </div>
              <span onClick={() => openModal(task)}>{task.title}</span>
            </td>
            <td className="px-2 py-2 w-full h-fit">
              <div className="w-8 h-8 rounded-full bg-blue-900/70 flex items-center justify-center text-white">
                <span>{firstLetter?.name?.charAt(0) ?? ''}</span>
              </div>
            </td>
            <td className="px-2 py-2 text-sm w-full h-fit">
              {dayAndMonth ? (
                <span>{dayAndMonth}</span>
              ) : (
                <div className="w-8 h-8 border rounded-full border-white/40" />
              )}
            </td>
            {task?.filters?.map((filter) => (
              <td className="px-2 py-2  h-full">{formatFilterValue(filter, collaborators)}</td>
            ))}
            <td colSpan={1}></td>
          </tr>
        )
      })}
      {contextMenu.visible && (
        <TaskContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          task={contextMenu.element}
          onClose={closeContextMenu}
          projectId={projectId}
          openTaskModal={openModal}
        />
      )}
    </>
  )
}

export default Task
