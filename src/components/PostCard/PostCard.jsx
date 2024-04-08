import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
const PostCard = ({ content, publishedAt, username }) => {
  return (
    <div className="container mt-3">
      <div className="card card-post">
        <Link to={`/${username}`}>
          <div>{username}</div>
        </Link>
        <div className="card-body">
          <div className="col-12">
            <p>{content}</p>
            <p className="card-datetime">{publishedAt}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
