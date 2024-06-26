/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import "./PostDetail.css"
import { useNavigate, Link } from "react-router-dom"
import moment from "moment"
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined"
import { useEffect, useState } from "react"
import { PutLike } from "../../services/postServices"
import { useSelector } from "react-redux"
import PostCreator from "../PostCreate/PostCreate"

const PostDetail = ({
  content,
  publishedAt,
  username,
  avatar,
  id,
  image,
  likes = [],
}) => {
  //se setea el param likes con un valor [] para que no sea undefined
  const [userHasLiked, setUserHasLiked] = useState(false)
  const formattedDateTime = moment(publishedAt).format("DD/MM/YYYY HH:mm")
  const [iconColor, setIconColor] = useState("disabled")
  const [like, setLike] = useState([likes])
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)
  const decode = useSelector((state) => state.auth.decode)

  const handleNewPost = () => {
    // cambia el estado desde PostCreate
    navigate("/")
  }

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
      await PutLike(id, token)
    } catch (error) {
      // si falla
      setUserHasLiked(userHasLiked)
      setIconColor(!userHasLiked ? "disabled" : "secondary")
    }
  }

  //si tiene token llamamos a handleclick y sino pues nada, para que no falle
  const maybeOnClick = token ? handleClick : undefined

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
        <div className="card-body post-single">
          <div className="col-12">
            <p>{content}</p>
          </div>
        </div>
        <div className="icon-container">
          <BoltOutlinedIcon
            // se aplica esta class solo si hay token para que tenga cursor pointer
            className={token ? "clickable" : "white"}
            color={iconColor}
            fontSize="large"
            onClick={maybeOnClick}
          />
           {token && <span className="likes-count">{likes.length}</span>}
          <div className="card-footer text-end mt-3">{formattedDateTime}</div>
        </div>
        {token && <PostCreator token={token} onPostCreated={handleNewPost} />}
      </div>
    </div>
  )
}

export default PostDetail
