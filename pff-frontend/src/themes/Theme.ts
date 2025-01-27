import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(255, 255, 255)',
            contrastText: 'rgb(0, 0, 0)',
        },
        secondary: {
            main: 'rgb(255, 255, 255)',
            contrastText: 'rgb(85, 160, 88)',
        },
        background: {
            default: 'rgb(255, 255, 255)',
            paper: 'rgb(255, 255, 255)',
        },
        text: {
            primary: 'rgb(71, 109, 54)',
            secondary: 'rgb(0, 0, 0)',
        },
    },

    typography: {
        fontFamily: 'Inter, sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 'bold',
        },
        body1: {
            fontSize: '1rem',
        },
    },
    spacing: 8,
    shape: {
        borderRadius: 8,
    },
})

export default theme
