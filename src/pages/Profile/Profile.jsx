/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { GetProfile } from "../../services/userServices"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import Footer from "../../components/Footer/Footer"
import Spinner from "../../components/Spinner/Spinner"
import AlertCustom from "../../components/AlertCustom/AlertCustom"
import PostCreator from "../../components/PostCreate/PostCreate"
import PostCard from "../../components/PostCard/PostCard"
import { DeletePost } from "../../services/postServices"
import { Modal } from "reactstrap"
import CloseIcon from "@mui/icons-material/Close"

const Profile = () => {
  const [alert, setAlert] = useState(false)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState([])
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [userPosts, setUserPosts] = useState([])
  const [refreshPosts, setRefreshPosts] = useState(false)
  const [ownProfile, setOwnProfile] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const token = useSelector((state) => state.auth.token)
  const decode = useSelector((state) => state.auth.decode)

  //hay que sacar el username de los params (la barra de navegación) para pasarlo a GetProfile
  const { username } = useParams()

  useEffect(() => {
    if (token && decode.username === username) {
      setOwnProfile(true)
    } else {
      setOwnProfile(false)
    }
  }, [token, decode, username])

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const myProfile = await GetProfile(username)
      setProfile(myProfile.data)
      setUserPosts(myProfile.data.posts)
    } catch (error) {
      console.log("Error fetching profile:", error)
      setLoading(false)
      setAlert(true)
      setStateMessage({
        message: `${error}`,
        className: "danger",
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProfile()
  }, [username, refreshPosts])

  const handleNewPost = () => {
    // cambia el estado desde PostCreate
    setRefreshPosts((prev) => !prev)
  }
  const handleModal = (id) => {
    setSelectedId(id)
    setIsModalOpen(true)
  }

  const handleDeletePost = async () => {
    setLoading(true)
    const id = selectedId
    try {
      const deletedPost = await DeletePost(id, token)
      if (deletedPost.success) {
        // actualiza el estado de userPosts eliminando el post borrado
        setUserPosts((currentPosts) => {
          const updatedPosts = currentPosts.filter((post) => post._id !== id)
          return [...updatedPosts]
        })
      }
      setLoading(false)
      setIsModalOpen(false)
    } catch (error) {
      console.log(error)
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
  }

  return (
    <>
      <>
        <Modal
          className="center-modal"
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen(false)}
        >
          <h2>Confirmar Eliminación</h2>
          <p>¿Estás seguro de que deseas eliminar el post?</p>
          <button
            className="btn btn-outline-info mb-2"
            onClick={handleDeletePost}
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
      </>
      {loading ? (
        <div className="centered-container">
          <Spinner />
        </div>
      ) : alert ? (
        <div className="container p-5 mt-5 text-center w-25">
          <AlertCustom
            className={stateMessage.className}
            message={stateMessage.message}
          />
          <div>
            Volver a{" "}
            <Link id="login-link" to="/">
              Inicio
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="container mt-5">
            <ProfileCard
              avatar={profile.avatar}
              banner={profile.banner}
              username={profile.username}
              description={profile.description}
              edit={ownProfile}
              //lo llamo igual para ahorrar código
              onEdit={handleNewPost}
            />

            {token && (
              <PostCreator token={token} onPostCreated={handleNewPost} />
            )}
          </div>

          {userPosts && (
            <div className="container mt-2">
              {userPosts
                .sort(
                  (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
                )
                .map((post) => (
                  <PostCard
                    key={post._id}
                    id={post._id}
                    content={post.content}
                    username={post.authorUsername}
                    publishedAt={post.publishedAt}
                    avatar={post.avatar}
                    image={post.image}
                    likes={post.likes}
                    canDelete={ownProfile}
                    onDelete={() => handleModal(post._id)}
                  />
                ))}
            </div>
          )}
        </>
      )}

      <Footer />
    </>
  )
}

export default Profile
