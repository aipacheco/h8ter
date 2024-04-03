import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    role: null
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload.token
      state.role = action.payload.role

    },
    clearAuthToken: (state) => {
      state.token = null
      state.role = null
    },
  },
})

export const { setAuthToken, clearAuthToken } = authSlice.actions

export default authSlice.reducer
