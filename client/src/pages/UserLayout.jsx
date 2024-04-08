import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import { userNavbarLinks, userSidebarLinks } from '../constants/constants'

const UserLayout = () => {
  return (
    <div className="mt-24 wrapper">
      <Navbar navbarLinks={userNavbarLinks} sidebarLinks={userSidebarLinks} />
      <Outlet />
    </div>
  )
}

export default UserLayout
