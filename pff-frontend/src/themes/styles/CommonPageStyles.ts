import { styled } from '@mui/system'
import { Box } from '@mui/material'

const Root = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
}))

const Header = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
}))

const Content = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1200px',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,

    borderRadius: theme.shape.borderRadius,
}))

const Footer = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
}))
export { Root, Header, Content, Footer }
