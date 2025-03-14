import { useOutsideClick } from '@/hooks/useOutsideClick'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  // Llamada incondicional al hook:
  useOutsideClick(modalRef, onClose)

  if (!isOpen) return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, backdropFilter: 'blur(1px)' }}
        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/10"
      >
        {/* Contenedor del Modal */}
        <motion.div
          ref={modalRef}
          className="relative z-50 flex max-w-[50%] flex-1 flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-transparent bg-black/90 p-6 shadow-lg"
          initial={{ opacity: 0, scale: 0.5, rotateX: 40, y: 40 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateX: 10 }}
          transition={{ type: 'spring', stiffness: 260, damping: 15 }}
        >
          {/* Botón de Cerrar */}
          <button
            onClick={onClose}
            className="self-end cursor-pointer text-white transition-transform duration-200 ease-in-out hover:scale-125 active:scale-95"
          >
            <span>❌</span>
          </button>

          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.getElementById('modal-root')
  )
}
export default Modal
