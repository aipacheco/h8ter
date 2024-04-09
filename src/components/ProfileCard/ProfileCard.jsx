/* eslint-disable react/prop-types */
import "./ProfileCard.css"

const ProfileCard = ({ banner, avatar }) => {
  return (
    <div className="col-10 col-md-10 col-lg-10">
      <div className="card jumbotron">
        <img src={"" || banner} className="card-img" alt="" />
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