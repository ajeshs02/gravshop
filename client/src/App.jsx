import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'

// authentication
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import StoreOTP from './pages/auth/storeAuth/StoreOTP'
import OTP from './pages/auth/userAuth/OTP'
// user
import HomePage from './pages/user/HomePage'
import ProductDetailsPage from './pages/user/ProductDetailsPage'
import OrdersPage from './pages/user/OrdersPage'
import CartPage from './pages/user/CartPage'
import ProfilePage from './pages/user/ProfilePage'
//store
import StoreHomePage from './pages/store/StoreHomePage'
import StoreProducts from './pages/store/StoreProductsPage'
import StoreOrders from './pages/store/StoreOrdersPage'
import StoreProfile from './pages/store/StoreProfilePage'
import StoreProductDetailsPage from './pages/store/StoreProductDetailsPage'
// general
import UserLayout from './pages/UserLayout'
import StoreLayout from './pages/StoreLayout'
import AdminLayout from './pages/AdminLayout'
//admin
import AdminHomePage from './pages/admin/AdminHomePage'
import AdminProfilePage from './pages/admin/AdminProfilePage'
import AdminStorePage from './pages/admin/AdminStorePage'
import AdminUserPage from './pages/admin/AdminUserPage'
import NotFound from './pages/user/NotFound'
import StoreNotFound from './pages/store/NotFound'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

const App = () => {
  return (
    <Router>
      <Routes>
        {/* General Routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* User Routes*/}
        <Route path="/verify-otp" element={<OTP />} />
        {/* user layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Store  Routes */}
        <Route path="/store/verify-otp" element={<StoreOTP />} />
        {/* store layout */}
        <Route path="store/" element={<StoreLayout />}>
          <Route index element={<StoreHomePage />} />
          <Route path="products" element={<StoreProducts />} />
          <Route path="product/:id" element={<StoreProductDetailsPage />} />
          <Route path="orders" element={<StoreOrders />} />
          <Route path="profile" element={<StoreProfile />} />
        </Route>

        {/* admin layout */}
        <Route path="admin/*" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="store" element={<AdminStorePage />} />
          <Route path="users" element={<AdminUserPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
        </Route>

        {/* NotFound pages */}
        <Route path="/*" element={<NotFound />} />
        <Route path="/store/*" element={<StoreNotFound />} />
      </Routes>
    </Router>
  )
}
export default App
