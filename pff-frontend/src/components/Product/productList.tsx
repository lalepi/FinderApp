import { useEffect, useState } from 'react'
import productsService from '../../services/Products'
import { Product } from '../../types'

const ProductList = () => {
    const [products, setProductsList] = useState([])

    useEffect(() => {
        productsService.getAll().then((products) => {
            console.log(products)
            setProductsList(
                products.map((product: Product) => (
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

    return <div>{products}</div>
}

export default ProductList
