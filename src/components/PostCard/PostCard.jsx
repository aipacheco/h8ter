/* eslint-disable react/prop-types */
import "./PostCard.css"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined"
import { useEffect, useState } from "react"
import { Like } from "../../services/postServices"
import { useSelector } from "react-redux"

const PostCard = ({
  likes,
  content,
  publishedAt,
  username,
  avatar,
  id,
  image,
  userLoggedId,
}) => {
  const token = useSelector((state) => state.auth.token)
  const [like, setLike] = useState([likes])
  const [userHasLiked, setUserHasLiked] = useState(false)
  const formattedDateTime = format(publishedAt, "dd-MM-yyyy HH:mm:ss")
  const [iconColor, setIconColor] = useState("action")

  /*usamos el useEffect para que al cargar el componente se compuebe 
  si el usuario ha dado like previamente al post y pintarlo de otro color 
  para que se vea */
  const hasLiked = likes.includes(userLoggedId)

  useEffect(() => {
    setUserHasLiked(hasLiked)
    if (hasLiked) {
      setIconColor("primary")
    }
  }, [likes, userLoggedId, hasLiked])

  const handleClick = async () => {
    //se cambia el color y el estado antes de la llamada
    setUserHasLiked(!userHasLiked)
    //ternaria para cambiar el color del icono
    setIconColor(userHasLiked ? "action" : "primary") 
    try {
      await Like(id, token)
    } catch (error) {
      // si falla
      setUserHasLiked(userHasLiked) 
      setIconColor(!userHasLiked ? "action" : "primary") 
    }
  }

  // console.log("la variable ", userHasLiked)
  // console.log("el id del post", id)
  // console.log("el id del usuario", userLoggedId)

  return (
    <div className="container mt-3">
      <div className="card card-post">
        <div className="avatar-container">
          <img className="avatar-post" src={avatar} alt="avatar" />
          <Link to={`/${username}`}>
            <div>{username}</div>
          </Link>
        </div>
        {image && <img src={image} className="card-img-top" alt="..."></img>}
        <div className="card-body">
          <div className="col-12">
            <p>{content}</p>
            <div className="icon-container">
              <BoltOutlinedIcon
                color={iconColor}
                fontSize="large"
                onClick={handleClick}
              />
            </div>
            <p className="card-datetime"></p>
          </div>
        </div>
      </div>
      <div className="card-footer text-end text-body-secondary">
        {formattedDateTime}
      </div>
    </div>
  )
}

export default PostCard
