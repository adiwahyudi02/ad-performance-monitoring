"use client";
import { openSans } from "@/constants/fonts.constants";
import { alpha, createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  palette: {
    background: {
      default: "#f1f5f9",
    },
    primary: {
      main: "#7e22f9",
    },
    success: {
      main: "#34d399",
    },
    warning: {
      main: "#ffa70b",
    },
  },
  colorSchemes: {
    dark: {
      palette: {
        background: {
          default: "#1c2434",
          paper: "#273143",
        },
        text: {
          primary: "#ffffff",
          secondary: "#cbd5e1",
        },
        primary: {
          main: "#af96ff",
        },
      },
    },
  },
  typography: {
    fontFamily: openSans.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0rem 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "1rem 1.5rem",
          borderBottom: "0.0625rem solid",
          borderBottomColor: "var(--mui-palette-divider)",
        },
        title: {
          fontSize: "1rem",
          fontWeight: "600",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "1.25rem 1.5rem",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "0 1.5rem 1.5rem",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          paddingBlock: "0.85rem !important",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "& .MuiChip-label": { fontWeight: 500 },
        },
      },
      defaultProps: {
        color: "default",
      },
      variants: [
        {
          props: { color: "primary" },
          style: ({ theme }) => ({
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            border: `1px solid ${theme.palette.primary.main}`,
          }),
        },
        {
          props: { color: "info" },
          style: ({ theme }) => ({
            color: theme.palette.info.main,
            backgroundColor: alpha(theme.palette.info.main, 0.1),
            border: `1px solid ${theme.palette.info.main}`,
          }),
        },
        {
          props: { color: "success" },
          style: ({ theme }) => ({
            color: theme.palette.success.main,
            backgroundColor: alpha(theme.palette.success.main, 0.1),
            border: `1px solid ${theme.palette.success.main}`,
          }),
        },
        {
          props: { color: "warning" },
          style: ({ theme }) => ({
            color: theme.palette.warning.main,
            backgroundColor: alpha(theme.palette.warning.main, 0.1),
            border: `1px solid ${theme.palette.warning.main}`,
          }),
        },
        {
          props: { color: "error" },
          style: ({ theme }) => ({
            color: theme.palette.error.main,
            backgroundColor: alpha(theme.palette.error.main, 0.1),
            border: `1px solid ${theme.palette.error.main}`,
          }),
        },
        {
          props: { color: "default" },
          style: ({ theme }) => ({
            color: theme.palette.text.primary,
            backgroundColor: alpha(theme.palette.action.selected, 0.1),
            border: `1px solid ${theme.palette.text.primary}`,
          }),
        },
      ],
    },
    MuiTable: {
      styleOverrides: {
        root: {
          border: "1px solid var(--mui-palette-divider)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: "600",
          backgroundColor: "var(--mui-palette-background-default)",
          border: "1px solid var(--mui-palette-divider)",
        },
      },
    },
  },
});

export default theme;
