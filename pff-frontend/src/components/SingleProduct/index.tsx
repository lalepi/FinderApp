import SingleProduct from './singleProduct'
import {
    Root,
    Header,
    Content,
    Footer,
} from '../../themes/styles/CommonPageStyles'
import { Button } from '@mui/material'

import { useMediaQuery, Typography } from '@mui/material'
import theme from '../../themes/Theme'
import { useNavigate } from 'react-router-dom'

const SingleProductPage = () => {
    //check if the screen is mobile or not
    const isMobile = useMediaQuery(theme.breakpoints.down('mobile'))
    console.log('isMobile', isMobile)

    // Use navigate hook to programmatically navigate
    const navigate = useNavigate()

    // Function to handle going back to the previous page
    const handleGoBack = () => {
        navigate('/products')
    }

    return (
        <Root>
            <Header>
                <Typography variant="h6">
                    {isMobile
                        ? 'This is a mobile view'
                        : 'This is a desktop view'}
                </Typography>
                Single Product
            </Header>

            <Content>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: theme.palette.button.primaryBackground,
                        border: 'none',
                        color: theme.palette.button.primaryText,
                    }}
                    onClick={handleGoBack}
                >
                    Go Back
                </Button>
                <SingleProduct />
            </Content>

            <Footer>Footer Content</Footer>
        </Root>
    )
}

export default SingleProductPage
