import { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { GiHamburgerMenu } from 'react-icons/gi'
import { SiFlipkart } from 'react-icons/si'
import { FaSearch } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoginPage } from '../../state/slices/formSlice'

const Navbar = ({ navbarLinks, sidebarLinks, user = 'user' }) => {
  const [search, setSearch] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const dispatch = useDispatch()

  const location = useLocation()
  const page = location.pathname
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const logout = (page = 'UserLogin') => {
    dispatch(setLoginPage(page))
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-auto flex justify-between items-center py-2 wrapper">
      {/* left */}
      <Link to={user === 'user' ? '/' : '/store'} className="flex-center gap-2">
        GravShop
        <SiFlipkart />
      </Link>
      {/* middle */}
      <div className="flex gap-2 w-3/6 lg:w-2/6">
        <input
          type="text"
          placeholder="search product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`!rounded-3xl  ${
            user === 'user' ? 'focus:outline-uAccent' : 'focus:outline-sAccent'
          }`}
        />
        <button
          className={`rounded-full bg-gray-200 w-9 h-9 aspect-square my-auto flex-center   hover:text-white transition-all ${
            user === 'user' ? 'hover:bg-uAccent' : 'hover:bg-sAccent'
          }`}
        >
          <FaSearch className="scale-110 " />
        </button>
      </div>
      {/* right */}
      <nav className="hidden lg:block ml-4">
        <ul className="flex gap-x-2">
          <ul className="flex gap-x-4">
            {navbarLinks.map((item) => (
              <li
                key={item.link}
                className={`${
                  user === 'user' ? 'hover:text-uAccent' : 'hover:text-sAccent'
                } ${
                  page === item.link &&
                  (user === 'user' ? 'text-uAccent' : 'text-sAccent')
                } `}
              >
                <Link to={item.link}>{item.text}</Link>
              </li>
            ))}
          </ul>
        </ul>
      </nav>
      {/* sidebar */}
      <button className="lg:hidden" onClick={toggleSidebar}>
        <GiHamburgerMenu
          className={` h-6 w-6 ${
            user === 'user' ? 'hover:text-uAccent' : 'hover:text-sAccent'
          } `}
        />
      </button>
      {isSidebarOpen && (
        <div
          className="lg:hidden  fixed top-0 left-0 w-full h-full bg-black/50 z-[100]"
          onClick={toggleSidebar}
        />
      )}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        sidebarLinks={sidebarLinks}
        page={page}
        user={user}
        logout={logout}
      />
    </header>
  )
}
export default Navbar
