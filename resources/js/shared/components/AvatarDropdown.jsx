import { router } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'

export function AvatarDropdown({ name }) {
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

  const handleLogout = (e) => {
    e.preventDefault()
    router.post(route('logout'))
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
        <Avatar name={name} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48  container-glass rounded-md shadow-lg z-20 ">
          <div className="py-2">
            <a href="#" className="block px-4 py-2 text-white hover:bg-gray-200/20">
              Ver detalles
            </a>
            <form onSubmit={handleLogout}>
              <button
                type="submit"
                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-200/20"
              >
                Finalizar sesión
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
