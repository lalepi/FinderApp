import { createTheme, Theme } from '@mui/material/styles'

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: false // removes the `xs` breakpoint
        sm: false
        md: false
        lg: false
        xl: false
        mobile: true // adds the `mobile` breakpoint
        tablet: true
        laptop: true
        desktop: true
    }
}

const theme: Theme = createTheme({
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
    //theme_module has the following breakpoints defined
    breakpoints: {
        values: {
            mobile: 500,
            tablet: 501,
            laptop: 1024,
            desktop: 1200,
        },
    },
})

export default theme
