import { Navbar, Ul, Link } from '../themes/styles/NavigationBarStyles'

const NavigationBar = () => {
    return (
        <Navbar>
            <Ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                <li>
                    <Link to="/aboutus">About Us</Link>
                </li>
                <li>
                    <Link to="/admin">Admin</Link>
                </li>
            </Ul>
        </Navbar>
    )
}

export default NavigationBar
