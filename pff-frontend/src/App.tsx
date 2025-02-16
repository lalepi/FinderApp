import ProductListPage from './components/ProductList'
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
import SingleProductPage from './components/SingleProduct'
import { initializeResellers } from './reducers/resellerReducer'

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeProducts())
        dispatch(initializeUsers())
        dispatch(initializeResellers())
    }, [dispatch])

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
                    <Route
                        path="products/:id"
                        element={<SingleProductPage />}
                    />
                </Routes>
            </div>
        </Router>
    )
}

export default App
