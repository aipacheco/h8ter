import { BrowserRouter, Route, Routes } from "react-router-dom"
// import { Navbar } from "./component/navbar"
// import { Footer } from "./component/footer"
import Home from "./pages/Home/Home"

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
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  )
}

injectContext(Layout)
