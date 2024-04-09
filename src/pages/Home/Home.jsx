import "./Home.css"
import { useEffect, useState } from "react"
import { GetPosts } from "../../services/postServices"
import PostCard from "../../components/PostCard/PostCard"
import Fabicon from "../../components/FabIcon/FabIcon"
import Sidebar from "../../components/Sidebar/Sidebar"

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [showScrollButton, setShowScrollButton] = useState(false)

  //función para el botón de volver hacia arriba
  const handleScroll = () => {
    if (window.pageYOffset > 500) {
      setShowScrollButton(true)
    } else {
      setShowScrollButton(false)
    }
  }
  // const handleClick = () => {
  //   console.log("hola")
  // }
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
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const allPosts = await GetPosts()
      setPosts(allPosts.data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])
  // console.log(posts)
  return (
    <>
      <div className="row flex-nowrap p-0 m-0">
        <Sidebar />
        <div className="col-10 col-md-10 col-lg-10">
          {posts.map((post, index) => (
            <PostCard
              key={index}
              content={post.content}
              username={post.authorUsername}
              publishedAt={post.publishedAt}
              avatar={post.avatar}
            />
          ))}

          {showScrollButton && (
            <div>
              <Fabicon scrollToTop={scrollToTop} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
