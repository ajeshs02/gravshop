import { body } from 'express-validator'

// user/store registration validation schema
export const validateRegistration = [
  body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name must only contain letters'),
  body('email').trim().isEmail().withMessage('Invalid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*\d)[a-zA-Z\d]+$/)
    .withMessage('Password must contain at least one digit'),
  body('mobile')
    .trim()
    .matches(/^[0-9]{10}$/)
    .withMessage('Enter a valid mobile number'),
  body('description')
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be less than 500 characters')
    .optional({ nullable: true, checkFalsy: true }),
]
