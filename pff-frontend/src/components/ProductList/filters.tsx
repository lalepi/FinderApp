import React, { useState, useEffect } from 'react'
import {
    PriceSlider,
    BreedSelector,
    AgeSelector,
    WeightSelect,
    DropDownSelector,
    MultiCheckboxSelector,
} from '../inputs/filterInputs'
import {
    FoodForm,
    Filter,
    Manufacturer,
    Sensitivities,
    Brands,
    FilterValue,
} from '../../types'
import { Button, Box } from '@mui/material'
interface FiltersProps {
    onFilterChange: (filter: Filter) => void
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
    const defaultFilters: Filter = {
        price: [0, 100],
        breed: 'all',
        age: 'all',
        weight: 'all',
        sensitivity: [],
        foodForm: [],
        manufacturer: 'all',
        brand: 'all',
    }

    const [filters, setFilters] = useState<Filter>(defaultFilters)

    const handleFilterChange = (
        //ensure that the filterDefinition is a key of the Filter interface & value is one of the filter definitions
        filterDefinition: keyof Filter,
        value: FilterValue
    ) => {
        //set filters based on the previous filters and the new value
        setFilters((previousFilters) => ({
            ...previousFilters,
            [filterDefinition]: value,
        }))
    }

    const handleSubmit = () => {
        onFilterChange(filters)
    }

    useEffect(() => {
        onFilterChange(defaultFilters)
    }, [])

    return (
        <Box>
            <PriceSlider
                onChange={(value) => handleFilterChange('price', value)}
            />
            <BreedSelector
                onChange={(value) => handleFilterChange('breed', value)}
            />
            <AgeSelector
                onChange={(value) => handleFilterChange('age', value)}
            />
            <WeightSelect
                onChange={(value) => handleFilterChange('weight', value)}
            />
            <MultiCheckboxSelector
                label="Sensityvity"
                values={Object.values(Sensitivities)}
                onChange={(value) => handleFilterChange('sensitivity', value)}
            />
            <MultiCheckboxSelector
                label="foodForm"
                values={Object.values(FoodForm)}
                onChange={(value) => handleFilterChange('foodForm', value)}
            />

            <DropDownSelector
                label="Manufacturer"
                values={Object.values(Manufacturer)}
                onChange={(value) => handleFilterChange('manufacturer', value)}
            />
            <DropDownSelector
                label="Brand"
                values={Object.values(Brands)}
                onChange={(value) => handleFilterChange('brand', value)}
            />

            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Apply Filters
            </Button>
        </Box>
    )
}
export default Filters
