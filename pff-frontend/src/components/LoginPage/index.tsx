import { Header } from '../../themes/styles/CommonPageStyles'
import Login from './login'
import { Box } from '@mui/system'
const LoginPage = () => {
    return (
        <Box>
            <Header>Welcome to Login page</Header>
            <Login />
        </Box>
    )
}
export default LoginPage
