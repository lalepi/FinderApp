import { Product } from '../../types'
import { useAppSelector } from '../../store'
import { Box } from '@mui/system'
import {
    PriceSlider,
    BreedSelector,
    AgeSelector,
    WeightSelect,
    DropDownSelector,
    MultiCheckboxSelector,
} from '../inputs/filterInputs'

const ProductList = () => {
    const products = useAppSelector((state) => state.product)
    const manufacturers = [
        'Mars Petcare',
        'Purina',
        "Hill's Science Diet",
        'Royal Canin',
        'Blue Buffalo',
        'Wellness',
        'Orijen',
        'Acana',
        'Taste of the Wild',
        'PrimaPet',
    ]
    const brands = ['Brand A', 'Brand B', 'Brand C', 'Brand D']
    console.log('products', products)
    const foodForm = ['Wet', 'Dry']
    const sensitivities = [
        'Grain-Free',
        'Gluten-Free',
        'Dairy-Free',
        'Soy-Free',
        'Chicken-Free',
    ]
    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    margin: 2,
                    padding: 2,
                    border: 2,
                    borderRadius: 2,
                    boxShadow: 10,
                    width: 310,
                    height: '100%',
                }}
            >
                <PriceSlider />
                <BreedSelector />
                <AgeSelector />
                <WeightSelect />

                <MultiCheckboxSelector
                    label="Sensityvity"
                    values={sensitivities}
                />
                <MultiCheckboxSelector label="foodForm" values={foodForm} />

                <DropDownSelector label="Manufacturer" values={manufacturers} />
                <DropDownSelector label="Brand" values={brands} />
            </Box>
            <Box sx={{ flex: 1, marginLeft: 2 }}>
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
        </Box>
    )
}

export default ProductList
