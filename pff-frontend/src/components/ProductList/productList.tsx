import { ProductWithMetadata, Filter, Manufacturer, Brands } from '../../types'
import { useAppSelector } from '../../store'
import { Box } from '@mui/system'
import {
    List,
    ListItem,
    Card,
    Typography,
    CardContent,
    CardActionArea,
} from '@mui/material'
import { Header, Text } from '../../themes/styles/CommonPageStyles'
import { useNavigate } from 'react-router-dom'
import { AverageRating } from '../Reviews'
import Filters from './filters'
import { useState } from 'react'
// Define the ProductCard component which takes a product with metadata as a prop

const ProductCard = ({ product }: { product: ProductWithMetadata }) => {
    const navigate = useNavigate()
    // Filter ingredients based on specific keywords
    const filteredIngredients = product.ingredients.filter((ingredient) => {
        return (
            ingredient.toLowerCase().includes('chicken') ||
            ingredient.toLowerCase().includes('beef') ||
            ingredient.toLowerCase().includes('lamb') ||
            ingredient.toLowerCase().includes('fish') ||
            ingredient.toLowerCase().includes('turkey') ||
            ingredient.toLowerCase().includes('duck') ||
            ingredient.toLowerCase().includes('pork') ||
            ingredient.toLowerCase().includes('oil') ||
            ingredient.toLowerCase().includes('barley') ||
            ingredient.toLowerCase().includes('vitamin')
        )
    })

    const handleCardClick = () => {
        navigate(`/products/${product.id}`, { state: { product } })
    }

    return (
        <Card
            key={product.id}
            sx={{
                border: 1,
                borderRadius: 2,
                marginBottom: 2,
                marginRight: 20,
                boxShadow: 10,
            }}
        >
            <CardActionArea onClick={handleCardClick}>
                {/* Upper part of the card */}
                <CardContent sx={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Header
                        sx={{
                            fontSize: 25,
                            textAlign: 'left',
                            //paddingBottom: 0,
                        }}
                    >
                        {product.name}
                    </Header>
                    <Box
                        sx={{
                            display: 'flex',
                            height: '50%',
                        }}
                    >
                        {/* Left side */}
                        <Box
                            sx={{
                                display: 'block',
                                flexDirection: 'column',
                                width: '50%',
                                height: '30%',
                            }}
                        >
                            <Box sx={{ display: 'block', margin: 1 }}>
                                <Text sx={{ fontSize: 16 }}>
                                    {' Manufacturer: ' + product.manufacturer}
                                </Text>
                            </Box>
                            <Box sx={{ display: 'block', margin: 1 }}>
                                <Text sx={{ fontSize: 16 }}>
                                    {'For ' +
                                        product.age +
                                        ' ' +
                                        product.product_metadata.pet_type +
                                        's'}
                                </Text>
                            </Box>
                            <Box sx={{ display: 'block', margin: 1 }}>
                                <Text sx={{ fontSize: 16 }}>
                                    {'Packaging sizes: ' + product.size}
                                </Text>
                            </Box>
                        </Box>
                        {/* Right side */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '50%',
                            }}
                        >
                            <AverageRating product={product} />

                            <img
                                src={`/testdata/assets/${product.image}`}
                                alt={product.name}
                                width="100"
                                height="100"
                            />
                        </Box>
                    </Box>
                </CardContent>
                {/* Lower part of the card */}
                <CardContent
                    sx={{
                        paddingTop: 0,
                        display: 'flex',
                    }}
                >
                    {/* Left side */}
                    <Box sx={{ width: '50%', display: 'flex' }}>
                        <List dense={true}>
                            <Text sx={{ fontSize: 14 }}>Main Ingredients:</Text>
                            {filteredIngredients.map((ingre) => (
                                <ListItem
                                    key={ingre}
                                    disablePadding={true}
                                    disableGutters={true}
                                    divider={true}
                                >
                                    {
                                        <Text sx={{ fontSize: 12, margin: 0 }}>
                                            {ingre}
                                        </Text>
                                    }
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    {/* Right side */}
                    <Box
                        sx={{
                            width: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{ textAlign: 'center' }}>
                            <Text
                                sx={{
                                    fontSize: 16,
                                }}
                            >
                                Origin of the food:
                            </Text>
                            <Typography
                                sx={{
                                    fontSize: 16,
                                }}
                            >
                                {product.product_metadata.brand}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

// this is the ProductList component which displays the product cards

const ProductList = () => {
    const products = useAppSelector(
        (state) => state.product as ProductWithMetadata[]
    )
    const resellers = useAppSelector((state) => state.reseller)

    const [filteredProducts, setFilteredProducts] = useState<
        ProductWithMetadata[]
    >([])

    // handle the filter change, first filter the resellers based on the price range,
    // then filter the products based on the filtered resellers
    // finally all the other filters will be applied on the filtered products

    const handleFilterChange = (filters: Filter) => {
        const {
            price,
            breed,
            age,
            weight,
            sensitivity,
            foodForm,
            manufacturer,
            brand,
        } = filters
        console.log('filters', filters)

        const filtered = resellers.filter((reseller) => {
            return (
                reseller.sale_price >= price[0] &&
                reseller.sale_price <= price[1]
            )
        })

        const priceRangeProducts = products.filter((product) => {
            return filtered.find(
                (reseller) => reseller.product_id === product.id
            )
        })

        console.log('priceRangeProducts', priceRangeProducts)

        const otherFilters = priceRangeProducts.filter((product) => {
            const breedType =
                breed === 'all'
                    ? product.product_metadata.pet_type.toLowerCase()
                    : product.product_metadata.pet_type.toLowerCase() === breed
            const weightType =
                weight === 'all'
                    ? product.product_metadata.pet_size.toLowerCase()
                    : product.product_metadata.pet_size.toLowerCase() === weight
            const ageType =
                age === 'all'
                    ? product.age.toLowerCase()
                    : product.age.toLowerCase() === age

            return breedType && ageType && weightType
        })

        console.log('otherFilters', otherFilters)

        setFilteredProducts(otherFilters as ProductWithMetadata[])
    }

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Filters */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    margin: 1,
                    padding: 1,
                    border: 2,
                    borderRadius: 2,
                    boxShadow: 10,
                    width: 360,
                    height: '100%',
                }}
            >
                <Filters onFilterChange={handleFilterChange} />
            </Box>
            {/* Product Cards */}
            <Box
                sx={{
                    flex: 1,
                    marginLeft: 2,
                    margin: 1,
                    height: '150vh',
                    overflowY: 'auto',
                }}
            >
                {filteredProducts.length === 0 ? (
                    <Text
                        sx={{
                            fontSize: 25,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        No products found
                    </Text>
                ) : (
                    filteredProducts.map((product: ProductWithMetadata) => (
                        <ProductCard
                            key={product.id}
                            product={product as ProductWithMetadata}
                        />
                    ))
                )}
            </Box>
        </Box>
    )
}

export default ProductList
