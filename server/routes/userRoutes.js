import { Router } from 'express'
import {
  loginUser,
  logoutUser,
  registerUser,
  sendOTP,
} from '../controllers/user/userController.js'
import { validateRegistration } from '../helpers/validation.js'
const router = Router()

router.post('/send-otp', sendOTP)
router.post('/register', validateRegistration, registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

export { router as userRouter }
