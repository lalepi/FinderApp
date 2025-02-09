import React, { useState } from 'react'
import { Header, Root, Text } from '../../themes/styles/CommonPageStyles'
import { TextField, Box, Stack } from '@mui/material'
import { LoginButton } from '../../themes/styles/Buttons'
import { Link } from 'react-router-dom'
import theme from '../../themes/Theme'
import { credentials } from '../../types'
import { useAppDispatch } from '../../store'
import { createUser } from '../../reducers/loginReducer'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        Register({ email, password })
        console.log('Email:', email)
        console.log('password:', password)
        console.log('confirmPassword:', confirmPassword)

        setEmail('')
        setPassword('')
    }

    const dispatch = useAppDispatch()

    const Register = async (credentials: credentials) => {
        dispatch(createUser(credentials))
    }

    return (
        <Root>
            <Box
                sx={{
                    '& > :not(style)': { margin: theme.spacing(1) },
                    width: theme.spacing(80),
                    border: 2,
                    borderRadius: 3,
                    boxShadow: 8,
                }}
                onSubmit={handleSubmit}
                component="form"
                noValidate
                autoComplete="off"
            >
                <Header>Sign Up</Header>
                <Stack spacing={2}>
                    <TextField
                        helperText="Please enter your email"
                        size="small"
                        label="Email"
                        variant="outlined"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <TextField
                        helperText={
                            <i>Password must be at least 8 characters</i>
                        }
                        label="Password"
                        size="small"
                        variant="outlined"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <TextField
                        helperText="Repeat your password"
                        label="Repeat password"
                        size="small"
                        variant="outlined"
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Stack>
                <Box
                    alignItems={'center'}
                    justifyContent={'center'}
                    display={'flex'}
                >
                    <LoginButton type="submit">Register</LoginButton>
                </Box>
                <Text>
                    Already have an account? <Link to="/login">Login</Link>
                </Text>
            </Box>
        </Root>
    )
}
export default SignUp
