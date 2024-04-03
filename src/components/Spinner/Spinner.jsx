import "./Spinner.css"
import reactImage from './../../assets/react.svg'

const Spinner = () => {
  return (
    <div className="container-fluid d-flex justify-content-center mt-5">
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
