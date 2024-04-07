import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    role: null
  },
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload.role
    },
    clearUserRole: (state) => {
      state.role = null
    },
  },
})

export const { setUserRole, clearUserRole } = userSlice.actions

export default userSlice.reducer
