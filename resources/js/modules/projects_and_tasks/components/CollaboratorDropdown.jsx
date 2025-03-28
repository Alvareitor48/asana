import { useEffect, useRef, useState } from 'react'

export function CollaboratorDropdown({ collaboratorId, closeModal, handleRemove }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="px-3 py-1 rounded-lg border border-white/40 transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 bg-gray-50/30"
      >
        Opciones
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-600/70  rounded-md shadow-lg z-20 ">
          <div className="py-2">
            <button
              onClick={() => {
                handleRemove()
              }}
              className="block px-4 py-2 hover:bg-gray-200/20 text-red-500 w-full text-start"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
