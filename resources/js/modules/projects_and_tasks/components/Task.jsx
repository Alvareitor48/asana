import useContextMenu from '@/hooks/useContextMenu'
import { formatFilterValue } from '@/lib/filterDetail'
import { monthName } from '@/lib/utils'
import { useState } from 'react'
import TaskContextMenu from './TaskContextMenu'

const Task = ({ tasks, openModal, collaborators, projectId, handleData, updateTaskInSection }) => {
  const [editingTitleId, setEditingTitleId] = useState(null)
  const [titleInput, setTitleInput] = useState('')
  const [closeContextMenu, handleContextMenu, contextMenu] = useContextMenu()

  const handleTitleBlur = (task) => {
    if (titleInput !== task.title) {
      const updatedTask = { ...task, title: titleInput }
      handleData(updatedTask, 'title', titleInput)
      updateTaskInSection(updatedTask)
    }
    setEditingTitleId(null)
  }

  return (
    <>
      {tasks.map((task) => {
        const firstLetter = collaborators.find((owner) => owner.id === task.assigned_to)

        const dueDate = task.due_date ? new Date(task.due_date) : null
        const dayAndMonth = dueDate
          ? `${dueDate.getDate()} de ${monthName(dueDate.getMonth() + 1)}`
          : ''
        const isEditingTitle = editingTitleId === task.id

        return (
          <tr
            key={task.id}
            onContextMenu={(e) => handleContextMenu(e, task)}
            className="border-b w-full border-gray-700 hover:bg-gray-800"
          >
            <td className="px-2 py-2 pl-10 text-gray-300 flex justify-between items-center w-full h-fit">
              <div className="flex items-center">
                <button
                  className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center mr-2 cursor-pointer"
                  onClick={() => {
                    const updatedTask = { ...task, status: !task.status }
                    handleData(updatedTask, 'status', updatedTask.status)
                    updateTaskInSection(updatedTask)
                  }}
                >
                  {task.status === true && '✔'}
                </button>
                {isEditingTitle ? (
                  <input
                    type="text"
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    onBlur={() => handleTitleBlur(task)}
                    autoFocus
                    className="bg-transparent border border-transparent focus:border-gray-300 rounded px-1 py-0.5 text-white outline-none w-full min-w-0"
                  />
                ) : (
                  <span
                    className="inline-flex border border-transparent hover:border-gray-300 rounded px-1 py-0.5 cursor-pointer w-full min-w-0"
                    onClick={() => {
                      setEditingTitleId(task.id)
                      setTitleInput(task.title)
                    }}
                  >
                    {task.title}
                  </span>
                )}
              </div>
              <div
                className="w-7 h-7 text-xl bg-transparent flex items-center justify-center hover:bg-gray-200/15 cursor-pointer border-gray-700 border"
                onClick={() => openModal(task)}
              >
                {'>'}
              </div>
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
          handleData={handleData}
          updateTaskInSection={updateTaskInSection}
        />
      )}
    </>
  )
}

export default Task
