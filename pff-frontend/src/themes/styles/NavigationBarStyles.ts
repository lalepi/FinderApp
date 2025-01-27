import { styled } from '@mui/system'
import { NavLink } from 'react-router-dom'

export const Navbar = styled('nav')({
    backgroundColor: 'rgb(173, 209, 187)',
})

export const Ul = styled('ul')({
    display: 'flex',
    justifyContent: 'start',
    gap: '15px',
    padding: '1em',
    listStyleType: 'none',
})

export const Link = styled(NavLink)({
    color: 'rgb(229, 229, 229)',
    textDecoration: 'none',
    fontFamily: 'Inter, sans-serif',
    '&.active': {
        color: 'rgb(2, 3, 3)',
    },
})
