import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
const PostCard = ({ content, publishedAt, username, avatar }) => {
  return (
    <div className="container mt-3">
      <div className="card card-post">
        <div className="avatar-container">
          <img className="avatar-post" src={avatar} alt="avatar" />
          <Link to={`/${username}`}>
            <div>{username}</div>
          </Link>
        </div>
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
