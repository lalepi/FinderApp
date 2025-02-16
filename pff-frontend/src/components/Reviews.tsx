import React from 'react'
import { Box, Typography, Rating, Button, TextField } from '@mui/material'
import { Text } from '../themes/styles/CommonPageStyles'
import { Product, Review, ReviewsProps } from '../types'
import { useState } from 'react'
import { useAppDispatch } from '../store'
import { addReview } from '../reducers/productReducer'
import { v4 as uuidv4 } from 'uuid'

export const AddReview: React.FC<{
    product: Product
    onAddReview: (review: Review) => void
}> = ({ onAddReview, product }) => {
    const [rating, setRating] = useState<number | null>(0)
    const [comment, setComment] = useState<string>('')

    const dispatch = useAppDispatch()

    const handleSubmit = async () => {
        //check that input is not empty
        if (rating !== null && comment.trim() !== '') {
            const newReview = { id: uuidv4(), rating, comment }
            dispatch(addReview(product.id, newReview))
            onAddReview(newReview)
            setRating(0)
            setComment('')
        }
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Text>Add a review</Text>
            <Rating
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue)
                }}
            />
            <TextField
                label="Comment"
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ marginTop: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ marginTop: 2 }}
            >
                Submit
            </Button>
        </Box>
    )
}
/// make a average review rating to be displayed in the product cards
export const AverageRating: React.FC<ReviewsProps> = ({ product }) => {
    const productReview = product.reviews as Review[]
    const rating =
        productReview.reduce((acc, review) => acc + review.rating, 0) /
        productReview.length

    console.log('rating', rating)
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 3,
            }}
        >
            <Text
                sx={{
                    padding: 0,
                    margin: 0,
                }}
            >
                Overall rating
            </Text>

            <Box>
                <Rating precision={0.5} value={rating} readOnly />
            </Box>
        </Box>
    )
}

export const Reviews: React.FC<ReviewsProps> = ({ product }) => {
    console.log('product', product)

    const productReview = product.reviews as Review[]

    return (
        <Box sx={{ padding: 2 }}>
            <Text>Reviews</Text>
            {productReview.map((review, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                    <Rating precision={0.5} value={review.rating} readOnly />
                    <Typography variant="body1">{review.comment}</Typography>
                </Box>
            ))}
        </Box>
    )
}
