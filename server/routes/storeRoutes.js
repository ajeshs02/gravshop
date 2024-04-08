import { Router } from 'express'
import {
  sendOTP,
  registerStore,
  loginStore,
  logoutStore,
} from '../controllers/store/storeController.js'
import { validateRegistration } from '../helpers/validation.js'
const router = Router()

router.post('/send-otp', sendOTP)
router.post('/register', validateRegistration, registerStore)
router.post('/login', loginStore)
router.post('/logout', logoutStore)

export { router as storeRouter }
