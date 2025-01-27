import ProductList from './productList'
import {
    Root,
    Header,
    Content,
    Footer,
} from '../../themes/styles/CommonPageStyles'

const ProductListPage = () => {
    return (
        <Root>
            <Header>Product List</Header>
            <Content>
                <ProductList />
            </Content>
            <Footer>Footer Content</Footer>
        </Root>
    )
}

export default ProductListPage
