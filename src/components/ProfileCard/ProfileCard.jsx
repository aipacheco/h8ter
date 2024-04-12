/* eslint-disable react/prop-types */
import "./ProfileCard.css"

const ProfileCard = ({ banner, avatar }) => {
  return (
    <div className="container">
      <div className="card jumbotron">
        <img src={"" || banner} className="card-img"/>
        <div className="card-img-overlay">
          <div className="avatar">
            <img className="avatar-img" src={avatar} alt="avatar" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard