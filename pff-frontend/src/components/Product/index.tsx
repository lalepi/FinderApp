import ProductList from './productList'
import {
    Root,
    Header,
    Content,
    Footer,
} from '../../themes/styles/CommonPageStyles'
import { useMediaQuery, Typography } from '@mui/material'
import theme from '../../themes/Theme'

const ProductListPage = () => {
    //check if the screen is mobile or not
    const isMobile = useMediaQuery(theme.breakpoints.down('mobile'))
    console.log('isMobile', isMobile)

    return (
        <Root>
            <Header>
                <Typography variant="h6">
                    {isMobile
                        ? 'This is a mobile view'
                        : 'This is a desktop view'}
                </Typography>
                Product List
            </Header>
            <Content>
                <ProductList />
            </Content>
            <Footer>Footer Content</Footer>
        </Root>
    )
}

export default ProductListPage
