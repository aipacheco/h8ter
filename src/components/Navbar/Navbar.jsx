import { Link } from "react-router-dom"
import "./Navbar.css"
const Navbar = () => {
  return (
    <>
      <div className="bg-body-secondary nav justify-content-center mt-3 sticky-top ">
        <div className="nav-item">
          <Link to="/" replace>
            <h1>H8</h1>
          </Link>
        </div> 
      </div>
    </>
  )
}

export default Navbar
