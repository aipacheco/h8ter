import { createTheme } from "@mui/material/styles"
import "../components/FabIcon/FabIcon.css"

export const FabTheme = createTheme({
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
            animation: "rotate-center 0.6s ease-in-out both",
          },
        },
      },
    },
  },
})

export const PinkTheme = createTheme({
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          backgroundColor: "#ff00ff ",

          color: "#2e2e2e",
          "&:hover": {
            backgroundColor: "#c8ffff",
            boxShadow:
              "2px -2px 1px rgba(255, 0, 255, 1), -2px 2px 1px rgba(0, 255, 255, 1)",
            animation: "rotate-center 0.6s ease-in-out both",
          },
        },
      },
    },
  },
})
export const BlinkTheme = createTheme({
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
            animation: "blink-1 1s ",
          },
        },
      },
    },
  },
})
