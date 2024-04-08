import { validationResult } from 'express-validator'
import OTP from '../../models/otpModel.js'
import Store from '../../models/storeModel.js'
import { generateToken } from '../../utils/generateToken.js'
import { handleError } from '../../utils/handleError.js'
import otpGenerator from 'otp-generator'

//@desc Send OTP before Store Registration
//@route POST/api/store/send-otp
//@access Public
const sendOTP = async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res
      .status(400)
      .json({ message: 'Email is mandatory', success: false })
  }
  try {
    const existingStore = await Store.findOne({ email })
    if (existingStore) {
      return res.status(400).json({
        success: false,
        error: {
          type: 'StoreEmailInUse',
          message: 'Store Email already in use',
        },
      })
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    })

    let existingOTP = await OTP.findOne({ email, otp })

    while (existingOTP) {
      // If the generated OTP already exists for the given email, regenerate a new one
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      })
      existingOTP = await OTP.findOne({ email, otp })
    }

    const otpBody = await OTP.create({ email, otp })

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp: otpBody,
    })
  } catch (error) {
    handleError(error)
  }
}

//@desc Verify OTP and Store Registration
//@route POST/api/store/register
//@access Public
const registerStore = async (req, res) => {
  const { name, email, password, mobile, description, otp } = req.body

  // validation
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        type: 'ValidationError',
        message: 'Store registration data is not valid.',
        errors: errors.array(),
      },
    })
  }

  try {
    const existingStore = await Store.findOne({ email })
    if (existingStore) {
      return res.status(400).json({
        success: false,
        error: {
          type: 'StoreEmailInUse',
          message: 'Store Email already in use',
        },
      })
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)

    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(401).json({
        success: false,
        error: {
          type: 'InvalidOTP',
          message: 'Expired or invalid OTP.',
        },
      })
    }

    const store = await Store.create({
      storeName: name,
      email,
      password,
      mobile,
      description,
    })

    const storeWithoutPassword = {
      id: store._id,
      name: store.storeName,
      image: store.image,
      email: store.email,
      mobile: store.mobile,
      description: store.description,
      paymentMethod: store.paymentMethod,
    }

    res.status(200).json({
      success: true,
      message: 'OTP verified and Store registered successfully',
      user: storeWithoutPassword,
    })
  } catch (error) {
    handleError(error)
  }
}

//@desc   Store Login
//@route  POST/api/stores/login
//@access Public
const loginStore = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'All fields are mandatory', success: false })
  }

  try {
    const store = await Store.findOne({ email }).select('+password')

    // console.log(user, email, password)
    if (store && (await store.matchPassword(password))) {
      const token = generateToken(store._id)
      res.cookie('storeToken', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 3 * 24 * 60 * 60 * 1000,
      })

      const storeWithoutPassword = {
        id: store._id,
        storeName: store.storeName,
        email: store.email,
        image: store.image,
        description: store.description,
      }

      res.status(201).json({
        message: 'user logged in successfully',
        success: true,
        store: storeWithoutPassword,
      })
    } else {
      res.status(401).json({
        success: false,
        error: {
          type: 'InvalidCredentials',
          message: 'Invalid email or password.',
        },
      })
    }
  } catch (error) {
    handleError(error)
  }
}

const logoutStore = async (req, res) => {
  res.cookie('store_token', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ success: true, message: 'Log out successful' })
}

export { sendOTP, registerStore, loginStore, logoutStore }
