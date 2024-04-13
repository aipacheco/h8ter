/* eslint-disable react/prop-types */
import "./PostCreate.css"
import { CreatePost } from "../../services/postServices"
import { CheckForm, checkAllEmpty, validator } from "../../utils/utils"
import AlertCustom from "../AlertCustom/AlertCustom"
import ButtonCustom from "../ButtonCustom/ButtonCustom"
import { Modal } from "reactstrap"
import Fabicon from "../../components/FabIcon/FabIcon"
import CloseIcon from "@mui/icons-material/Close"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const PostCreator = ({ token, onPostCreated }) => {
  const [newPost, setNewPost] = useState({ content: "" })
  const [newPostError, setNewPostError] = useState({ contentError: "" })
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [alert, setAlert] = useState(false)
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const decode = useSelector((state) => state.auth.decode)

  //comprobar funcionamiento
  useEffect(() => {
    const isErrorClean = checkAllEmpty(newPostError)
    const isUserComplete = CheckForm(newPost)
    if (isErrorClean && isUserComplete) {
      setIsFormComplete(true)
    } else {
      setIsFormComplete(false)
    }
  }, [newPost, newPostError])

  const handleModal = () => {
    setIsModalOpen(true)
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }))
    const error = validator(value, name)
    setNewPostError((prev) => ({
      ...prev,
      [name + "Error"]: error,
    }))
  }

  const handlePost = async (e) => {
    e.preventDefault()
    try {
      const postCreation = await CreatePost(newPost, token)
      if (postCreation.success) {
        setStateMessage({
          message: postCreation.message,
          className: "success",
        })
        setTimeout(() => {
          setAlert(false)
        }, 1200)
        onPostCreated()
      }
      setNewPost(postCreation)
      setIsModalOpen(false)
    } catch (error) {
      setAlert(true)
      setStateMessage({
        message: `${error}`,
        className: "danger",
      })
    }
  }

  return (
    <>
      <Modal
        className="center-modal modal-form"
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(false)}
      >
        <div
          className="close-button"
          onClick={() => {
            setIsModalOpen(false)
          }}
        >
          <CloseIcon className="clickable" />
        </div>
        {alert ? (
          <div className="d-flex justify-content-center mt-3">
            <AlertCustom
              className={stateMessage.className}
              message={stateMessage.message}
            />
          </div>
        ) : (
          <>
            <textarea
              className="input-modal"
              name="content"
              placeholder="Escribe qué es lo que odias más"
              value={newPost.content}
              onChange={handleChange}
              rows="4"
            />
            <div className="error">{newPostError.contentError}</div>
            <ButtonCustom
              text={"Guardar cambios"}
              handleSubmit={handlePost}
              isFormComplete={isFormComplete}
            />
            <div className="d-flex justify-content-center"></div>
          </>
        )}
      </Modal>

      <>
        <Fabicon
          onClick={handleModal}
          icon={"add"}
          custom={"pink"}
          style={{ position: "fixed", bottom: 100, left: 30 }}
        />
        <Fabicon
          onClick={() => navigate(`/${decode.username}`)}
          icon={"person"}
          custom={"blink"}
          style={{ position: "fixed", bottom: 200, left: 30 }}
        />
      </>
    </>
  )
}
export default PostCreator
