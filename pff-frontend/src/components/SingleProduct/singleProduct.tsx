import { useLocation } from 'react-router-dom'
import { ProductWithMetadata, Reseller } from '../../types'
import { Box, List, ListItem } from '@mui/material'
import { Header, Text } from '../../themes/styles/CommonPageStyles'
import { useAppSelector } from '../../store'
import Reviews from '../Reviews'
const SingleProduct = () => {
    const location = useLocation()
    const { product } = location.state as { product: ProductWithMetadata }
    console.log('product', product)

    const resellers = useAppSelector((state) => state.reseller)

    // Filter resellers by product ID
    const productResellers = resellers.filter(
        (reseller: Reseller) => reseller.product_id === product.id
    )

    console.log('productResellers', productResellers)
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
            <Reviews product={product} />
        </Box>
    )
}

export default SingleProduct
