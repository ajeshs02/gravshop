import { Outlet } from 'react-router-dom'
const AdminLayout = () => {
  return (
    <div className="mt-24 wrapper">
      <Outlet />
    </div>
  )
}

export default AdminLayout
