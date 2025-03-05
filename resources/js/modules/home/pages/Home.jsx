import Sidebar from '@/Components/home/Aside';
import CardNav from '@/Components/home/CardNav';
import Header from '@/Components/home/Header';
import House from '@/Components/icons/House';
import Notify from '@/Components/icons/Notify';
import Pen from '@/Components/icons/Pen';
import { Head } from '@inertiajs/react';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Home({ auth }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <>
            <Head title="Home" />
            <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-custom-gradient bg-cover bg-center bg-no-repeat">
                <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

                <main className="flex h-screen w-full text-white">
                    <AnimatePresence initial={false}>
                        <Sidebar isOpen={isSidebarOpen}>
                            <article className="flex h-fit w-full flex-col items-center justify-center gap-4 px-1 py-5">
                                <CardNav name={isSidebarOpen ? 'Inicio' : ''}>
                                    <House height="25px" width="25px" color="white" />
                                </CardNav>

                                <CardNav name={isSidebarOpen ? 'Mis Tareas' : ''}>
                                    <Pen height="25px" width="25px" color="white" />
                                </CardNav>

                                <CardNav name={isSidebarOpen ? 'Notificaciones' : ''}>
                                    <Notify height="25px" width="25px" color="white" />
                                </CardNav>
                            </article>
                        </Sidebar>
                    </AnimatePresence>

                    {/* MAIN SECTION */}
                    <section id="main-content" className="h-full w-full bg-transparent p-5">
                        <div className="h-full w-full rounded-xl bg-layout-gray/20 p-3 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-lg">
                            Esto es el main
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
