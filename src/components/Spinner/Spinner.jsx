import "./Spinner.css"
import reactImage from './../../assets/react.svg'

const Spinner = () => {
  return (
    <div className="container-fluid center-flex mt-5">
      {" "}
      <img
        src={reactImage}
        alt="Cargando..."
        className="loading-image"
      />
    </div>
  )
}

export default Spinner
