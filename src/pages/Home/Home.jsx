import "./Home.css"
import { useEffect, useState } from "react"
import { GetPosts } from "../../services/postServices"
import Footer from "../../components/Footer/Footer"
import PostCard from "../../components/PostCard/PostCard"
import Fabicon from "../../components/FabIcon/FabIcon"
import { useSelector } from "react-redux"
import AlertCustom from "../../components/AlertCustom/AlertCustom"
import PostCreator from "../../components/PostCreate/PostCreate"

const Home = () => {
  const [posts, setPosts] = useState([])
  const [likes, setLikes] = useState([])
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [alert, setAlert] = useState(false)
  const [refreshPosts, setRefreshPosts] = useState(false)

  const token = useSelector((state) => state.auth.token)

  const handleNewPost = () => {
    // cambia el estado desde PostCreate
    setRefreshPosts((prev) => !prev)
  }

  //funciones para el botón de volver hacia arriba
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
    try {
      const allPosts = await GetPosts()
      setPosts(allPosts.data)
    } catch (error) {
      console.log(error)
      setStateMessage({
        message: `${error}`,
        className: "danger",
      })
      setTimeout(() => {
        setAlert(false)
      }, 1200)
    }
  }

  useEffect(() => {
    fetchPosts()
    /*se añade array de refresh para que 
    renderice al crear uno nuevo desde PostCreate*/
  }, [refreshPosts])

  return (
    <>
      <div className="container">
        {alert ? (
          <AlertCustom
            className={stateMessage.className}
            message={stateMessage.message}
          />
        ) : (
          <>
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
          </>
        )}
        {token && <PostCreator token={token} onPostCreated={handleNewPost} />}
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
