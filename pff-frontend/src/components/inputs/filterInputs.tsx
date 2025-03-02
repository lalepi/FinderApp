import * as React from 'react'
import { FilterSlider } from '../../themes/styles/Buttons'
import dogImage from '../../assets/dog_selector.png'
import catImage from '../../assets/cat_selector.png'
import { Breed, GenericMenu, Weight, WeightValue } from '../../types'
import theme from '../../themes/Theme'
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Box,
    Button,
    Select,
    MenuItem,
    SelectChangeEvent,
    Checkbox,
    Grid2,
    ListItemText,
} from '@mui/material'
import { Text, FilterHeader } from '../../themes/styles/CommonPageStyles'

interface NumericArrayFilterProps {
    value: number[]
    onChange: (value: number[]) => void
}

interface StringFilterProps {
    value: string
    onChange: (value: string) => void
}

interface StringArrayFilterProps {
    values: string[]
    onChange: (value: string[]) => void
}

// interface GenericFilterProps {
//     value: FilterValue
//     onChange: (value: FilterValue) => void
// }

export const PriceSlider: React.FC<NumericArrayFilterProps> = ({
    onChange,
    value,
}) => {
    const handleChange = (event: Event, newValue: number | number[]) => {
        onChange(newValue as number[])
    }

    return (
        <Box sx={{ width: 250, padding: 1 }}>
            <FilterHeader>Price range</FilterHeader>
            <Text
                sx={{ padding: 1, border: 2, borderRadius: 1 }}
            >{`$${value[0]} - $${value[1]}`}</Text>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text>$0</Text>
                <FilterSlider
                    getAriaLabel={() => 'Price range'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                />
                <Text>$100</Text>
            </Box>
        </Box>
    )
}

export const BreedSelector: React.FC<StringFilterProps> = ({
    onChange,
    value,
}) => {
    const handleBreedChange = (value: Breed) => {
        onChange(value as Breed)
    }

    return (
        <Box>
            <FilterHeader>Select breed</FilterHeader>

            <Box sx={{ display: 'flex', gap: 10 }}>
                <Button
                    size="small"
                    onClick={() => handleBreedChange('dog')}
                    sx={{
                        position: 'relative',
                        borderRadius: '50%',
                        backgroundColor:
                            value === 'dog'
                                ? theme.palette.button.secondaryBackground
                                : 'transparent',
                        padding: 0,
                        minWidth: 'auto',
                    }}
                >
                    <img
                        src={dogImage}
                        width="70"
                        alt="dog"
                        style={{ borderRadius: '50%' }}
                    />
                </Button>
                <Button
                    size="small"
                    onClick={() => handleBreedChange('cat')}
                    sx={{
                        position: 'relative',
                        borderRadius: '50%',
                        backgroundColor:
                            value === 'cat'
                                ? theme.palette.button.secondaryBackground
                                : 'transparent',
                        padding: 0,
                        minWidth: 'auto',
                    }}
                >
                    <img
                        src={catImage}
                        width="70"
                        alt="cat"
                        style={{ borderRadius: '50%' }}
                    />
                </Button>
            </Box>
        </Box>
    )
}

export const AgeSelector: React.FC<StringFilterProps> = ({
    onChange,
    value,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange((event.target as HTMLInputElement).value)
    }

    return (
        <FormControl>
            <FilterHeader>Select Age</FilterHeader>

            <RadioGroup
                row
                aria-labelledby="Age selector group"
                name="Age selector group"
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel
                    value="all"
                    control={
                        <Radio
                            sx={{
                                color: theme.palette.button.primaryBackground,
                                '&.Mui-checked': {
                                    color: theme.palette.button
                                        .secondaryBackground,
                                },
                            }}
                        />
                    }
                    label={<Text>All</Text>}
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="puppy"
                    control={
                        <Radio
                            sx={{
                                color: theme.palette.button.primaryBackground,
                                '&.Mui-checked': {
                                    color: theme.palette.button
                                        .secondaryBackground,
                                },
                            }}
                        />
                    }
                    label={<Text>Puppy 0-1</Text>}
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="adult"
                    control={
                        <Radio
                            sx={{
                                color: theme.palette.button.primaryBackground,
                                '&.Mui-checked': {
                                    color: theme.palette.button
                                        .secondaryBackground,
                                },
                            }}
                        />
                    }
                    label={<Text>Adult +1</Text>}
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="senior"
                    control={
                        <Radio
                            sx={{
                                color: theme.palette.button.primaryBackground,
                                '&.Mui-checked': {
                                    color: theme.palette.button
                                        .secondaryBackground,
                                },
                            }}
                        />
                    }
                    label={<Text>Senior</Text>}
                    labelPlacement="top"
                />
            </RadioGroup>
        </FormControl>
    )
}

//use enum to define the weight options
const weightOptions = {
    [Weight.Small]: '0-10 Kg',
    [Weight.Medium]: '10-20 Kg',
    [Weight.Large]: '> 20 Kg',
}

// use the weightOptions object to map the values of the weight filter
// WeightSelect component is a wrapper for the DropDownSelector component

export const WeightSelect: React.FC<StringArrayFilterProps> = ({
    onChange,
    values,
}) => {
    const handleWeightChange = (value: string[]) => {
        const mappedValues = value
            .map((val) => {
                //find the key of the weightOptions object that matches the value
                const enumKey = Object.keys(weightOptions).find(
                    (key) => weightOptions[key as Weight] === val
                )
                //return the key as the weight value
                return enumKey as Weight
            })
            //filter out any undefined values
            .filter((val) => val !== undefined) as WeightValue[]
        if (mappedValues.length === 0) {
            mappedValues.push('all')
        }
        onChange(mappedValues)
    }

    const selectedWeightValues =
        values.length === 0
            ? ['all']
            : values.map((val) => weightOptions[val as Weight] || 'all')

    return (
        <DropDownSelector
            label="Weight"
            values={Object.values(weightOptions)}
            selectedValues={selectedWeightValues}
            onChange={handleWeightChange}
        />
    )
}

export const MultiCheckboxSelector: React.FC<
    GenericMenu & StringArrayFilterProps
> = ({ values, label, selectedValues, onChange }) => {
    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, checked } = event.target

        const currentlyChecked = checked
            ? [...selectedValues, name]
            : selectedValues.filter((value) => value !== name)
        onChange(currentlyChecked)
    }

    return (
        <Box>
            <FilterHeader>{label}</FilterHeader>
            <Grid2 container spacing={1} width={280}>
                {values.map((value) => (
                    <Grid2 size={6} key={value}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    sx={{
                                        color: theme.palette.button
                                            .primaryBackground,
                                        '&.Mui-checked': {
                                            color: theme.palette.button
                                                .secondaryBackground,
                                        },
                                    }}
                                    name={value}
                                    checked={selectedValues.includes(value)}
                                    onChange={handleCheckboxChange}
                                />
                            }
                            label={<Text>{value}</Text>}
                        />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    )
}

export const DropDownSelector: React.FC<
    GenericMenu & StringArrayFilterProps
> = ({ values, label, selectedValues, onChange }) => {
    //use the SelectChangeEvent type to get the value of the selected item,
    // and ensure that the type of the value is the same as the selectedValue
    const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
        const { value } = event.target

        //check if the value is a string, if it is, split it into an array, otherwise use the value as is
        console.log('value', value)

        let currentValue = typeof value === 'string' ? value.split(',') : value

        // Remove "all" if any other option is selected
        if (currentValue.includes('all') && currentValue.length > 1) {
            currentValue = currentValue.filter((val) => val !== 'all')
        }

        // If no options are selected, add "all"
        if (currentValue.length === 0) {
            currentValue = ['all']
        }

        onChange(currentValue)
    }
    return (
        <Box>
            <FilterHeader>{label}</FilterHeader>
            <FormControl sx={{ m: 1, maxWidth: 150 }} size="small">
                <Select
                    labelId="brand-select-label"
                    id="brand-select"
                    multiple
                    value={selectedValues}
                    onChange={handleChange}
                    renderValue={(selected) =>
                        selected.length === 0 ? 'all' : selected.join(', ')
                    }
                    sx={{ width: 200 }}
                >
                    {values.map((value) => (
                        <MenuItem key={value} value={value}>
                            <Checkbox
                                sx={{
                                    color: theme.palette.button
                                        .primaryBackground,
                                    '&.Mui-checked': {
                                        color: theme.palette.button
                                            .secondaryBackground,
                                    },
                                }}
                                name={value}
                                checked={selectedValues.includes(value)}
                            />
                            <ListItemText primary={value} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}
