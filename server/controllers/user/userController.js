import { validationResult } from 'express-validator'
import OTP from '../../models/otpModel.js'
import User from '../../models/userModel.js'
import { generateToken } from '../../utils/generateToken.js'
import { handleError } from '../../utils/handleError.js'
import otpGenerator from 'otp-generator'

//@desc Send OTP before user Registration
//@route POST/api/user/send-otp
//@access Public
const sendOTP = async (req, res) => {
  const { email } = req.body

  if (!email) {
    return res
      .status(400)
      .json({ message: 'Email is mandatory', success: false })
  }
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: {
          type: 'EmailInUse',
          message: 'Email already in use',
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

//@desc Verify OTP and User Registration
//@route POST/api/user/register
//@access Public
const registerUser = async (req, res) => {
  const { name, email, password, mobile, otp } = req.body

  // validation
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        type: 'ValidationError',
        message: 'User registration data is not valid.',
        errors: errors.array(),
      },
    })
  }

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: {
          type: 'EmailInUse',
          message: 'Email already in use',
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

    const user = await User.create({
      name,
      email,
      password,
      mobile,
    })

    const userWithoutPassword = {
      id: user._id,
      name: user.name,
      image: user.image,
      email: user.email,
      mobile: user.mobile,
    }

    res.status(200).json({
      success: true,
      message: 'OTP verified and User registered successfully',
      user: userWithoutPassword,
    })
  } catch (error) {
    handleError(error)
  }
}

//@desc User Login
//@route POST/api/users/login
//@access Public
const loginUser = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'All fields are mandatory', success: false })
  }

  try {
    const user = await User.findOne({ email }).select('+password')

    // console.log(user, email, password)
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id)
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 3 * 24 * 60 * 60 * 1000,
      })

      const userWithoutPassword = {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      }

      res.status(201).json({
        message: 'user logged in successfully',
        success: true,
        user: userWithoutPassword,
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

// @desc   Logout user
// route   POST/api/users/logout
// @access Private
const logoutUser = async (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })

    res.status(200).json({ success: true, message: 'Log out successful' })
  } catch (error) {
    handleError(error)
  }
}

export { registerUser, sendOTP, loginUser, logoutUser }
