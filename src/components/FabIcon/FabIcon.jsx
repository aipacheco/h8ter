import Fab from "@mui/material/Fab";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f8ff",
          
          color: "#2e2e2e",
          "&:hover": {
            backgroundColor: "#c8ffff",
            boxShadow:
            "2px -2px 1px rgba(255, 0, 255, 1), -2px 2px 1px rgba(0, 255, 255, 1)",
          },
        },
      },
    },
  },
})
const Fabicon = ({ scrollToTop }) => {
  return (
    <ThemeProvider theme={theme}>
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
