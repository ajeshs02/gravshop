import { FaUserAlt, FaUserCheck } from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa'
import { FaClipboardList } from 'react-icons/fa'
import { IoLogIn } from 'react-icons/io5'
import { FaStore } from 'react-icons/fa'
import { GoHomeFill } from 'react-icons/go'
// user navbar links
export const userNavbarLinks = [
  {
    link: '/',
    text: 'Home',
  },
  {
    link: '/cart',
    text: 'Cart',
  },
  {
    link: '/orders',
    text: 'Orders',
  },
  {
    link: '/profile',
    text: 'Profile',
  },
  {
    link: '/login',
    text: 'Sign In',
  },
]

// //user sidebar link
export const userSidebarLinks = [
  {
    icon: GoHomeFill,
    link: '/',
    text: 'Home',
  },
  {
    icon: FaShoppingCart,
    link: '/cart',
    text: 'Cart',
  },
  {
    icon: FaClipboardList,
    link: '/orders',
    text: 'Orders',
  },
  {
    icon: FaUserAlt,
    link: '/profile',
    text: 'Profile',
  },
]

// store navbar links
export const storeNavbarLinks = [
  {
    link: '/store',
    text: 'Home',
  },
  {
    link: '/store/products',
    text: 'Products',
  },
  {
    link: '/store/orders',
    text: 'Orders',
  },
  {
    link: '/login',
    text: 'Sign In',
  },
]

// //store sidebar link
export const storeSidebarLinks = [
  {
    icon: GoHomeFill,
    link: '/store',
    text: 'Home',
  },
  {
    icon: FaShoppingCart,
    link: '/store/products',
    text: 'Products',
  },
  {
    icon: FaClipboardList,
    link: '/store/orders',
    text: 'Orders',
  },
  {
    icon: FaStore,
    link: '/store/profile',
    text: 'Profile',
  },
]
