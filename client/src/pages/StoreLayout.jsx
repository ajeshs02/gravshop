import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import { storeNavbarLinks, storeSidebarLinks } from '../constants/constants'

const StoreLayout = () => {
  return (
    <div className="mt-24 wrapper">
      <Navbar
        navbarLinks={storeNavbarLinks}
        sidebarLinks={storeSidebarLinks}
        user="store"
      />
      <Outlet />
    </div>
  )
}

export default StoreLayout
