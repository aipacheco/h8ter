import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GetPostById } from "../../services/postServices"
import PostDetail from "../../components/PostDetail/PostDetail"
import Spinner from "../../components/Spinner/Spinner"

const Post = () => {
  const [loading, setLoading] = useState(false)
  const [singlePost, setSinglePost] = useState([])
  const [author, setAuthor] = useState([])
  const { id } = useParams()

  const fetchPost = async () => {
    setLoading(true)
    try {
      const fetchedPost = await GetPostById(id)
      setSinglePost(fetchedPost.data)
      //seteamos a otro state porque sería undefined al acceder al author
      setAuthor(fetchedPost.data.author)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching profile:", error)
    }
  }

  useEffect(() => {
    fetchPost()
    console.log(singlePost)
  }, [])

  const { avatar, username } = author
  const { _id, content, publishedAt, image, likes } = singlePost

  return (
    <div>
      {loading ? (
        <div className="container centered-container">
          <Spinner />
        </div>
      ) : (
        <PostDetail
          key={_id}
          id={_id}
          content={content}
          username={username}
          publishedAt={publishedAt}
          avatar={avatar}
          image={image}
          likes={likes}
        />
      )}
    </div>
  )
}

export default Post
