import "./Spinner.css"
import Bolt from './../../assets/Bolt.svg'

const Spinner = () => {
  return (
    <div className="container-fluid center-flex mt-5">
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
