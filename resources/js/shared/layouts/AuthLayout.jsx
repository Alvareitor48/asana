import CardNav from '@/shared/components/CardNav'
import Header from '@/shared/components/Header'
import NavBar from '@/shared/components/NavBar'
import House from '@/shared/icons/House'
import Notify from '@/shared/icons/Notify'
import Pen from '@/shared/icons/Pen'
import { initEcho } from '@/utils/echo'
import { router, useForm, usePage } from '@inertiajs/react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { PorjectModal } from '../components/ProjectModal'
import Add from '../icons/Add'
import ArrowDown from '../icons/ArrowDown'

export default function AuthLayout({ children }) {
  const { projects: initialProjects, pusher, my_tasks } = usePage().props
  const [projects, setProjects] = useState(initialProjects)
  const user = usePage().props.auth.user

  const [isNavBarOpen, setIsNavBarOpen] = useState(true)
  const [dropProject, setDropProject] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef(null)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    description: '',
    color_icon: '#000',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post(route('project.store'), {
      onSuccess: () => {
        reset()
        setIsModalOpen(false)
      },
    })
  }

  useEffect(() => {
    if (!pusher || !user) return
    const echo = initEcho(pusher)
    const channel = echo.private(`projects.${user.id}`)
    channel.listen('.project.created', (event) => {
      setProjects((prevProjects) => [...prevProjects, event.project])
    })

    return () => {
      channel.stopListening('.project.created')
      echo.leave(`private-projects.${user.id}`)
    }
  }, [pusher])

  return (
    <>
      <div
        ref={containerRef}
        className="flex min-h-screen w-full flex-col overflow-x-hidden bg-custom-gradient bg-cover bg-center bg-no-repeat"
      >
        <Header
          name={user.name}
          isNavbarOpen={isNavBarOpen}
          toggleNavbar={() => setIsNavBarOpen(!isNavBarOpen)}
        />
        <AnimatePresence initial={false}>
          <NavBar isOpen={isNavBarOpen}>
            <div className="flex h-fit w-full flex-col items-center justify-center gap-4 px-1 py-5 ">
              <CardNav
                name={isNavBarOpen ? 'Inicio' : ''}
                onClick={() => router.visit(route('home'))}
              >
                <House height="25px" width="25px" color="white" />
              </CardNav>

              <CardNav
                name={isNavBarOpen ? 'Mis Tareas' : ''}
                onClick={() => router.visit(route('project.show', my_tasks.id))}
              >
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
                    onClick={() => setDropProject((prev) => !prev)}
                  >
                    <ArrowDown height="25px" width="25px" color="white" isActive={dropProject} />
                  </button>
                  <span>Proyectos</span>
                  <button
                    onClick={openModal}
                    className="w-fit h-fit hover:bg-white/30  rounded-lg p-2 active:scale-95"
                  >
                    <Add height="25px" width="25px" color="white" />
                  </button>
                </header>
                <AnimatePresence>
                  {dropProject && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`flex flex-col justify-start items-start w-full h-[40%] gap-4 px-4 overflow-y-scroll scrollable-container`}
                    >
                      {projects.map((project) => (
                        <motion.div
                          key={`project-${project.id}-${project.name}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-white w-full h-fit hover:bg-white/30 cursor-pointer p-2 rounded-lg flex justify-start items-center gap-2"
                        >
                          <div
                            className="w-5 h-5 rounded-md"
                            style={{ backgroundColor: project.color_icon }}
                          />
                          <button
                            type="button"
                            onClick={() => router.visit(route('project.show', project.id))}
                          >
                            {project.name}
                          </button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
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

      <PorjectModal
        handleSubmit={handleSubmit}
        setData={setData}
        processing={processing}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        data={data}
        errors={errors}
      />
    </>
  )
}
