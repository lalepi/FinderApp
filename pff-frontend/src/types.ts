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
export enum Age {
    Puppy = 'Puppy',
    Adult = 'Adult',
    Senior = 'Senior',
}

//example of a type definition for a product

export interface Product {
    id: string
    name: string
    manufacturer: string
    ingredients: Array<string>
    image_url: string
    size: string
    age: Age
    image: string

    reviews: Array<object>
}

export interface ProductWithMetadata extends Product {
    product_metadata: {
        brand: string
        dietary_type: string
        pet_size: string
        pet_type: string
        product_id: string
    }
}

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

export type Breed = 'dog' | 'cat' | 'neither'

export interface MultiCheckboxProps {
    values: string[]
    label: string
}

export interface DropdownProps {
    values: string[]
    label: string
}
