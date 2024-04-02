import { createSlice } from "@reduxjs/toolkit"


//ejemplo, pendiente de cambiar
const initialState = {
  id: "",
}

export const idSlice = createSlice({
  name: "idSlicer",
  initialState,
  reducers: {
    //funciones de reducer:
    addId: (state, action) => {
      //desestructuración de lo que va a venir en payload
      const { id } = action.payload
      //se añade a initialState
      state.id = id
    },
  },
})

export const { addId } = idSlice.actions
export default idSlice.reducer
