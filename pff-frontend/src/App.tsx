import ProductListPage from './components/Product'
import AboutUsPage from './components/AboutUs'
import AdminPage from './components/Admin'
import MainPage from './components/MainPage'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'

const App = () => {
    return (
        <Router>
            <div>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="products" element={<ProductListPage />} />
                    <Route path="aboutus" element={<AboutUsPage />} />
                    <Route path="admin" element={<AdminPage />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
