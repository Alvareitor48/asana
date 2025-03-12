import { cn } from '@/lib/utils'

const CardNav = ({ name, children, className = '', onClick = null }) => {
  return (
    <button
      className={cn(
        `hover:bg-active-nav flex h-fit w-full items-center justify-start gap-4 rounded-md px-3 py-2 text-white ${className}`
      )}
      type="button"
      onClick={onClick && onClick}
    >
      {children}
      <span className="text-lg">{name}</span>
    </button>
  )
}

export default CardNav
