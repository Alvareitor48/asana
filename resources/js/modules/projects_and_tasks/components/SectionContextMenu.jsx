import { router } from '@inertiajs/react'
import { useEffect, useRef } from 'react'

const SectionContextMenu = ({ x, y, onClose, projectId, sectionId }) => {
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

  const handleDeleteSection = () => {
    router.delete(route('section.destroy', { project: projectId, section: sectionId }), {
      preserveScroll: true,
    })
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
        className="px-4 py-2 hover:bg-red-900 flex items-center space-x-2 cursor-pointer text-red-400"
        onClick={handleDeleteSection}
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

export default SectionContextMenu
