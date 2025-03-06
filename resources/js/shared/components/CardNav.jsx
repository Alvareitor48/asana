const CardNav = ({ name, children }) => {
  return (
    <button
      className={`hover:bg-active-nav flex h-fit w-full items-center justify-start gap-4 rounded-md px-3 py-2 text-white`}
    >
      {children}
      <span className="text-lg">{name}</span>
    </button>
  )
}

export default CardNav
