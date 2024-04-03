/* eslint-disable react/prop-types */
import "./InputCustom.css"

const InputCustom = ({ label, type, name, onChange }) => {
  return (
    <>
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        className="form-control"
        onChange={onChange}
      ></input>
    </>
  )
}

export default InputCustom
