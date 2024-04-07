import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { GetProfile } from "../../services/userServices"

const Profile = () => {
  const token = useSelector((state) => state.auth.token)
  // const username = useSelector((state) => state.user.username)
  //hay que sacar el username de los params (la barra de navegación) para pasarlo a GetProfile
  //si el usuario no existe hay que renderizar un error y un botón para volver a home
  const { username } = useParams()

  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState([])

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const myProfile = await GetProfile(username)
      setProfile(myProfile.data)
    } catch (error) {
      console.error("Error fetching profile:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    // if (token && role === "super_admin") {
    //   navigate("/admin")
    // }
    // if (token && role === "user") {
    fetchProfile()
    // } else {
    //   navigate("/login")
    // }
  }, [token])

  console.log(profile)

  return <div></div>
}

export default Profile
