import { useAppSelector } from '../../store'
import { User } from '../../types'
import { Box } from '@mui/system'

const UserList = () => {
    const users = useAppSelector((state) => state.user)
    return (
        <Box>
            {users.map((user: User) => (
                <div key={user.id}>
                    <div>{user.id}</div>
                    <li>{user.email}</li>
                </div>
            ))}
        </Box>
    )
}

export default UserList
