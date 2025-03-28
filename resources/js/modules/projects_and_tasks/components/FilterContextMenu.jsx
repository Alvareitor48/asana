import { router } from '@inertiajs/react'
import { useEffect, useRef } from 'react'

const FilterContextMenu = ({ x, y, onClose, projectId, filterId, openModal }) => {
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

  const handleDeleteTask = () => {
    router.delete(route('filter.destroy', { project: projectId, filter: filterId }), {
      preserveScroll: true,
      preserveState: false,
    })
    onClose()
  }

  const handleEditFilter = () => {
    openModal(() => filterId)
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
        onClick={handleEditFilter}
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
        <span>Editar Filtro</span>
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
        <span>Eliminar Filtro</span>
      </div>
    </div>
  )
}

export default FilterContextMenu
