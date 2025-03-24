import { useEffect, useRef } from 'react'

const TaskContextMenu = ({ x, y, task, onClose, projectId }) => {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const handleDuplicateTask = () => {
    // Implementar lógica para duplicar tarea
    console.log('Duplicar tarea:', task.id)
    onClose()
  }

  const handleCreateFollowUp = () => {
    // Implementar lógica para crear tarea de seguimiento
    console.log('Crear tarea de seguimiento para:', task.id)
    onClose()
  }

  const handleMarkAsCompleted = () => {
    // Implementar lógica para marcar como finalizada
    console.log('Marcar como finalizada:', task.id)
    onClose()
  }

  const handleDeleteTask = () => {
    // Implementar lógica para eliminar tarea
    console.log('Eliminar tarea:', task.id)
    onClose()
  }

  const handleOpenDetails = () => {
    // Implementar lógica para abrir detalles
    console.log('Abrir detalles de:', task.id)
    onClose()
  }

  return (
    <div
      ref={menuRef}
      className="fixed min-w-[250px] bg-[#1e1e2d] text-white rounded shadow-lg z-50 overflow-hidden"
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      <div
        className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer"
        onClick={handleDuplicateTask}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          ></path>
        </svg>
        <span>Duplicar tarea</span>
      </div>

      <div
        className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer"
        onClick={handleCreateFollowUp}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Crear tarea de seguimiento</span>
      </div>

      <div
        className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer"
        onClick={handleMarkAsCompleted}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <span>Marcar como finalizada</span>
      </div>

      <div className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          ></path>
        </svg>
        <span>Convertir a</span>
      </div>

      <div
        className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer"
        onClick={handleOpenDetails}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          ></path>
        </svg>
        <span>Abrir los detalles de la tarea</span>
      </div>

      <div className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          ></path>
        </svg>
        <span>Abrir en una pestaña nueva</span>
      </div>

      <div className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          ></path>
        </svg>
        <span>Copiar enlace de la tarea</span>
      </div>

      <div
        className="px-4 py-2 hover:bg-red-900 flex items-center space-x-2 cursor-pointer text-red-400"
        onClick={handleDeleteTask}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          ></path>
        </svg>
        <span>Eliminar tarea</span>
      </div>
    </div>
  )
}

export default TaskContextMenu
