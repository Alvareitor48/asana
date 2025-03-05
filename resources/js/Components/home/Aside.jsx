import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, children }) => {
    return (
        <motion.aside
            initial={{ width: 240 }}
            animate={{
                width: isOpen
                    ? 240 // Abierto en pantallas grandes
                    : 75, // Reducido en pantallas pequeñas
            }}
            exit={{ width: 0 }} // Desaparece en pantallas muy pequeñas
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="left-0 top-0 z-50 h-full flex-col items-center justify-start border-t-2 border-white bg-layout-gray md:relative md:flex md:w-[75px] xl:w-[240px]"
        >
            {/* seccion personal */}
            {children}
        </motion.aside>
    );
};

export default Sidebar;
