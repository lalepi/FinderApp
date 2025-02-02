import UserList from './users'
import { Content } from '../../themes/styles/CommonPageStyles'

const AdminPage = () => {
    return (
        <Content>
            <h1>Welcome to Admin page</h1>
            <UserList />
        </Content>
    )
}
export default AdminPage
