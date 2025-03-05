const CardNav = ({ name, children }) => {
    return (
        <button className={`hover:bg-active-nav flex h-fit w-full items-center justify-start gap-4 rounded-md px-3 py-2`}>
            {children}
            <span className="hidden text-lg xl:inline">{name}</span>
        </button>
    );
};

export default CardNav;
