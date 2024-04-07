import LinkButton from "../LinkButton/LinkButton"
import "./Footer.css"

const Footer = () => {

    //pendiente: lógica del componente para no mostrarse si el user tiene token

  return (
    <nav className="navbar bg-body-secondary fixed-bottom mt-5">
      <div className="container justify-content-center">
        <LinkButton direction={"/login"} text={"Login"} />
        O
        <LinkButton direction={"/register"} text={"Registrate"} />
      </div>
    </nav>
  )
}

export default Footer
