import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { GetProfile } from "../../services/userServices"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import Footer from "../../components/Footer/Footer"
import Spinner from "../../components/Spinner/Spinner"
import AlertCustom from "../../components/AlertCustom/AlertCustom"

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
  const navigate = useNavigate()

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const myProfile = await GetProfile(username)
      setProfile(myProfile.data)
      // console.log(profile)
    } catch (error) {
      console.log("Error fetching profile:", error)
      setAlert(true)
      setStateMessage({
        message: `${error}`,
        className: "danger",
      })
      // setTimeout(() => {
      //   setAlert(false)
      //   navigate("/")
      // }, 1200)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProfile()
  }, [token])

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
            Volver a {" "}
            <Link id="login-link" to="/">
              Inicio
            </Link>
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <ProfileCard avatar={profile.avatar} banner={profile.banner} />
        </div>
      )}
      <Footer />
    </>
  )
}

export default Profile
