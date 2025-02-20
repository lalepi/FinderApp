import * as React from 'react'
import { FilterSlider } from '../../themes/styles/Buttons'
import dogImage from '../../assets/dog_selector.png'
import catImage from '../../assets/cat_selector.png'
import { Breed } from '../../types'
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
} from '@mui/material'
import { useState } from 'react'
import { MultiCheckboxProps, DropdownProps } from '../../types'
import { Text, FilterHeader } from '../../themes/styles/CommonPageStyles'

interface PriceSliderProps {
    onChange: (value: number[]) => void
}

export const PriceSlider: React.FC<PriceSliderProps> = ({ onChange }) => {
    const [value, setValue] = React.useState<number[]>([0, 100])
    console.log('value', value)
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[])
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

export const BreedSelector = () => {
    const [Breed, setBreed] = React.useState<Breed>('neither')
    console.log('Breed', Breed)

    const handleBreedChange = (breed: Breed) => {
        setBreed(breed as Breed)
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
                            Breed === 'dog'
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
                            Breed === 'cat'
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

export const AgeSelector = () => {
    const [value, setValue] = React.useState('female')
    console.log('value', value)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('event', event)
        setValue((event.target as HTMLInputElement).value)
    }

    return (
        <FormControl
            sx={{
                fontSize: 5, // Change font size
            }}
        >
            <FilterHeader>Select Age</FilterHeader>

            <RadioGroup
                row
                aria-labelledby="Age selector group"
                name="Age selector group"
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel
                    sx={{ fontSize: '8px' }}
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

export const WeightSelect = () => {
    const [weight, setWeight] = React.useState('')
    console.log('weight', weight)
    const handleChange = (event: SelectChangeEvent) => {
        setWeight(event.target.value as string)
    }

    return (
        <Box>
            <FilterHeader>Pet size</FilterHeader>

            <FormControl sx={{ m: 1, maxWidth: 160 }} size="small">
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={weight}
                    // label="Weight"
                    onChange={handleChange}
                >
                    <MenuItem value="">{'None'}</MenuItem>

                    <MenuItem value={10}>{<Text>0-10 Kg</Text>}</MenuItem>
                    <MenuItem value={15}>{<Text>10-15 Kg</Text>}</MenuItem>
                    <MenuItem value={20}>{<Text>15-25 Kg</Text>}</MenuItem>
                    <MenuItem value={25}>{<Text>{'>'} 25 Kg</Text>}</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export const MultiCheckboxSelector: React.FC<MultiCheckboxProps> = ({
    values,
    label,
}) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([])

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, checked } = event.target

        setSelectedValues((previous) =>
            checked
                ? [...previous, name]
                : previous.filter((value) => value !== name)
        )
    }

    console.log('selectedValues', selectedValues)

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

export const DropDownSelector: React.FC<DropdownProps> = ({
    values,
    label,
}) => {
    const [selectedValue, setSelectedValue] = useState<string>('')

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedValue(event.target.value as string)
    }
    return (
        <Box>
            <FilterHeader>{label}</FilterHeader>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                    labelId="brand-select-label"
                    id="brand-select"
                    value={selectedValue}
                    onChange={handleChange}
                    displayEmpty
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {values.map((value) => (
                        <MenuItem key={value} value={value}>
                            {<Text>{value}</Text>}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}
