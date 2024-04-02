import { configureStore } from "@reduxjs/toolkit"
import reducer from "./idSlice"

const store = configureStore({ reducer })

export default store
