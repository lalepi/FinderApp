import { styled } from '@mui/system'
import { NavLink } from 'react-router-dom'

export const Navbar = styled('nav')(({ theme }) => ({
    backgroundColor: 'rgb(173, 209, 187)',
    [theme.breakpoints.down('mobile')]: {},
}))

export const Ul = styled('ul')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'start',
    gap: '15px',
    padding: theme.spacing(1),
    listStyleType: 'none',
    [theme.breakpoints.down('mobile')]: {
        padding: theme.spacing(0.5),
        width: '100%',
        fontWeight: 'bold',
    },
}))

export const Link = styled(NavLink)(({ theme }) => ({
    color: 'rgb(229, 229, 229)',
    textDecoration: 'none',
    fontFamily: 'Inter, sans-serif',
    '&.active': {
        color: 'rgb(2, 3, 3)',
    },
    [theme.breakpoints.down('mobile')]: {
        padding: theme.spacing(0.5),
        fontWeight: 'bold',
    },
}))
