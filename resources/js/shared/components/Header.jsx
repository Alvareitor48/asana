import { AvatarDropdown } from '@/shared/components/AvatarDropdown'
import List from '../icons/List'

const Header = ({ toggleNavbar, name, className = '' }) => {
  return (
    <header
      className={`fixed z-20 flex w-full min-w-[200px] justify-between gap-4 bg-layout-gray px-3 py-5 text-white ${className}`}
    >
      <button onClick={toggleNavbar}>
        <List height={35} width={35} color="white" />
      </button>
      <AvatarDropdown name={name} />
    </header>
  )
}

export default Header
