import { motion } from 'framer-motion'

const NavBar = ({ isOpen, children }) => {
  return (
    <motion.nav
      initial={{ width: 240 }}
      animate={{
        width: isOpen
          ? 240 // Abierto en pantallas grandes
          : 75, // Reducido en pantallas pequeñas
      }}
      exit={{ width: 0 }} // Desaparece en pantallas muy pequeñas
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed left-0 top-20 z-50 h-screen flex-col items-center justify-start border-t-2 border-white bg-layout-gray md:flex md:w-[75px] xl:w-[240px]"
    >
      {/* seccion personal */}
      {children}
    </motion.nav>
  )
}

export default NavBar
