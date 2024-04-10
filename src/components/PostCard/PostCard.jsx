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
}) => {
  const [like, setLike] = useState([likes])
  const [userHasLiked, setUserHasLiked] = useState(false)
  const formattedDateTime = format(publishedAt, "dd/MM/yyyy HH:mm")
  const [iconColor, setIconColor] = useState("disabled")
  const token = useSelector((state) => state.auth.token)
  const decode = useSelector((state) => state.auth.decode)

  //Hoy, en ideas de junior:
  if (token) {
    /*usamos el useEffect para que al cargar el componente se compuebe 
  si el usuario ha dado like previamente al post y pintarlo de otro color 
  para que se vea */
    const hasLiked = likes.includes(decode.userId)
    useEffect(() => {
      setUserHasLiked(hasLiked)
      if (hasLiked) {
        setIconColor("secondary")
      }
    }, [likes, hasLiked])
  }

  const handleClick = async () => {
    //se cambia el color y el estado antes de la llamada
    setUserHasLiked(!userHasLiked)
    //ternaria para cambiar el color del icono
    setIconColor(userHasLiked ? "disabled" : "secondary")
    try {
      await Like(id, token)
    } catch (error) {
      // si falla
      setUserHasLiked(userHasLiked)
      setIconColor(!userHasLiked ? "disabled" : "secondary")
    }
  }

  //si tiene token llamamos a handleclick y sino pues nada, para que no falle
  const maybeOnClick = token ? handleClick : undefined
  // console.log("la variable ", userHasLiked)
  // console.log("el id del post", id)

  return (
    <div className="container mt-3">
      <div className="card card-post p-2">
        <div className="avatar-container">
          <img className="avatar-post" src={avatar} alt="avatar" />
          <Link className="m-2" to={`/${username}`}>
            <div>{username}</div>
          </Link>
        </div>
        {image && <img src={image} className="card-img-top" alt=""></img>}
        <div className="card-body">
          <div className="col-12">
            <p>{content}</p>
            <div className="icon-container">
              <BoltOutlinedIcon
                color={iconColor}
                fontSize="large"
                onClick={maybeOnClick}
              />
              <div className="card-footer text-end mt-3">
                {formattedDateTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard
