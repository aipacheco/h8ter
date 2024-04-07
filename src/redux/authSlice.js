import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload.token
    },
    clearAuthToken: (state) => {
      state.token = null
    },
  },
})

export const { setAuthToken, clearAuthToken } = authSlice.actions

export default authSlice.reducer
