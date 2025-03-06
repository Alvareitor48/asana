import Avatar from '../../Components/Avatar'
import List from '../icons/List'

const Header = ({ setIsNavbarOpen, isNavbarOpen }) => {
  return (
    <header className="fixed z-20 flex h-fit w-full min-w-[200px] justify-between gap-4 bg-layout-gray px-3 py-5 text-white">
      <button onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
        <List height={35} width={35} color="white" />
      </button>
      <Avatar />
    </header>
  )
}

export default Header
