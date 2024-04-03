/* eslint-disable react/prop-types */
const Button = ({ text, onClick, activate=true }) => {
  return (
    <div className="center-flex m-3">
      <button
        type="button"
        className="btn btn-outline-light"
        onClick={onClick}
        disabled={!activate}
      >
        {text}
      </button>
    </div>
  )
}

export default Button
