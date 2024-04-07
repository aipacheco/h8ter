/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import "./LinkButton.css"

export const LinkButton = ({ direction, text }) => {
  return (
    <div>
      <div className="center-flex">
        <Link to={`${direction}`}>
          <button id="link-button" className="btn btn-outline-danger">
            {text}
          </button>
        </Link>
      </div>
    </div>
  )
}

export default LinkButton
