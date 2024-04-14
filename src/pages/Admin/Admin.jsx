/* eslint-disable react-hooks/exhaustive-deps */
import "./Admin.css"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Modal } from "reactstrap"
import DataTable from "react-data-table-component"
import { customStyles } from "../../utils/themes"
import Spinner from "../../components/Spinner/Spinner"
import AlertCustom from "../../components/AlertCustom/AlertCustom"
import { GetAllUsers, InactivateUser } from "../../services/userServices"

const Admin = () => {
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)
  const decode = useSelector((state) => state.auth.decode)
  const [loading, setLoading] = useState(false)
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [alert, setAlert] = useState(false)
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  //para el modal de eliminar
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isSuperAdmin = token && decode.role === "super_admin"

  const fetchData = async () => {
    setLoading(true)
    //pendiente manejo de errores
    const usersData = await GetAllUsers(token)
    setUsers(usersData.data)
    setLoading(false)
  }

  useEffect(() => {
    if (isSuperAdmin) {
      fetchData()
    } else {
      navigate("/")
    }
  }, [token])

  const columns = [
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "activo/inactivo",
      selector: (row) => (row.isActive ? "Activo" : "Inactivo"),
      sortable: true,
    },
    {
      name: "Inactivar",
      cell: (row) => (
        <button
          className="btn btn-outline-info"
          onClick={() => handleDeleteClick(row)}
        >
          <i className="material-symbols-outlined">cancel</i>
        </button>
      ),
    },
  ]

  const handleDeleteClick = (user) => {
    //lo setea a selectedUser
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = async (e) => {
    e.preventDefault()
    const id = selectedUser._id
    setLoading(true)
    try {
      const inactiveUser = await InactivateUser(id, token)
      if (inactiveUser.success) {
        //hay que volver a hacer fetch para traer los datos de nuevo
        await fetchData()
        setAlert(true)
        setStateMessage({
          message: inactiveUser.message,
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
      setTimeout(() => {
        setAlert(false)
      }, 1200)
    }
    setIsModalOpen(false)
  }

  return (
    <>
      <h3 className="center-flex mt-5">Panel de administración de usuarios</h3>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <Modal
            className="center-modal"
            isOpen={isModalOpen}
            toggle={() => setIsModalOpen(false)}
          >
            <h2>Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas eliminar el usuario?</p>
            <button
              className="btn btn-outline-info mb-2"
              onClick={handleConfirmDelete}
            >
              Confirmar
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
          </Modal>

          <div className="center-flex">
            <div className="container m-5">
              {alert && (
                <div className="d-flex justify-content-center mt-3">
                  <AlertCustom
                    className={stateMessage.className}
                    message={stateMessage.message}
                  />
                </div>
              )}
              <DataTable
                columns={columns}
                data={users}
                customStyles={customStyles}
                selectableRows
                fixedHeader
                pagination
                paginationPerPage={10}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Admin
