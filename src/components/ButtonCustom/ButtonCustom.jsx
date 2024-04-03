/* eslint-disable react/prop-types */
import "./ButtonCustom.css"
const ButtonCustom = ({ text, onClick, activate=true }) => {
  return (
    <div className="center-flex m-3">
      <button
        type="button"
        className="btn btn-outline-info"
        onClick={onClick}
        disabled={!activate}
      >
        {text}
      </button>
    </div>
  )
}

export default ButtonCustom
