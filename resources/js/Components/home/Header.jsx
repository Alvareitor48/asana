import Avatar from '../Avatar';
import List from '../icons/List';

const Header = ({ setIsSidebarOpen, isSidebarOpen }) => {
    return (
        <header className="flex h-fit w-full min-w-[200px] justify-between gap-4 bg-layout-gray px-3 py-5 text-white">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <List height={35} width={35} color="white" />
            </button>
            <Avatar />
        </header>
    );
};

export default Header;
