import InputLabel from '@/modules/auth/components/InputLabel'
import TextInput from '@/modules/auth/components/TextInput'
import CardNav from '@/shared/components/CardNav'
import Header from '@/shared/components/Header'
import NavBar from '@/shared/components/NavBar'
import House from '@/shared/icons/House'
import Notify from '@/shared/icons/Notify'
import Pen from '@/shared/icons/Pen'
import { router, useForm, usePage } from '@inertiajs/react'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import Modal from '../components/Modal'
import Add from '../icons/Add'
import ArrowDown from '../icons/ArrowDown'

export default function AuthLayout({ children }) {
  const { projects, my_tasks } = usePage().props
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
            <div className="flex h-fit w-full flex-col items-center justify-center gap-4 px-1 py-5">
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
                      className={`flex flex-col justify-start items-start w-full h-fit gap-4 px-4`}
                    >
                      {projects.map((project) => (
                        <motion.div
                          key={`project-${project.id}-${project.name}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-white w-full h-fit hover:bg-white/30 cursor-pointer p-2 rounded-lg flex justify-start items-center gap-10"
                        >
                          <div className="w-5 h-5 rounded-md bg-blue-500" />
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="text-white flex flex-col justify-start items-start w-full">
          <h2 className="self-center text-3xl">Nuevo Proyecto</h2>
          {/* nombre tarea */}
          <form onSubmit={handleSubmit} className="w-full h-fit">
            <div className="flex justify-between items-center gap-10 my-5 w-full">
              <InputLabel
                className="text-white w-[100px]"
                htmlFor="responsable"
                value="Nombre del proyecto"
              />
              <TextInput
                id="name"
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="name mt-1 block w-full text-white bg-slate-400/30"
              />
            </div>
            {errors.name && <p className="text-red-500 text-center">{errors.name}</p>}
            <div className="flex justify-between items-center gap-10 my-5 w-full">
              <InputLabel
                className="text-white w-[100px]"
                htmlFor="responsable"
                value="Descripción"
              />
              <TextInput
                id="name"
                type="text"
                name="name"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className="name mt-1 block w-full text-white bg-slate-400/30"
              />
            </div>
            {errors.description && (
              <p className="text-red-500 text-center mb-3">{errors.description}</p>
            )}
            <button
              disabled={processing}
              className="mb-2 w-full bg-white text-black rounded-md px-4 py-1 transition-transform duration-200 hover:scale-105 active:scale-95"
            >
              {processing ? 'Creando...' : 'Crear'}
            </button>
          </form>
        </div>
      </Modal>
    </>
  )
}
