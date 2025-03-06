import CardNav from '@/shared/components/CardNav'
import Header from '@/shared/components/Header'
import NavBar from '@/shared/components/NavBar'
import House from '@/shared/icons/House'
import Notify from '@/shared/icons/Notify'
import Pen from '@/shared/icons/Pen'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

export default function AuthLayout({ children }) {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false)
  return (
    <>
      <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-custom-gradient bg-cover bg-center bg-no-repeat">
        <Header isNavbarOpen={isNavBarOpen} toggleNavbar={() => setIsNavBarOpen(!isNavBarOpen)} />
        <AnimatePresence initial={false}>
          <NavBar isOpen={isNavBarOpen}>
            <div className="flex h-fit w-full flex-col items-center justify-center gap-4 px-1 py-5">
              <CardNav name={isNavBarOpen ? 'Inicio' : ''}>
                <House height="25px" width="25px" color="white" />
              </CardNav>

              <CardNav name={isNavBarOpen ? 'Mis Tareas' : ''}>
                <Pen height="25px" width="25px" color="white" />
              </CardNav>

              <CardNav name={isNavBarOpen ? 'Notificaciones' : ''}>
                <Notify height="25px" width="25px" color="white" />
              </CardNav>
            </div>
          </NavBar>

          <motion.main
            className={`flex mt-20 min-h-full w-full text-white`}
            animate={{
              marginLeft: isNavBarOpen ? '15rem' : '5rem',
              paddingRight: isNavBarOpen ? '15rem' : '5rem',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <section id="main-content" className="h-full w-full bg-transparent">
              {children}
            </section>
          </motion.main>
        </AnimatePresence>
      </div>
    </>
  )
}
