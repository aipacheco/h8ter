import { BrowserRouter, Route, Routes } from "react-router-dom"
// import { Navbar } from "./component/navbar"
// import { Footer } from "./component/footer"
import Home from "./pages/Home/Home"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import Footer from "./components/Footer/Footer"

export const Layout = () => {
  /*una ruta se compone de una dirección y unos params, por ejemplo en editcontact le estamos pasando un id, 
  lo recogemos en el link del boton de modificar en el componente contacts.jsx
  -un param se declara poniendo : y detrás el nombre del param - */

  return (
    <div>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}
