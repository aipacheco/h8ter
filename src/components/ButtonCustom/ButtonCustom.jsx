/* eslint-disable react/prop-types */
import "./ButtonCustom.css"
const ButtonCustom = ({ text, handleSubmit, isFormComplete}) => {
  return (
    <div className="center-flex m-3">
      <button
        type="button"
        className="btn btn-outline-info"
        onClick={handleSubmit}
        disabled={!isFormComplete}
      >
        {text}
      </button>
    </div>
  )
}

export default ButtonCustom
