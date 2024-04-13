/* eslint-disable react/prop-types */
import "./ProfileCard.css"

const ProfileCard = ({ banner, avatar, username, description }) => {
  return (
    <>
      <div className="container">
        <div className="card jumbotron">
          <img src={"" || banner} className="card-img" />
          <div className="card-img-overlay">
            <div className="avatar">
              <img className="avatar-img" src={avatar} alt="avatar" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-2">
        <div className="text-center">
          <h3>{username}</h3>
          <div className="user-description">
            <i>{description}</i>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileCard
