import { cn } from '@/lib/utils'

const Avatar = ({ name, clss }) => {
  return (
    <div
      className={cn(
        `h-[40px] w-[40px] rounded-full bg-red-400 flex items-center text-3xl justify-center ${clss}`
      )}
    >
      <span className="font-kalam">{name.toUpperCase().charAt(0)}</span>
    </div>
  )
}

export default Avatar
