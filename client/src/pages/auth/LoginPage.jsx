import UserLogin from './userAuth/UserLogin'
import { useEffect, useState } from 'react'
import StoreLogin from './storeAuth/StoreLogin'
import { FaStore, FaUserAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginPage } from '../../state/slices/formSlice'

const LoginPage = () => {
  const [activePage, setActivePage] = useState('UserLogin')

  const loginPage = useSelector((state) => state.form.loginPage)

  const dispatch = useDispatch()

  const handleButtonClick = (page) => {
    dispatch(setLoginPage(page))
    setActivePage(page)
  }

  useEffect(() => {
    if (loginPage === 'UserLogin') {
      setActivePage('UserLogin')
    } else {
      setActivePage('StoreLogin')
    }
  }, [loginPage])

  return (
    <div className=" flex flex-col min-h-screen h-auto items-center justify-center mx-auto">
      <div className="w-[95%] mx-4 sm:w-2/4 md:w-1/4  flex flex-col items-center min-w-96  rounded-3xl  overflow-hidden border border-gray-400/45 shadow-lg bg-secondary">
        <div className="w-full  flex justify-center h-20  ">
          <button
            className={`w-full border border-uAccent/50 font-bold text-uAccent rounded-tl-3xl flex-center ${
              activePage === 'UserLogin' && 'bg-uAccent text-white'
            }`}
            onClick={() => handleButtonClick('UserLogin')}
          >
            <FaUserAlt className="scale-125" />
          </button>
          <button
            className={`w-full border border-sAccent/50  rounded-tr-3xl font-bold text-sAccent flex-center ${
              activePage === 'StoreLogin' && 'bg-sAccent text-white'
            }`}
            onClick={() => handleButtonClick('StoreLogin')}
          >
            <FaStore className="scale-125" />
          </button>
        </div>
        {loginPage === 'UserLogin' ? <UserLogin /> : <StoreLogin />}
      </div>
    </div>
  )
}
export default LoginPage
