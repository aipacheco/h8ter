import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GetPostById } from "../../services/postServices"
import PostCard from "../../components/PostCard/PostCard"

const Post = () => {
  const [loading, setLoading] = useState(false)
  const [singlePost, setSinglePost] = useState({})
  const { id } = useParams()

  const fetchPost = async () => {
    try {
      setLoading(true)
      const fetchedPost = await GetPostById(id)
      console.log("el fetched",fetchedPost)
      setSinglePost(fetchedPost.data)
      setLoading(false)
      //el avatar
      // console.log(fetchedPost.data.author.avatar)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching profile:", error)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [id])

  // console.log(singlePost.author ? singlePost.author.avatar : 'Author not loaded')

  return (
    <div>
      {loading ?(
        <div>Loading...</div>
      ): (
        <PostCard
          key={singlePost._id}
          id={singlePost._id}
          content={singlePost.content}
          username={singlePost.authorUsername}
          publishedAt={singlePost.publishedAt}
          avatar={singlePost.author.avatar}
          image={singlePost.image}
          likes={singlePost.likes}
        />
      ) }
    </div>
  )
}

export default Post
