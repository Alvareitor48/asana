const GlassCard = ({ children, customClass = '' }) => {
  return (
    <div
      className={`col-span-1 w-full h-full bg-red-300 rounded-2xl p-3 flex flex-col gap-4 justify-start items-start container-glass ${customClass}`}
    >
      {children}
    </div>
  )
}

export default GlassCard
