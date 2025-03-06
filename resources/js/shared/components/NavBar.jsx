import { motion } from 'framer-motion'

const NavBar = ({ isOpen, children, widthOpen = 240, widthClosed = 75, className = '' }) => {
  return (
    <motion.nav
      initial={{ width: widthOpen }}
      animate={{ width: isOpen ? widthOpen : widthClosed }}
      exit={{ width: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`fixed left-0 top-20 z-50 h-screen flex-col items-center justify-start border-t-2 border-white bg-layout-gray md:flex ${className}`}
    >
      {children}
    </motion.nav>
  )
}

export default NavBar
