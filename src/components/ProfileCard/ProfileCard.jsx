/* eslint-disable react/prop-types */
import "./ProfileCard.css"
import { useState } from "react"
import { Modal } from "reactstrap"
import CloseIcon from "@mui/icons-material/Close"
import AlertCustom from "../AlertCustom/AlertCustom"
import ButtonCustom from "../ButtonCustom/ButtonCustom"
import Fabicon from "../FabIcon/FabIcon"
import { useNavigate } from "react-router-dom"
import InputCustom from "../InputCustom/InputCustom"
import { UpdateProfile } from "../../services/userServices"
import { useSelector } from "react-redux"
import Spinner from "../Spinner/Spinner"

const ProfileCard = ({ banner, avatar, username, description, edit }) => {
  const [editProfile, setEditProfile] = useState({ description: "" })
  const [editProfileError, setEditProfileError] = useState({ contentError: "" })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [avatarFile, setAvatarFile] = useState(null)
  const [bannerFile, setBannerFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [alert, setAlert] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(avatar)
  const [bannerPreview, setBannerPreview] = useState(banner)
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)

  const handleModal = () => {
    setIsModalOpen(true)
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleBannerChange = (event) => {
    const file = event.target.files[0]
    setBannerFile(file)
    setBannerPreview(URL.createObjectURL(file))
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
    setEditProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const profileDataToUpdate = {
      description: editProfile.description,
      avatar: avatarFile,
      banner: bannerFile,
    }
    try {
      const profileEdit = await UpdateProfile(profileDataToUpdate, token)
      if (profileEdit.success) {
        console.log(profileEdit.data)
        // setAvatarPreview(URL.createObjectURL(avatarFile))
        // setBannerPreview(URL.createObjectURL(bannerFile))
        // setEditProfile(profileEdit.data.description)
        // setLoading(false)
        // setIsModalOpen(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <>
      <Modal
        className="center-modal modal-form"
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(false)}
      >
        <div className="close-button" onClick={() => setIsModalOpen(false)}>
          <CloseIcon className="clickable" />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <InputCustom
              label={"Descripción"}
              type={"text"}
              name={"description"}
              value={editProfile.description || ""}
              handleChange={handleChange}
            />
            <div className="mt-3">
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="preview-image avatar-modal"
              />
              <InputCustom
                type={"file"}
                name={"avatar"}
                value={editProfile.avatar || ""}
                handleChange={handleAvatarChange}
                buttonText="Cambiar avatar"
                accept="image/*"
              />
            </div>
            <div className="mt-3 mb-3">
              <img src={bannerPreview} className="preview-image banner-modal" />
              <InputCustom
                type={"file"}
                name={"banner"}
                value={editProfile.banner || ""}
                handleChange={handleBannerChange}
                buttonText="Cambiar Banner"
                accept="image/*"
              />
            </div>
            <ButtonCustom
              text={"Guardar cambios"}
              isFormComplete={true}
              handleSubmit={handleEditSubmit}
            />
          </>
        )}
      </Modal>

      <div className="container">
        <div className="card jumbotron">
          <img src={bannerPreview || banner} className="card-img" />
          <div className="card-img-overlay">
            <div className="avatar">
              <img
                className="avatar-img"
                src={avatarPreview || avatar}
                alt="Avatar"
              />
            </div>
            {edit && (
              <Fabicon
                className="edit-fab"
                onClick={handleModal}
                icon={"edit"}
                custom={"edit"}
                style={{ position: "absolute", top: 300, right: 20 }}
              />
            )}
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
