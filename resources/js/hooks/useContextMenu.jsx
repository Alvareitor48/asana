import { useState } from 'react'

const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    element: null,
  })

  const handleContextMenu = (e, element) => {
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
      element: element,
    })
  }

  const closeContextMenu = () => {
    setContextMenu({
      ...contextMenu,
      visible: false,
    })
  }

  return [closeContextMenu, handleContextMenu, contextMenu]
}

export default useContextMenu
