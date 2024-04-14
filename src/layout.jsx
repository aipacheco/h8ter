import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import Navbar from "./components/Navbar/Navbar"
import Profile from "./pages/Profile/Profile"
import Post from "./pages/Post/Post"
import Admin from "./pages/Admin/Admin"


export const Layout = () => {
  /*una ruta se compone de una dirección y unos params, por ejemplo en profile le estamos pasando un username, 
  -un param se declara poniendo : y detrás el nombre del param - */

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/admin" element={<Admin />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}
