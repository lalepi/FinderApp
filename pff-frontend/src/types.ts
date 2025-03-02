export interface User {
    id: string
    email: string
    password: string
}

export type credentials = {
    email: string
    password: string
}
//if we have a type that is used in multiple places, we can define it here and import it where needed

// if the type has known set of values, we can use an enum. This is useful for dropdowns, radio buttons, etc.

//here is a example of an enum for age groups of pets

export enum Manufacturer {
    NestlePurinaPetCare = 'Nestle Purina PetCare',
    MarsPetcare = 'Mars Petcare',
    HillsPetNutrition = "Hill's Pet Nutrition",
    BlueBuffalo = 'Blue Buffalo',
    WellPet = 'WellPet',
    DiamondPetFoods = 'Diamond Pet Foods',
    SpectrumBrands = 'Spectrum Brands',
    CentralGardenPet = 'Central Garden & Pet',
    ChampionPetfoods = 'Champion Petfoods',
    NutroProducts = 'Nutro Products',
    BigHeartPetBrands = 'Big Heart Pet Brands',
    NaturesVariety = "Nature's Variety",
    SolidGoldPet = 'Solid Gold Pet',
    CanidaePetFood = 'Canidae Pet Food',
    MerrickPetCare = 'Merrick Pet Care',
    NutriSourcePetFoods = 'NutriSource Pet Foods',
    MidwesternPetFoods = 'Midwestern Pet Foods',
    FrommFamilyFoods = 'Fromm Family Foods',
    EarthbornHolisticPetFood = 'Earthborn Holistic Pet Food',
    ZignaturePetFood = 'Zignature Pet Food',
}

export enum Sensitivities {
    Grain = 'Grain-Free',
    Gluten = 'Gluten-Free',
    Dairy = 'Dairy-Free',
    Soy = 'Soy-Free',
    Chicken = 'Chicken-Free',
}

export enum Brands {
    MarsPetcare = 'Mars Petcare',
    Purina = 'Purina',
    HillsScienceDiet = "Hill's Science Diet",
    RoyalCanin = 'Royal Canin',
    BlueBuffalo = 'Blue Buffalo',
    Wellness = 'Wellness',
    Orijen = 'Orijen',
    Acana = 'Acana',
    TasteOfTheWild = 'Taste of the Wild',
    PrimaPet = 'PrimaPet',
    Nutro = 'Nutro',
    Iams = 'Iams',
    Eukanuba = 'Eukanuba',
    Pedigree = 'Pedigree',
    Cesar = 'Cesar',
    Sheba = 'Sheba',
    Whiskas = 'Whiskas',
    Friskies = 'Friskies',
    FancyFeast = 'Fancy Feast',
    MeowMix = 'Meow Mix',
    NaturalBalance = 'Natural Balance',
    NaturesLogic = "Nature's Logic",
    SolidGold = 'Solid Gold',
    Canidae = 'Canidae',
    Merrick = 'Merrick',
    NutriSource = 'NutriSource',
    Victor = 'Victor',
    Zignature = 'Zignature',
    Fromm = 'Fromm',
    EarthbornHolistic = 'Earthborn Holistic',
}

export enum FoodForm {
    Wet = 'Wet',
    Dry = 'Dry',
}

//example of a type definition for a product

export enum Age {
    Puppy = 'Puppy',
    Adult = 'Adult',
    Senior = 'Senior',
}

export interface Product {
    id: string
    name: string
    manufacturer: string
    ingredients: Array<string>
    image_url: string
    size: string
    age: Age
    image: string

    reviews: Review[]
}

export interface ProductWithMetadata extends Product {
    product_metadata: {
        brand: string
        dietary_type: string
        pet_size: string
        pet_type: string
        product_id: string
        sensitivities: string[]
    }
}

export interface ProductWithNutrients extends Product {
    nutrients: {
        protein: number
        fat: number
        fiber: number
        moisture: string
        ash: number
    }
}

export type ProductWithAllInfo = ProductWithMetadata & ProductWithNutrients

export enum Regions {
    Skandinavia = 'Skandinavia',
    Local = 'Local',
    National = 'National',
}

export interface Reseller {
    inventory_id: string
    product_id: string
    reseller_name: string
    regions: Regions
    stock_quantity: number
    base_price: number
    sale_price: number
    pricing_strategy: string
    inventory_status: string
    last_updated: string
    id: string
}

export type NewProduct = Omit<Product, 'id'> //this is a type that is the same as Product, but without the id field

//to extend a type, we can use the extends keyword
export interface ProductWithRating extends Product {
    rating: number
}

///FILTERS///

export type Breed = 'dog' | 'cat' | 'all'

export enum Weight {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
}

export type WeightValue = Weight | 'all'

export interface GenericMenu {
    values: string[]
    label: string
    selectedValues: string[]
}

export interface ReviewsProps {
    product: ProductWithMetadata
}

export interface Review {
    id?: string
    rating: number
    comment: string
}

export interface Filter {
    price: number[]
    breed: string
    age: string
    weight: string[]
    sensitivity: string[]
    foodForm: string[]
    manufacturer: string[]
    brand: string[]
}

//use the keys of Filters to make a union type of all the possible filter definitions
export type FilterValue = Filter[keyof Filter]
