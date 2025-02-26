import * as React from 'react'
import { FilterSlider } from '../../themes/styles/Buttons'
import dogImage from '../../assets/dog_selector.png'
import catImage from '../../assets/cat_selector.png'
import { Breed, GenericMenu } from '../../types'
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
import { Text, FilterHeader } from '../../themes/styles/CommonPageStyles'

interface NumericArrayFilterProps {
    onChange: (value: number[]) => void
}

interface StringFilterProps {
    onChange: (value: string) => void
}

interface StringArrayFilterProps {
    onChange: (value: string[]) => void
}

export const PriceSlider: React.FC<NumericArrayFilterProps> = ({
    onChange,
}) => {
    const [value, setValue] = React.useState<number[]>([0, 100])

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

export const BreedSelector: React.FC<StringFilterProps> = ({ onChange }) => {
    const [Breed, setBreed] = React.useState<Breed>('all')
    console.log('Breed', Breed)
    const handleBreedChange = (breed: Breed) => {
        setBreed(breed as Breed)
        onChange(breed as Breed)
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

export const AgeSelector: React.FC<StringFilterProps> = ({ onChange }) => {
    const [age, setAge] = React.useState('all')
    console.log('age', age)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAge((event.target as HTMLInputElement).value)
        onChange((event.target as HTMLInputElement).value)
    }

    return (
        <FormControl>
            <FilterHeader>Select Age</FilterHeader>

            <RadioGroup
                row
                aria-labelledby="Age selector group"
                name="Age selector group"
                value={age}
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

export const WeightSelect: React.FC<StringFilterProps> = ({ onChange }) => {
    const [weight, setWeight] = React.useState('all')
    console.log('weight', weight)
    const handleChange = (event: SelectChangeEvent) => {
        setWeight(event.target.value as string)
        onChange(event.target.value as string)
    }

    return (
        <Box>
            <FilterHeader>Pet size</FilterHeader>

            <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={weight}
                    onChange={handleChange}
                >
                    <MenuItem value="all">{<Text>All</Text>}</MenuItem>

                    <MenuItem value="small">{<Text>0-10 Kg</Text>}</MenuItem>
                    <MenuItem value="medium">{<Text>10-20 Kg</Text>}</MenuItem>
                    <MenuItem value="large">
                        {<Text>{'>'} 20 Kg</Text>}
                    </MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export const MultiCheckboxSelector: React.FC<
    GenericMenu & StringArrayFilterProps
> = ({ values, label, onChange }) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([])

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, checked } = event.target

        setSelectedValues((previous) => {
            const currentlyChecked = checked
                ? [...previous, name]
                : previous.filter((value) => value !== name)
            onChange(currentlyChecked)
            return currentlyChecked
        })
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

export const DropDownSelector: React.FC<GenericMenu & StringFilterProps> = ({
    values,
    label,
    onChange,
}) => {
    const [selectedValue, setSelectedValue] = useState<string>('')

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedValue(event.target.value as string)
        onChange(event.target.value as string)
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
