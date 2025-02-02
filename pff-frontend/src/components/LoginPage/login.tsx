import React, { useState } from 'react'
import { Header, Root, Text } from '../../themes/styles/CommonPageStyles'
import { TextField, Box, useMediaQuery } from '@mui/material'
import LoginButton from '../../themes/styles/Buttons'
import { Link } from 'react-router-dom'
import theme from '../../themes/Theme'
import { credentials } from '../../types'
import { useAppDispatch } from '../../store'
import { setUser } from '../../reducers/loginReducer'

const Login: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const isMobile = useMediaQuery(theme.breakpoints.down('mobile'))
    const dispatch = useAppDispatch()

    const Login = async (credentials: credentials) => {
        dispatch(setUser(credentials))
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        Login({ email, password })
        console.log('Email:', email)
        console.log('Password:', password)
        setEmail('')
        setPassword('')
    }

    return (
        <Root>
            <Box
                onSubmit={handleSubmit}
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    display: isMobile ? 'auto' : null,
                    width: isMobile ? '100%' : theme.spacing(80),
                    border: isMobile ? null : 2,
                    borderRadius: 3,
                    boxShadow: 8,
                }}
            >
                <Header>Login</Header>
                <Box
                    sx={{
                        '& > :not(style)': { margin: theme.spacing(1) },
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: isMobile ? 'column' : 'row',
                        display: 'flex',
                    }}
                >
                    <TextField
                        helperText="Email"
                        size="small"
                        variant="outlined"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <TextField
                        helperText="Password"
                        size="small"
                        variant="outlined"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Box>
                <Box
                    alignItems={'center'}
                    justifyContent={'center'}
                    display={'flex'}
                >
                    <LoginButton type="submit">Login</LoginButton>
                </Box>
                <Text>
                    Don't have an account? <Link to="/register">Register</Link>
                </Text>
            </Box>
        </Root>
    )
}

export default Login
