import { useEffect, useState } from 'react'
import productsService from './services/Products'

function App() {
    const [productList, setProductList] = useState([])

    useEffect(() => {
        productsService.getAll().then((products) => {
            console.log(products)
            setProductList(
                products.map((product) => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>

                        <li>{product.size}</li>
                        <li>{product.manufacturer}</li>
                        <li>{product.ingredients}</li>
                        <li>{product.age}</li>
                    </div>
                ))
            )
        })
    }, [])

    return (
        <>
            <div>
                <h1>PetFoodFinder</h1>
                <h2>Products</h2>
                {productList}
            </div>
        </>
    )
}

export default App
