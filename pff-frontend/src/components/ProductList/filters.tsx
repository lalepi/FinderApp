import React, { useState, useEffect, useRef } from 'react'
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
    ProductWithAllInfo,
} from '../../types'
import { Button, Box } from '@mui/material'
interface FiltersProps {
    onFilterChange: (filter: Filter) => void
    products: ProductWithAllInfo[]
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange, products }) => {
    const defaultFilters: Filter = {
        price: [0, 100],
        breed: 'all',
        age: 'all',
        weight: ['all'],
        sensitivity: [],
        foodForm: [],
        manufacturer: ['all'],
        brand: ['all'],
    }

    //use the default filters as the initial state
    const [filters, setFilters] = useState<Filter>(defaultFilters)

    //useRef to check if the component is mounted
    const isInitialMount = useRef(true)
    // // Restore the filter state from local storage when the component mounts
    useEffect(() => {
        const savedFilters = localStorage.getItem('filters')
        if (savedFilters) {
            const parsedFilters = JSON.parse(savedFilters)
            setFilters(parsedFilters)

            //to prevent the onFilterChange from being called after the initial mount

            console.log('in filters initialMOunt', isInitialMount.current)
            if (isInitialMount.current) {
                onFilterChange(parsedFilters) // Call onFilterChange with the restored filters
                isInitialMount.current = false
            }
        }
    }, [onFilterChange])

    // brand filter is dependent on the manufacturer filter
    // if a manufacturer is selected, only the brands of the selected manufacturer should be available
    const [filteredBrands, setFilteredBrands] = useState<string[]>(
        Object.values(Brands)
    )

    const handleFilterChange = (
        //ensure that the filterDefinition is a key of the Filter interface & value is one of the filter definitions
        filterDefinition: keyof Filter,
        value: FilterValue
    ) => {
        //set filters based on the previous filters and the new value
        const newFilters = {
            ...filters,
            [filterDefinition]: value,
        }
        setFilters(newFilters)
        //save the filters to local storage
        localStorage.setItem('filters', JSON.stringify(newFilters))
        // onFilterChange(newFilters) // Call onFilterChange with the updated filters
    }

    //update the filtered brands when the manufacturer filter changes

    useEffect(() => {
        if (
            filters.manufacturer.length > 0 &&
            filters.manufacturer[0] !== 'all'
        ) {
            const selectedManufacturer = filters.manufacturer

            //get all the brands of the products that match the selected manufacturer
            const matchingBrands = products
                .filter((product) =>
                    selectedManufacturer.includes(product.manufacturer)
                )
                .map((product) => product.product_metadata.brand)

            //Check that the brands are unique and there are no duplicates
            const uniqueBrands = matchingBrands.filter(
                (brand, index, current) => current.indexOf(brand) === index
            )
            //set the filtered brands or all brands if there are no selected manufacturers
            setFilteredBrands(uniqueBrands)
        } else {
            setFilteredBrands(Object.values(Brands))
        }
    }, [filters.manufacturer, products])

    const handleSubmit = () => {
        onFilterChange(filters)
    }
    console.log('in filters', filters)
    return (
        <Box>
            <PriceSlider
                value={filters.price}
                onChange={(value) => handleFilterChange('price', value)}
            />
            <BreedSelector
                value={filters.breed}
                onChange={(value) => handleFilterChange('breed', value)}
            />
            <AgeSelector
                value={filters.age}
                onChange={(value) => handleFilterChange('age', value)}
            />
            <WeightSelect
                values={filters.weight}
                onChange={(value) => handleFilterChange('weight', value)}
            />
            <MultiCheckboxSelector
                label="Sensitivity"
                values={Object.values(Sensitivities)}
                selectedValues={filters.sensitivity}
                onChange={(value) => handleFilterChange('sensitivity', value)}
            />
            <MultiCheckboxSelector
                label="foodForm"
                values={Object.values(FoodForm)}
                selectedValues={filters.foodForm}
                onChange={(value) => handleFilterChange('foodForm', value)}
            />

            <DropDownSelector
                label="Manufacturer"
                values={Object.values(Manufacturer)}
                selectedValues={filters.manufacturer}
                onChange={(value) => handleFilterChange('manufacturer', value)}
            />
            <DropDownSelector
                label="Brand"
                values={filteredBrands}
                selectedValues={filters.brand}
                onChange={(value) => handleFilterChange('brand', value)}
            />

            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Apply Filters
            </Button>
        </Box>
    )
}
export default Filters
