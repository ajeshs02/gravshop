import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import formReducer from './slices/formSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    form: formReducer,
  },
})
