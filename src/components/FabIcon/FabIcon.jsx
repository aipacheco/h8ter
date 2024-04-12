/* eslint-disable react/prop-types */
import Fab from "@mui/material/Fab"
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp"
import { ThemeProvider } from "@mui/material/styles"
import { FabTheme, PinkTheme } from "../../utils/themes"
import AddIcon from "@mui/icons-material/Add"
import PersonIcon from "@mui/icons-material/Person"

const Fabicon = ({ onClick, style, icon, custom }) => {
  
  const icons = {
    add: AddIcon,
    person: PersonIcon,
    default: KeyboardDoubleArrowUpIcon,
  }

  const Icon = icons[icon] || icons.default

  const customTheme = custom === "pink" ? PinkTheme : FabTheme

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
