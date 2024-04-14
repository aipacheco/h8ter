/* eslint-disable react/prop-types */
import Fab from "@mui/material/Fab"
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp"
import { ThemeProvider } from "@mui/material/styles"
import {
  FabTheme,
  PinkTheme,
  OutTheme,
  EditTheme,
  JelloTheme,
} from "../../utils/themes"
import AddIcon from "@mui/icons-material/Add"
import PersonIcon from "@mui/icons-material/Person"
import LogoutIcon from "@mui/icons-material/Logout"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import HomeIcon from "@mui/icons-material/Home"
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount"

const Fabicon = ({ onClick, style, icon, custom }) => {
  //mapeo de iconos
  const icons = {
    add: AddIcon,
    person: PersonIcon,
    logout: LogoutIcon,
    edit: ModeEditIcon,
    home: HomeIcon,
    admin: SupervisorAccountIcon,
    default: KeyboardDoubleArrowUpIcon,
  }
  const Icon = icons[icon] || icons.default

  //mapeo de temas
  const addTheme = {
    pink: PinkTheme,
    blink: JelloTheme,
    out: OutTheme,
    edit: EditTheme,
    default: FabTheme,
  }

  const customTheme = addTheme[custom] || addTheme.default

  return (
    <ThemeProvider theme={customTheme}>
      <Fab
        className="fab-button"
        onClick={onClick}
        aria-label="add"
        style={style}
      >
        <Icon />
      </Fab>
    </ThemeProvider>
  )
}

export default Fabicon
