const Avatar = ({ name }) => {
  return (
    <div className="h-[40px] w-[40px] rounded-full bg-red-400 flex items-center justify-center">
      <span className="text-3xl font-kalam">{name.toUpperCase().charAt(0)}</span>
    </div>
  )
}

export default Avatar
