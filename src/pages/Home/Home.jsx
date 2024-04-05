import { useEffect, useState } from "react"
import { GetPosts } from "../../services/postServices"
import PostCard from "../../components/PostCard/PostCard"
import Fabicon from "../../components/FabIcon/FabIcon"


const Home = () => {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [scrollButtonClassName, setScrollButtonClassname] = useState("")
  const [showScrollButton, setShowScrollButton] = useState(false)

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

  return (
    <>
   
      <div className="row m-0 p-0">
        <div className="col-md-3 col-lg-3 order-md-1">
          <div className="container sticky-top">
            <h1 className="center-flex text-center">Barra lateral</h1>
          </div>
        </div>

        <div className="col-md-8 col-lg-8 order-md-2">
          <div className="column">
            {posts.map((post, index) => (
              <PostCard
                key={index}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            ))}
          </div>
        </div>
        {showScrollButton && (
          <div>
         <Fabicon scrollToTop={scrollToTop} />
          </div>
        )}
      </div>

    </>
  )
}

export default Home
