import { styled } from '@mui/system'
import Button from '@mui/material/Button'

const LoginButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.button.primaryBackground,
    border: 'none',
    color: theme.palette.button.primaryText,
    //padding: theme.spacing(1.5),
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    // margin: theme.spacing(0.5),
    cursor: 'pointer',
    borderRadius: theme.spacing(1),

    '&:hover': {
        backgroundColor: theme.palette.button.secondaryBackground,
    },

    '&:disabled': {
        backgroundColor: '#cccccc',
        cursor: 'not-allowed',
    },
}))

export default LoginButton
