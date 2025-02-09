import { createTheme, Theme } from '@mui/material/styles'
import '@mui/material/styles/createPalette'
import { Colors } from '../constants'

declare module '@mui/material/styles/createPalette' {
    interface Palette {
        button: {
            primaryBackground: string
            primaryText: string
            secondaryBackground: string
            secondaryText: string
        }
    }
    interface PaletteOptions {
        button?: {
            primaryBackground?: string
            primaryText?: string
            secondaryBackground?: string
            secondaryText?: string
        }
    }
}
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
            main: Colors.light.main,
            contrastText: Colors.dark.main,
        },
        secondary: {
            main: Colors.light.secondary,
            contrastText: Colors.darkGreen.main,
        },
        background: {
            default: Colors.light.transparency.secondary[90],
            paper: Colors.light.transparency.main[90],
        },
        text: {
            primary: Colors.darkGreen.main,
            secondary: Colors.gray.main,
        },
        button: {
            primaryBackground: Colors.darkGreen.main,
            primaryText: Colors.light.main,
            secondaryBackground: Colors.darkGreen.transparency.main[80],
            secondaryText: Colors.light.main,
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
