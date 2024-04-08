import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  name: null,
  email: null,
  mobile: null,
  profile: null,
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { id, name, email, mobile, profile } = action.payload
      state.id = id
      state.name = name
      state.email = email
      state.mobile = mobile
      state.profile = profile
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.id = null
      state.name = null
      state.email = null
      state.mobile = null
      state.profile = null
      state.isAuthenticated = false
    },
    update: (state, action) => {
      const { name, email, mobile, profile } = action.payload
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
    },
  },
})

export const { login, logout, update } = userSlice.actions

export default userSlice.reducer
