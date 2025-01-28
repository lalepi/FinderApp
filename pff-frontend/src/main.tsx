import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import theme from './themes/Theme'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline'

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </StrictMode>
)
