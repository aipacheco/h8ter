import "./Sidebar.css"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from "react"
import { Modal } from "reactstrap"
import ButtonCustom from "../ButtonCustom/ButtonCustom"
import { useSelector } from "react-redux"
import { CreatePost } from "../../services/postServices"

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newPost, setNewPost] = useState({})
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [alert, setAlert] = useState(false)
  const token = useSelector((state) => state.auth.token)
  const decode = useSelector((state) => state.auth.decode)

  const handleModal = () => {
    setIsModalOpen(true)
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
    setNewPost((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }))
  }
  const handleEditSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const profileEdit = await CreatePost(newPost, token)
      if (profileEdit.success) {
        setAlert(true)
        setStateMessage({
          message: profileEdit.message,
          className: "success",
        })
        setTimeout(() => {
          setAlert(false)
        }, 1200)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setAlert(true)
      setStateMessage({
        message: `${error}`,
        className: "danger",
      })
    }
    setIsModalOpen(false)
  }
  return (
    <>
      <Modal
        className="center-modal modal-form"
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(false)}
      >
        <form className="p-5 " onSubmit={handleEditSubmit}>
          <textarea
            className="input-modal"
            name="content"
            placeholder="Escribe qué es lo que odias más"
            value={newPost.content}
            onChange={handleChange}
            rows="4"
          />
          <div className="error">{""}</div>

          <ButtonCustom
            text={"Guardar cambios"}
            handleSubmit={handleEditSubmit}
            isFormComplete={true}
          />
          <div className="d-flex justify-content-center m-3">
            <button
              className="btn btn-outline-info"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>

      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2  min-vh-100 sticky-top">
          <a
            href="/"
            className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none margin-top"
          >
            <h1 className="fs-5 d-none d-sm-inline">H8ter</h1>
          </a>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            {/* menu que se expande */}
            <li>
              <ul
                className="collapse show nav flex-column ms-1"
                id="submenu1"
                data-bs-parent="#menu"
              >
                <li className="w-100">
                  <a href="#" className="nav-link px-0">
                    {" "}
                    <span className="d-none d-sm-inline">Item</span> 5{" "}
                  </a>
                </li>

                <li>
                  <div className="nav-link px-0 clickable custom-icon">
                    <AddCircleOutlineIcon 
                    sx={{ fontSize: 40 }}
                    onClick={handleModal} />
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar
