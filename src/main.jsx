import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import store from "./store/store"
import "./index.css"
import { Layout } from "./layout.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout />
    </Provider>
  </React.StrictMode>
)
