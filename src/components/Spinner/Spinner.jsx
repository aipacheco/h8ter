import "./Spinner.css"
import Bolt from './../../assets/Bolt.svg'

const Spinner = () => {
  return (
    <div className="center-flex">
      {" "}
      <img
        src={Bolt}
        alt="Cargando..."
        className="loading-image"
      />
    </div>
  )
}

export default Spinner
