import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  storeName: null,
  email: null,
  mobile: null,
  profile: null,
  description: null,
  isAuthenticated: false,
}

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    login: (state, action) => {
      const { id, name, email, mobile, profile, description } = action.payload
      state.id = id
      state.name = name
      state.email = email
      state.mobile = mobile
      state.profile = profile
      state.description = description
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.id = null
      state.name = null
      state.email = null
      state.mobile = null
      state.profile = null
      state.description = null
      state.isAuthenticated = false
    },
    update: (state, action) => {
      const { name, email, mobile, profile, description } = action.payload
      if (name) {
        state.name = name
      }
      if (email) {
        state.email = email
      }
      if (mobile) {
        state.mobile = mobile
      }
      if (profile) {
        state.profile = profile
      }
      if (description) {
        state.description = description
      }
    },
  },
})

export const { login, logout, update } = storeSlice.actions

export default storeSlice.reducer
