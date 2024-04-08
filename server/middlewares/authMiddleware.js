import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import Store from '../models/storeModel.js'

const validateUserToken = async (req, res, next) => {
  let token

  token = req.cookies.token
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY)

      req.user = await User.findById(decoded.id)

      // Check if the user is blocked
      if (req.user.isBlocked) {
        res.status(401)
        throw new Error('User is blocked')
      }

      next()
    } catch (error) {
      res.status(401).json({ message: 'Token not valid', success: false })
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
}

// STORE AUTHENTICATION
const validateStoreToken = async (req, res, next) => {
  let token

  token = req.cookies.store_token
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY)

      req.store = await Store.findById(decoded.id)

      // Check if the user is blocked
      if (req.store.isBlocked) {
        res.status(401)
        throw new Error('Store is blocked')
      }

      next()
    } catch (error) {
      res.status(401).json({ message: 'Token not valid', success: false })
    }
  } else {
    res.status(401)
    throw new Error('store not authorized, no token')
  }
}

// ADMIN AUTHENTICATION
const isAdmin = async (req, res, next) => {
  let token

  token = req.cookies.adminToken

  // console.log(token)
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY)

      req.user = await User.findById(decoded.id)
      if (req.user.isAdmin) {
        next()
      } else {
        return res
          .status(403)
          .json({ message: 'User is not an admin!', success: false })
      }
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Token not valid', success: false })
    }
  } else {
    return res
      .status(401)
      .json({ message: 'Admin not authorized, no token', success: false })
  }
}

export { validateUserToken, validateStoreToken, isAdmin }
