/* eslint-disable react/prop-types */
import Fab from "@mui/material/Fab"
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp"
import { ThemeProvider } from "@mui/material/styles"
import { FabTheme } from "../../utils/themes"

const Fabicon = ({ scrollToTop }) => {
  return (
    <ThemeProvider theme={FabTheme}>
      <Fab
        className="fab-button"
        onClick={scrollToTop}
        aria-label="add"
        style={{ position: "fixed", bottom: 100, right: 30 }}
      >
        <KeyboardDoubleArrowUpIcon />
      </Fab>
    </ThemeProvider>
  )
}

export default Fabicon
