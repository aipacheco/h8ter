import LinkButton from "../LinkButton/LinkButton"
import "./Footer.css"

const Footer = () => {

    //pendiente: lógica del componente para no mostrarse si el user tiene token

  return (
    <nav className="navbar bg-body-secondary fixed-bottom">
      <div className="container justify-content-around">
        <LinkButton direction={"/login"} text={"Login"} />
       
        <LinkButton direction={"/register"} text={"Registrate"} />
      </div>
    </nav>
  )
}

export default Footer
