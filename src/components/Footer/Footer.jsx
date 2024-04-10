import LinkButton from "../LinkButton/LinkButton"
import { useSelector } from "react-redux"
import "./Footer.css"

const Footer = () => {
  const token = useSelector((state) => state.auth.token)

  return (
    <>
      {!token && (
        <nav className="navbar bg-body-secondary fixed-bottom footer">
          <div className="container justify-content-around">
            <LinkButton direction={"/login"} text={"Login"} />

            <LinkButton direction={"/register"} text={"Registrate"} />
          </div>
        </nav>
      )}
    </>
  )
}

export default Footer
