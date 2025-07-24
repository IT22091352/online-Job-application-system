import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#004080', // dark blue
      contrastText: '#fff',
    },
    secondary: {
      main: '#008080', // teal
      contrastText: '#fff',
    },
    background: {
      default: '#f9f9f9',
      paper: '#fff',
    },
    text: {
      primary: '#333333',
      secondary: '#555',
    },
    error: {
      main: '#d32f2f',
    },
    success: {
      main: '#388e3c',
    },
    warning: {
      main: '#ffa000',
    },
    info: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: 'Roboto, Open Sans, Lato, Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 700, fontSize: '2rem' },
    h3: { fontWeight: 700, fontSize: '1.5rem' },
    h5: { fontWeight: 700, fontSize: '1.25rem' },
    body1: { fontWeight: 400, lineHeight: 1.6 },
    body2: { fontWeight: 400, lineHeight: 1.5 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          minHeight: 44,
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #004080 0%, #008080 100%)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(90deg, #003366 0%, #006666 100%)',
          },
        },
        disabled: {
          background: '#e0e0e0',
          color: '#888',
          cursor: 'not-allowed',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          background: '#fff',
        },
        input: {
          padding: '12px 14px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0 4px 24px rgba(60, 72, 88, 0.12)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          fontSize: '1rem',
        },
        standardError: {
          color: '#d32f2f',
        },
        standardSuccess: {
          color: '#388e3c',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 900,
          margin: '0 auto',
        },
      },
    },
  },
});

export default theme; 