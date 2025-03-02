import { Reseller, ProductWithMetadata } from '../../types'
import { Box, List, ListItem } from '@mui/material'
import { Header, Text } from '../../themes/styles/CommonPageStyles'
import { useAppSelector } from '../../store'
import { AddReview, Reviews } from '../Reviews'
import { useState, useEffect } from 'react'
import { Review } from '../../types'
import { fetchProductById } from '../../reducers/productReducer'
import { useAppDispatch } from '../../store'
import { useParams } from 'react-router-dom'

//This component displays a single product with its details, resellers, and reviews

const SingleProduct = () => {
    // Get the dispatch function from the Redux store
    const dispatch = useAppDispatch()

    // State to manage reviews
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    // Get the product ID from the URL params
    const { id } = useParams<{ id: string }>()

    // Fetch the product from the store
    const product = useAppSelector((state) =>
        state.product.find((product) => product.id === id)
    ) as ProductWithMetadata
    // if product is not available from the store, fetch it from the backend

    useEffect(() => {
        const fetchProduct = async () => {
            if (!product && id) {
                await dispatch(fetchProductById(id))
            }
            setLoading(false)
        }
        fetchProduct()
    }, [dispatch, id, product])

    // Set reviews when product is loaded
    useEffect(() => {
        if (product) {
            setReviews(product.reviews)
        }
    }, [product])

    const resellers = useAppSelector((state) => state.reseller)

    // Filter resellers by product ID
    const productResellers = resellers.filter(
        (reseller: Reseller) => reseller.product_id === id
    )

    // Function to handle adding a new review using the onAddReview callback
    const handleAddReview = (newReview: Review) => {
        setReviews([...reviews, newReview])
    }
    if (loading) {
        return <div>Loading...</div>
    }

    if (!product) {
        return <div>Product not found</div>
    } else {
        return (
            <Box sx={{ padding: 2 }}>
                <Header>
                    {product.name}
                    <Text
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: 30,
                        }}
                    >
                        {'REVIEW'}
                    </Text>
                </Header>

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                    <Box sx={{ flex: 1 }}>
                        <img
                            src={`/testdata/assets/${product.image}`}
                            alt={product.name}
                            width="150"
                            height="150"
                        />

                        <List>
                            <ListItem>
                                {`Manufacturer: ${product.manufacturer}`}
                            </ListItem>
                            <ListItem>
                                {`For ${product.age} ${product.product_metadata.pet_type}s`}
                            </ListItem>
                            <ListItem>
                                {`Packaging sizes: ${product.size}`}
                            </ListItem>
                            <ListItem>
                                {`Brand: ${product.product_metadata.brand}`}
                            </ListItem>
                            <Text>Main Ingredients:</Text>

                            {product.ingredients.map((ingredient) => (
                                <ListItem
                                    sx={{
                                        padding: 0,
                                        margin: 0,
                                        fontSize: 13,
                                    }}
                                    key={ingredient}
                                >
                                    {ingredient}
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Box sx={{ width: '50%' }}>
                        <Header>{'RESELLERS'}</Header>
                        <List dense={true} sx={{ padding: 0 }}>
                            {productResellers.map((reseller) => (
                                <ListItem
                                    sx={{
                                        padding: 0,
                                        margin: 0,
                                    }}
                                    disablePadding={true}
                                    disableGutters={true}
                                    divider={true}
                                    key={reseller.inventory_id}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}
                                    >
                                        <Text
                                            sx={{
                                                margin: 1,
                                                fontSize: 20,
                                            }}
                                        >
                                            {reseller.reseller_name}
                                        </Text>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}
                                    >
                                        <Text
                                            sx={{
                                                margin: 1,
                                                fontSize: 20,
                                            }}
                                        >{`price: ${reseller.sale_price} €`}</Text>
                                        <Text
                                            sx={{
                                                margin: 1,
                                                fontSize: 20,
                                            }}
                                        >{`Link`}</Text>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
                <AddReview product={product} onAddReview={handleAddReview} />
                <Reviews product={{ ...product, reviews }} />
            </Box>
        )
    }
}

export default SingleProduct
