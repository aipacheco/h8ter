import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { GetProfile } from "../../services/userServices"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import Footer from "../../components/Footer/Footer"
import Spinner from "../../components/Spinner/Spinner"

const Profile = () => {
  const token = useSelector((state) => state.auth.token)
  const decode = useSelector((state) => state.auth.decode)

  if (token & decode) {
    console.log(decode.exp)
    const dateExp = decode.exp
    const date = new Date(dateExp * 1000)
    console.log(date)
  }

  //hay que sacar el username de los params (la barra de navegación) para pasarlo a GetProfile
  //si el usuario no existe hay que renderizar un error y un botón para volver a home
  const { username } = useParams()

  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState([])
  const navigate = useNavigate()

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const myProfile = await GetProfile(username)
      setProfile(myProfile.data)
      // console.log(profile)
    } catch (error) {
      console.error("Error fetching profile:", error)
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
      ) : (
        <div className="container">
          <ProfileCard avatar={profile.avatar} banner={profile.banner} />
        </div>
      )}
      <Footer />
    </>
  )
}

export default Profile
