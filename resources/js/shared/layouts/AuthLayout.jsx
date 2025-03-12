import CardNav from '@/shared/components/CardNav'
import Header from '@/shared/components/Header'
import NavBar from '@/shared/components/NavBar'
import House from '@/shared/icons/House'
import Notify from '@/shared/icons/Notify'
import Pen from '@/shared/icons/Pen'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import Add from '../icons/Add'
import ArrowDown from '../icons/ArrowDown'

export default function AuthLayout({ children }) {
  const [isNavBarOpen, setIsNavBarOpen] = useState(true)
  const [dropProyect, setDropProyect] = useState(true)

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

            {isNavBarOpen && (
              <div className="w-full h-full border-t border-white pt-4 flex flex-col justify-start items-center gap-4 px-2">
                <header className="w-full h-fit flex justify-between px-4 items-center text-white">
                  <button
                    className="w-fit h-fit hover:bg-white/30  rounded-lg p-2"
                    onClick={() => setDropProyect((prev) => !prev)}
                  >
                    <ArrowDown height="25px" width="25px" color="white" isActive={dropProyect} />
                  </button>
                  <span>Proyectos</span>
                  <button className="w-fit h-fit hover:bg-white/30  rounded-lg p-2 active:scale-95">
                    <Add height="25px" width="25px" color="white" />
                  </button>
                </header>

                <div
                  className={`${dropProyect ? 'flex' : 'hidden'} flex-col justify-start items-start w-full h-fit gap-4 px-4`}
                >
                  <div className="text-white w-full h-fit hover:bg-white/30 cursor-pointer p-2 rounded-lg flex justify-start items-center gap-10">
                    <div className="w-5 h-5 rounded-md bg-red-500" />
                    <span>Backend</span>
                  </div>
                  <div className="text-white w-full h-fit hover:bg-white/30 cursor-pointer p-2 rounded-lg flex justify-start items-center gap-10">
                    <div className="w-5 h-5 rounded-md bg-blue-500" />
                    <span>Frontend</span>
                  </div>
                  <div className="text-white w-full h-fit hover:bg-white/30 cursor-pointer p-2 rounded-lg flex justify-start items-center gap-10">
                    <div className="w-5 h-5 rounded-md bg-green-500" />
                    <span>Devops</span>
                  </div>
                  <div className="text-white w-full h-fit hover:bg-white/30 cursor-pointer p-2 rounded-lg flex justify-start items-center gap-10">
                    <div className="w-5 h-5 rounded-md bg-orange-500" />
                    <span>UI/UX</span>
                  </div>
                </div>
              </div>
            )}
          </NavBar>

          <motion.main
            className={`flex mt-20 min-h-full w-full text-white`}
            animate={{
              marginLeft: isNavBarOpen ? '15rem' : '5rem',
              paddingRight: isNavBarOpen ? '15rem' : '5rem',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <section id="main-content" className="h-screen w-full bg-transparent p-3">
              {children}
            </section>
          </motion.main>
        </AnimatePresence>
      </div>
    </>
  )
}
