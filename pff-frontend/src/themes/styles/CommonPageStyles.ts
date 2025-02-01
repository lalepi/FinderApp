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
    padding: theme.spacing(5),

    color: theme.palette.text.primary,
    textAlign: 'center',
    fontSize: '2.5rem',
    fontWeight: 'bold',

    [theme.breakpoints.down('mobile')]: {
        fontSize: '1.2rem',
        padding: theme.spacing(1),
    },
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

const Text = styled('p')(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: '1rem',
    textAlign: 'center',
    margin: theme.spacing(2),
}))

export { Root, Header, Content, Footer, Text }
