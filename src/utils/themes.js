import { createTheme } from "@mui/material/styles"

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
          },
        },
      },
    },
  },
})
