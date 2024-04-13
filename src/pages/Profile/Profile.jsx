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

const Profile = () => {
  const token = useSelector((state) => state.auth.token)
  const decode = useSelector((state) => state.auth.decode)

  //hay que sacar el username de los params (la barra de navegación) para pasarlo a GetProfile
  const { username } = useParams()
  const [alert, setAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState([])
  const [stateMessage, setStateMessage] = useState({
    message: "",
    className: "",
  })
  const [userPosts, setUserPosts] = useState([])
  const [refreshPosts, setRefreshPosts] = useState(false)

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const myProfile = await GetProfile(username)
      setProfile(myProfile.data)
      setUserPosts(myProfile.data.posts)
    } catch (error) {
      console.log("Error fetching profile:", error)
      setAlert(true)
      setStateMessage({
        message: `${error}`,
        className: "danger",
      })
    }
    setLoading(false)
  }
  // console.log(userPosts)
  useEffect(() => {
    fetchProfile()
  }, [username])

  const handleNewPost = () => {
    // cambia el estado desde PostCreate
    setRefreshPosts((prev) => !prev)
  }

  return (
    <>
      {loading ? (
        <Spinner />
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
            />
            {token && (
              <PostCreator token={token} onPostCreated={handleNewPost} />
            )}
          </div>
          <div className="container mt-2">
            {userPosts
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
          </div>
        </>
      )}
      <Footer />
    </>
  )
}

export default Profile
