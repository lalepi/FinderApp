import { Product } from '../../types'
import { useAppSelector } from '../../store'
import { Box } from '@mui/system'

const ProductList = () => {
    const products = useAppSelector((state) => state.product)

    console.log('products', products)

    return (
        <Box>
            {products.map((product: Product) => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <li>{product.size}</li>
                    <li>{product.manufacturer}</li>
                    <img
                        src={`/testdata/assets/${product.image}`}
                        alt={product.name}
                        width="100"
                        height="100"
                    />
                    <li>{product.ingredients}</li>
                    <li>{product.age}</li>
                </div>
            ))}
        </Box>
    )
}

export default ProductList
