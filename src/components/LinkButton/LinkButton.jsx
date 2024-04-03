/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import "./LinkButton.css"

export const LinkButton = ({ direction, text }) => {

  return (
    <div>
      <Link to={`${direction}`}>
        <button id="link-button"  className="btn btn-outline-light">
          {text}
        </button>
      </Link>
    </div>
  )
}

export default LinkButton
