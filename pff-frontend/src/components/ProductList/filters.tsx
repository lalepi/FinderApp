import React, { useState } from 'react'
import { PriceSlider } from '../inputs/filterInputs'
import { Filter } from '../../types'
import { Button } from '@mui/material'
interface FiltersProps {
    onFilterChange: (filter: Filter) => void
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
    const [price, setPrice] = useState<number[]>([0, 0])

    const handlePriceChange = (value: number[]) => {
        setPrice(value)
    }

    console.log('price', price)
    const handleSubmit = () => {
        onFilterChange({ price })
    }

    return (
        <div>
            <div>
                <PriceSlider onChange={handlePriceChange} />
            </div>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Apply Filters
            </Button>
        </div>
    )
}
export default Filters
