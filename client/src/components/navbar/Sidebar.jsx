import { IoClose, IoLogOut } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Sidebar = ({
  isOpen,
  toggleSidebar,
  sidebarLinks,
  page,
  user,
  logout,
}) => {
  return (
    <nav
      className={`lg:hidden fixed top-0  w-[250px] h-full bg-white transition-all duration-300 ease-in-out z-[101] ${
        isOpen ? 'right-0' : 'right-[-250px]'
      } `}
    >
      <button onClick={toggleSidebar}>
        <IoClose
          className={`w-8 h-8 m-2 ${
            user === 'user' ? 'hover:text-uAccent' : 'hover:text-sAccent'
          }`}
        />
      </button>
      <ul className="flex flex-col gap-y-1 mt-8 h-full px-2 *:rounded-lg   *:h-12 *:w-full *:flex *:justify-start *:items-center *:pl-3 *:text-xl *:gap-4 *:transition-all">
        {sidebarLinks.map((item) => {
          const Icon = item.icon
          return (
            <li
              key={item.link}
              className={`flex justify-center items-center gap-2 ${
                user === 'user' ? 'hover:text-uAccent' : 'hover:text-sAccent'
              }  ${
                page === item.link &&
                (user === 'user'
                  ? 'bg-uAccent text-white hover:text-white'
                  : 'bg-sAccent text-white hover:text-white')
              }`}
              onClick={toggleSidebar}
            >
              <Icon className="scale-125" />
              <Link to={item.link}>{item.text}</Link>
            </li>
          )
        })}
        <button
          className={`flex justify-center items-center gap-2 absolute bottom-4 ${
            user === 'user' ? 'hover:text-uAccent' : 'hover:text-sAccent'
          } `}
          onClick={user === 'store' ? logout('StoreLogin') : logout()}
        >
          <IoLogOut className="scale-125" />
          Logout
        </button>
      </ul>
    </nav>
  )
}
export default Sidebar
