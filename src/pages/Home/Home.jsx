import "./Home.css"
import { useEffect, useState } from "react"
import { CreatePost, GetPosts } from "../../services/postServices"
import Footer from "../../components/Footer/Footer"
import PostCard from "../../components/PostCard/PostCard"
import Fabicon from "../../components/FabIcon/FabIcon"
import Spinner from "../../components/Spinner/Spinner"
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom"
import { Modal } from "reactstrap"
import { useSelector } from "react-redux"

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [likes, setLikes] = useState([])
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newPost, setNewPost] = useState({})
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [alert, setAlert] = useState(false)
  const token = useSelector((state) => state.auth.token)
  const decode = useSelector((state) => state.auth.decode)

  //función para el botón de volver hacia arriba
  const handleScroll = () => {
    if (window.pageYOffset > 500) {
      setShowScrollButton(true)
    } else {
      setShowScrollButton(false)
    }
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    // limpia el evento para evitar efectos secundarios
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
    setLikes(posts.likes)
  }, [likes, posts.likes])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const allPosts = await GetPosts()
      setPosts(allPosts.data)
      // console.log(posts)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchPosts()
  }, [newPost])

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
  const handlePost = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const postCreation = await CreatePost(newPost, token)
      if (postCreation.success) {
        setAlert(true)
        setStateMessage({
          message: postCreation.message,
          className: "success",
        })
        setTimeout(() => {
          setAlert(false)
        }, 1200)
      }
      setNewPost(postCreation)
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
        <form className="p-3 " onSubmit={handlePost}>
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
            handleSubmit={handlePost}
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

      <Fabicon
        onClick={handleModal}
        icon={"add"}
        custom={"pink"}
        style={{ position: "fixed", bottom: 100, left: 30 }}
      />

      <div className="container">
        {posts
          .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
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
            />
          ))}
        {showScrollButton && (
          <div>
            <Fabicon
              onClick={scrollToTop}
              style={{ position: "fixed", bottom: 100, right: 30 }}
            />
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

export default Home
