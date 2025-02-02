import ProductListPage from './components/Product'
import AboutUsPage from './components/AboutUs'
import AdminPage from './components/Admin'
import MainPage from './components/MainPage'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'

import { useEffect } from 'react'
import { initializeProducts } from './reducers/productReducer'
import { initializeUsers } from './reducers/userReducer'
import { useAppDispatch } from './store'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeProducts())
        dispatch(initializeUsers())
    }, [])

    return (
        <Router>
            <div>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="products" element={<ProductListPage />} />
                    <Route path="aboutus" element={<AboutUsPage />} />
                    <Route path="admin" element={<AdminPage />} />
                    <Route path="register" element={<SignUpPage />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
