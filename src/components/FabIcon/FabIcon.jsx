/* eslint-disable react/prop-types */
import Fab from "@mui/material/Fab"
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp"
import { ThemeProvider } from "@mui/material/styles"
import { FabTheme } from "../../utils/themes"
import { useState } from "react"

const Fabicon = ({ onClick, style }) => {
  const [style, setStyle] = useState({ position: "", bottom: 0, right: 0 })

  return (
    <ThemeProvider theme={FabTheme}>
      <Fab
        className="fab-button"
        onClick={onClick}
        aria-label="add"
        style={style}
      >
        <KeyboardDoubleArrowUpIcon />
      </Fab>
    </ThemeProvider>
  )
}

export default Fabicon
